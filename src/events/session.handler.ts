import fs from 'fs';
import path from 'path';
import { PatientSession } from 'types/session';
import { RegistrationStage } from 'types/stage';

const SESSIONS_DIR = path.join(__dirname, '..', 'data');

if (!fs.existsSync(SESSIONS_DIR)) {
	fs.mkdirSync(SESSIONS_DIR);
}

function getSessionFilePath(senderId: string): string {
	return path.join(SESSIONS_DIR, `${senderId}.json`);
}

function loadSessions(senderId: string): PatientSession | null {
	const filePath = getSessionFilePath(senderId);
	if (fs.existsSync(filePath)) {
		const data = fs.readFileSync(filePath, 'utf-8');
		return JSON.parse(data);
	}
	return null;
}

function saveSessions(senderId: string, session: PatientSession): void {
	const filePath = getSessionFilePath(senderId);
	fs.writeFileSync(filePath, JSON.stringify(session, null, 2), 'utf-8');
}

export function incrementRetry(senderId: string): number {
	const session = getSession(senderId);
	session.retryCount = (session.retryCount || 0) + 1;
	session.updatedAt = new Date().toISOString();
	saveSessions(senderId, session);

	return session.retryCount;
}

export function resetRetry(senderId: string) {
	const session = getSession(senderId);
	session.retryCount = 0;
	session.updatedAt = new Date().toISOString();
	saveSessions(senderId, session);
}

export function resetSession(senderId: string): PatientSession {
	const now = new Date().toISOString();
	const phoneNumber = senderId.split('@')[0];
	const session: PatientSession = {
		senderId,
		phoneNumber,
		currentStage: 'INITIALIZING',
		answers: [],
		record: {
			NAMA: '',
			TANGGAL_LAHIR: '',
			TEMPAT_LAHIR: '',
			NIK: '',
			CONTACT: '',
			JENIS: '',
			STATUS: 1,
			POLI: '',
			POLI_BPJS: '',
			CARABAYAR: '',
			NO_KARTU_BPJS: '',
			NO_REF_BPJS: '',
			TANGGALKUNJUNGAN: '',
			JENIS_APLIKASI: 22,
			DOKTER: '',
		},
		createdAt: now,
		updatedAt: now,
	};

	saveSessions(senderId, session);
	return session;
}

export function getSession(senderId: string): PatientSession {
	const existing = loadSessions(senderId);
	if (existing) return existing;

	const now = new Date().toISOString();
	const phoneNumber = senderId.split('@')[0];
	const session: PatientSession = {
		senderId,
		phoneNumber: phoneNumber,
		currentStage: 'INITIALIZING',
		answers: [],
		record: {
			NAMA: '',
			TANGGAL_LAHIR: '',
			TEMPAT_LAHIR: '',
			NIK: '',
			CONTACT: '',
			JENIS: '',
			STATUS: 1,
			POLI: '',
			POLI_BPJS: '',
			CARABAYAR: '',
			NO_KARTU_BPJS: '',
			NO_REF_BPJS: '',
			TANGGALKUNJUNGAN: '',
			JENIS_APLIKASI: 22,
			DOKTER: '',
		},
		createdAt: now,
		updatedAt: now,
	};

	saveSessions(senderId, session);
	return session;
}

export function hasStageAnswered(senderId: string): boolean {
	const session = getSession(senderId);
	const currentStageAnswer = session.answers.find(
		({ stage }) => stage === session.currentStage
	);

	if (!currentStageAnswer) return false;

	return currentStageAnswer.answer !== null;
}

export function recordAnswer(
	senderId: string,
	stage: RegistrationStage,
	answer: string | null
): PatientSession {
	const now = new Date().toISOString();
	const session = getSession(senderId);

	const selectedCurrentStageIndex = session.answers.findIndex(
		({ stage: s }) => s === stage
	);

	if (selectedCurrentStageIndex >= 0) {
		session.answers[selectedCurrentStageIndex] = {
			...session.answers[selectedCurrentStageIndex],
			answer: answer,
			timestamp: now,
		};
	}

	session.currentStage = stage;
	session.updatedAt = now;

	saveSessions(senderId, session);
	return session;
}

export function initializingQuestion(
	senderId: string,
	next: RegistrationStage,
	stage: RegistrationStage,
	question: string,
	answer: string | null
): PatientSession {
	const now = new Date().toISOString();
	const session = getSession(senderId);

	session.answers.push({
		stage: next,
		question,
		answer: answer,
		timestamp: now,
	});

	session.currentStage = stage;
	session.updatedAt = now;

	saveSessions(senderId, session);
	return session;
}

export function initializingStage(
	senderId: string,
	stage: RegistrationStage,
	question: string
): PatientSession {
	const now = new Date().toISOString();
	const session = getSession(senderId);

	session.answers.push({
		stage: stage,
		question,
		answer: null,
		timestamp: now,
	});

	session.currentStage = stage;
	session.updatedAt = now;

	saveSessions(senderId, session);
	return session;
}
