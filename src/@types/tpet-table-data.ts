export interface Pet {
  id: string;
  name: string;
}

export type ResponseListPets = {
  pets: Pet[];
  page: number;
  totalPages: number;
};

export type ResponsePetsListOnPetOwnerPage = [
  {
    id: string;
    name: string;
    race: string;
    age: string;
    specie: string;
    weight: string;
    reports: [{ id: string }];
  }
];
