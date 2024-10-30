import { PetData } from "../../types/pet";

class PetStoreAPI {
  getPetsByStatus(status: string) {
    return cy.request(`https://petstore.swagger.io/v2/pet/findByStatus?status=${status}`);
  }

  createPet(data: PetData) {
    return cy.request('POST', 'https://petstore.swagger.io/v2/pet', data);
  }

  updatePet(data: PetData) {
    return cy.request('POST', 'https://petstore.swagger.io/v2/pet', data);
  }

  deletePet(petId: string) {
    return cy.request('DELETE', `https://petstore.swagger.io/v2/pet/${petId}`);
  }
}

export default PetStoreAPI;