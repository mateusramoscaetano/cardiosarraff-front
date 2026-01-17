type PetOwner = {
  name: string;
  phone: string;
  doctor: {
    name: string;
  };
};

type Pet = {
  id: string;
  pet_owner: PetOwner;
  name: string;
};
type ClinicItem = {
  name: string;
  id: string;
};
type DoctorItem = {
  name: string;
};

export type DataItem = {
  id: string;
  url: string;
  pet: Pet;
  type: string;
  Clinic: ClinicItem;
  doctor: DoctorItem;
  createdAt: string;
};

export type ResponseTableReportData = {
  reports: DataItem[];
  page: number;
  totalPages: number;
};
