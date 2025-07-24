import { RegistrationStage } from 'types/stage';

const LIST_STAGES = [
	'INITIALIZING',
	'CHECK_STATUS',
	'OLD_PATIENT_VERIFY',
	'NEW_PATIENT_BASIC',
	'IDENTITY',
	'PAYMENT_METHOD',
	'BPJS_REFERRAL',
	'VISIT_SCHEDULE',
	'DOCTOR_SELECTION',
	'CONFIRMATION',
	'DONE',
];

export enum QuestionKey {
	NOTE = `\n\n> Jawab sesuai dengan angka yang tertera pada pilihan.`,
	RETURN = `\n\n_Jawab dengan *0* jika ingin mengubah pilihan sebelumnya._`,
	RESET = `\n\n_Jawab dengan *reset* jika ingin mengulang proses pendaftaran antrian dari awal._`,
	FORMAT = `\n\n> Mohon untuk mengisi data anda sesuai dengan format yang diberikan.`,
	WRONG_FORMAT = `Format yang anda masukkan salah.${FORMAT}`,
	CHECK_STATUS = `Hallo, Selamat datang di sistem pendaftaran antrian *RS. MATA MAKASSAR.*\n\nApakah anda ingin melakukan pendaftaran sebagai: \n1. Pasien Lama\n2. Pasien Baru ${QuestionKey.NOTE}`,
	OLD_PATIENT_VERIFY = `Terima Kasih, Saat ini anda akan mendafatar sebgai *PASIEN LAMA*.${FORMAT}`,
	OLD_PATIENT_VERIFY_FORMAT = `No.Rekam Medis/NIK :\nTanggal Lahir : _(11-10-1997 tanggal-bulan-tahun)_`,
	NEW_PATIENT_BASIC = `Terima Kasih, Saat ini anda akan mendafatar sebgai *PASIEN BARU*.${FORMAT}`,
	NEW_PATIENT_BASIC_FORMAT = `Nama :\nTempat Lahir :\nTanggal Lahir : _(11-10-1997 tanggal-bulan-tahun)_`,
	IDENTITY = `Silahkan lengkapi biodata anda.${FORMAT}`,
	IDENTITY_FORMAT = `NIK :\nKontak : _(081xxxxxxxxx)_`,
	PAYMENT_METHOD = `Silahkan memilih jenis metode pembayaran yang akan anda gunakan.\n1. Testing\n2. Beta${NOTE}`,
	BPJS_REFERRAL = `Untuk pembayaran menggunakan BPJS/JKN, silahkan memilih riwaya rujukan anda sebagai berikut.\n1. Testing\n2. Beta${NOTE}`,
	VISIT_SCHEDULE = `Silahkan masukkan jadwal kunjungan untuk melihat jadwal dokter pada hari tersebut. \n\n *Format* :_(11-10-1997 tanggal-bulan-tahun)_`,
	DOCTOR_SELECTION = `Berikut jadwal dokter yang tersedia pada hari tersebut.\n1. Testing\n2. Beta${NOTE}`,
	CONFIRMATION = `Sebelum mengirim pastikan data anda telah sesuai.`,
	DONE = `Terima kasih atas kerja samanya. Diharapkan datang paling lambat 15 menit sebelum estimasi jam pendaftaran`,
}

export const LIST_STAGES_ANSWARE = {
	CHECK_STATUS: {
		1: 'Pasien Lama',
		2: 'Pasien Baru',
	},
};

const stagesConverter = (stages: RegistrationStage): number => {
	return LIST_STAGES.findIndex((stage) => stage === stages);
};

const getNextStage = (stages: RegistrationStage): RegistrationStage => {
	const currentStageIndex = LIST_STAGES.findIndex((stage) => stage === stages);
	return LIST_STAGES[currentStageIndex + 1] as RegistrationStage;
};

const getCurrentStage = (stages: RegistrationStage): string | undefined => {
	return LIST_STAGES.find((stage) => stage === stages);
};

export { stagesConverter, getNextStage, getCurrentStage };
