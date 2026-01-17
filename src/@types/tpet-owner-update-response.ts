export type TPetOwnerUpdateResponse = {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  doctorId: string;
  clinicId?: string;
};
