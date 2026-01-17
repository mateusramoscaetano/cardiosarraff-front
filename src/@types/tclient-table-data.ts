interface Pet {
  id: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  doctorId: string;
  clinicId: string;
  pets: Pet[];
}

export type ResponseTableClientData = {
  petOwners: Client[];
  page: number;
  totalPages: number;
};
