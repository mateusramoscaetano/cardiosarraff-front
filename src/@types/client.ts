import { TPetOwnerUpdateResponse } from "./tpet-owner-update-response";
import { Pet } from "./tpet-table-data";

export interface Client extends TPetOwnerUpdateResponse {
  pets: Pet[];
  password: string;
}
