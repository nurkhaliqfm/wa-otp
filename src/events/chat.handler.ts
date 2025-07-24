import { IChat } from 'types/chat';
import { getSession, initializingStage, recordAnswer } from './session.handler';
import { QuestionKey, stagesConverter } from '@utils/stages';
import { cleanFormAnsware } from '@utils/form';
import { validateKeyValue } from 'validation/keyValue.validation';

export async function handleIncomingMessage(chat: IChat) {
	if (chat.command) console.log('Upsert Messages Log : ', chat);

	const session = getSession(chat.senderId);

	console.log(
		'Im Running....',
		stagesConverter(session.currentStage),
		': ',
		session.currentStage
	);

	switch (session.currentStage) {
		case 'INITIALIZING':
			initializingStage(
				chat.senderId,
				'CHECK_STATUS',
				QuestionKey.CHECK_STATUS
			);

			chat.replay({
				text: QuestionKey.CHECK_STATUS,
			});

			break;

		case 'CHECK_STATUS':
			if (chat.text === '1') {
				recordAnswer(chat.senderId, session.currentStage, chat.text);

				initializingStage(
					chat.senderId,
					'OLD_PATIENT_VERIFY',
					QuestionKey.OLD_PATIENT_VERIFY
				);

				chat.replay([
					{
						text: QuestionKey.OLD_PATIENT_VERIFY,
					},
					{
						text: QuestionKey.OLD_PATIENT_VERIFY_FORMAT,
					},
				]);
			} else if (chat.text === '2') {
				recordAnswer(chat.senderId, session.currentStage, chat.text);

				initializingStage(
					chat.senderId,
					'NEW_PATIENT_BASIC',
					QuestionKey.NEW_PATIENT_BASIC
				);

				chat.replay([
					{
						text: QuestionKey.NEW_PATIENT_BASIC,
					},
					{
						text: QuestionKey.NEW_PATIENT_BASIC_FORMAT,
					},
				]);
			}

			break;

		case 'OLD_PATIENT_VERIFY':
			const dataOldPatienReg = await cleanFormAnsware(
				chat.text,
				session.currentStage
			);

			const validateOldReg = validateKeyValue(
				dataOldPatienReg,
				session.currentStage
			);

			if (validateOldReg) {
				recordAnswer(
					chat.senderId,
					session.currentStage,
					JSON.stringify(dataOldPatienReg)
				);

				initializingStage(
					chat.senderId,
					'PAYMENT_METHOD',
					QuestionKey.PAYMENT_METHOD
				);

				chat.replay({
					text: QuestionKey.PAYMENT_METHOD,
				});
			} else {
				chat.replay({ text: QuestionKey.WRONG_FORMAT });
			}

			break;

		case 'NEW_PATIENT_BASIC':
			const dataNewPatienReg = await cleanFormAnsware(
				chat.text,
				session.currentStage
			);

			const validateNewReg = validateKeyValue(
				dataNewPatienReg,
				session.currentStage
			);

			if (validateNewReg) {
				recordAnswer(
					chat.senderId,
					session.currentStage,
					JSON.stringify(dataNewPatienReg)
				);

				initializingStage(
					chat.senderId,
					'IDENTITY',
					QuestionKey.IDENTITY_FORMAT
				);

				chat.replay([
					{
						text: QuestionKey.IDENTITY,
					},
					{
						text: QuestionKey.IDENTITY_FORMAT,
					},
				]);
			} else {
				chat.replay({ text: QuestionKey.WRONG_FORMAT });
			}

			break;

		case 'IDENTITY':
			const dataIdentityPatient = await cleanFormAnsware(
				chat.text,
				session.currentStage
			);

			const validateIdentity = validateKeyValue(
				dataIdentityPatient,
				session.currentStage
			);

			if (validateIdentity) {
				recordAnswer(
					chat.senderId,
					session.currentStage,
					JSON.stringify(dataIdentityPatient)
				);

				initializingStage(
					chat.senderId,
					'PAYMENT_METHOD',
					QuestionKey.PAYMENT_METHOD
				);

				chat.replay({ text: QuestionKey.PAYMENT_METHOD });
			} else {
				chat.replay({ text: QuestionKey.WRONG_FORMAT });
			}
			break;

		case 'PAYMENT_METHOD':
			if (chat.text === '1') {
				recordAnswer(chat.senderId, session.currentStage, chat.text);

				initializingStage(
					chat.senderId,
					'VISIT_SCHEDULE',
					QuestionKey.VISIT_SCHEDULE
				);

				chat.replay({
					text: QuestionKey.VISIT_SCHEDULE,
				});
			} else if (chat.text === '2') {
				recordAnswer(chat.senderId, session.currentStage, chat.text);

				initializingStage(
					chat.senderId,
					'BPJS_REFERRAL',
					QuestionKey.BPJS_REFERRAL
				);

				chat.replay({
					text: QuestionKey.BPJS_REFERRAL,
				});
			}
			break;

		case 'BPJS_REFERRAL':
			break;

		case 'VISIT_SCHEDULE':
			recordAnswer(chat.senderId, session.currentStage, chat.text);

			initializingStage(
				chat.senderId,
				'DOCTOR_SELECTION',
				QuestionKey.DOCTOR_SELECTION
			);

			chat.replay({
				text: QuestionKey.DOCTOR_SELECTION,
			});
			break;

		case 'DOCTOR_SELECTION':
			recordAnswer(chat.senderId, session.currentStage, chat.text);

			initializingStage(
				chat.senderId,
				'CONFIRMATION',
				QuestionKey.CONFIRMATION
			);

			chat.replay({
				text: QuestionKey.CONFIRMATION,
			});

			break;

		case 'CONFIRMATION':
			recordAnswer(chat.senderId, session.currentStage, chat.text);

			initializingStage(chat.senderId, 'DONE', QuestionKey.DONE);

			chat.replay({
				text: QuestionKey.DONE,
			});
			break;

		case 'DONE':
			console.log('SEND DATA TO SERVICE RS MATA MAKASSAR TO CREATE ANTRIAN');
			break;

		default:
			break;
	}
}
