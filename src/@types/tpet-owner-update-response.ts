export type TPetOwnerUpdateResponse = {
  id: string;
  name: string;
  userName: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  doctorId: string;
  clinicId?: string;
};
