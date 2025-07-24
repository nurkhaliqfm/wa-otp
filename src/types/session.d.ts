import { PatientRegistrationForm } from './patient';

export interface PatientAnswer {
	stage: RegistrationStage;
	question: string;
	answer: string | null;
	timestamp: string;
}

export interface PatientSession {
	senderId: string;
	phoneNumber: string;
	currentStage: RegistrationStage;
	statusPasien?: StatusPasien;
	answers: PatientAnswer[];
	retryCount?: number;
	record: PatientRegistrationForm;
	createdAt: string;
	updatedAt: string;
}
