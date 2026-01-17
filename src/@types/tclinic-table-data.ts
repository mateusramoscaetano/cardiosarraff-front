export interface Clinic {
  id: string;
  name: string;
  role: string;
  email: string;
  address: string;
  password: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export type ResponseTableClinicData = {
  clinics: Clinic[];
  page: number;
  totalPages: number;
};
