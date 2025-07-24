import { ParsedAnswers } from 'types/stage';

export const QuestionWithForm = {
	OLD_PATIENT_VERIFY: {
		fields: ['No.Rekam Medis/NIK', 'Tanggal Lahir'],
		key: ['IDENTITY', 'TANGGAL_LAHIR'],
	},
	NEW_PATIENT_BASIC: {
		fields: ['Nama', 'Tempat Lahir', 'Tanggal Lahir'],
		key: ['NAMA', 'TEMPAT_LAHIR', 'TANGGAL_LAHIR'],
	},
	IDENTITY: {
		fields: ['NIK :', 'Kontak :'],
		key: ['NIK', 'CONTACT'],
	},
};

const joinKeyValueLines = (answer: string[]) => {
	const result = [];
	for (let i = 0; i < answer.length; i++) {
		const line = answer[i].trim();
		if (line.includes(':') && !line.includes(': ')) {
			const nextLine = answer[i + 1] ? answer[i + 1].trim() : '';
			result.push(`${line} ${nextLine}`);
			i++;
		} else {
			result.push(line);
		}
	}

	return result;
};

export const cleanFormAnsware = (
	answer: string,
	stage: keyof typeof QuestionWithForm
): Promise<ParsedAnswers> => {
	return new Promise((resolve) => {
		let cleanedAns = answer
			.split('\n')
			.map((line) => line.trim())
			.filter((line) => line.length > 0);

		const prompts = QuestionWithForm[stage];
		const result: ParsedAnswers = {};

		cleanedAns = joinKeyValueLines(cleanedAns);

		prompts.fields.forEach((prompt, index) => {
			const matchingLineIndex = cleanedAns.findIndex((line) =>
				line.trim().toLowerCase().startsWith(prompt.trim().toLowerCase())
			);

			if (matchingLineIndex >= 0) {
				let key = prompts.key[index];
				const value = cleanedAns[matchingLineIndex].split(':')[1].trim();

				if (stage === 'OLD_PATIENT_VERIFY' && key === 'IDENTITY') {
					if (value.length === 16) {
						key = 'NIK';
					} else {
						key = 'NORM';
					}
				}

				result[key] = value;
			}
		});

		resolve(result);
	});
};
