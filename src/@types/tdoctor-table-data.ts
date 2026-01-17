export interface Doctor {
  id: string;
  name: string;
  role: string;
  email: string;
}

export interface DoctorDetailResponse {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  password: string;
}

export type ResponseTableDoctorData = {
  doctors: Doctor[];
  page: number;
  totalPages: number;
};
