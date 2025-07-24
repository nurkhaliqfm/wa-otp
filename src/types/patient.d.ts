export type PatientBiodata = {
	NAMA: string;
	TANGGAL_LAHIR: string;
	TEMPAT_LAHIR: string;
	NIK: string;
	CONTACT: string;
};

export interface PatientRegistrationForm extends PatientBiodata {
	JENIS: string;
	STATUS: number;
	POLI: string;
	POLI_BPJS: string;
	CARABAYAR: string;
	NO_KARTU_BPJS: string;
	NO_REF_BPJS: string;
	TANGGALKUNJUNGAN: string;
	JENIS_APLIKASI: number;
	DOKTER: string;
}
