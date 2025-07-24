import { QuestionWithForm } from '@utils/form';
import { ParsedAnswers } from 'types/stage';

export const validateKeyValue = (
	answer: ParsedAnswers,
	stage: keyof typeof QuestionWithForm
): boolean => {
	const stageKeysAns = QuestionWithForm[stage].key;

	for (const key of stageKeysAns) {
		let answerKey = Object.keys(answer).find((k) => k === key);

		if (stage === 'OLD_PATIENT_VERIFY' && key === 'IDENTITY')
			answerKey =
				Object.keys(answer).find((k) => k === 'NIK') ||
				Object.keys(answer).find((k) => k === 'NORM');

		if (answerKey) {
			if (
				answer[answerKey] === undefined ||
				answer[answerKey] === null ||
				answer[answerKey].toString().trim() === ''
			) {
				return false;
			}
		} else {
			return false;
		}
	}

	return true;
};
