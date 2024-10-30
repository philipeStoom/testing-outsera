import { invalidPetData, petData, updatedPetData } from '../../fixtures/petStore/petData';
import PetStoreAPI from "../../pages/petStore/petStorePage";

describe('Teste E2E da API PetStore', () => {
  const petStorePage = new PetStoreAPI();

  describe('Cenários Positivos', () => {
    it('Deve retornar pets disponíveis ao consultar por status "available"', () => {
      petStorePage.getPetsByStatus('available').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.headers['access-control-allow-headers']).to.eq('Content-Type, api_key, Authorization');
        expect(response.headers['access-control-allow-methods']).to.eq("GET, POST, DELETE, PUT");
      });
    });

    it('Deve criar um novo pet com sucesso', () => {
      petStorePage.createPet(petData).then((response) => {
        Cypress.env("saveResponsePet", response.body);
        expect(response.status).to.eq(200);
        expect(response.body.id).to.eq(12345);
        expect(response.body.name).to.eq('doggie teste');
        expect(response.body.status).to.eq("available");
      });
    });

    it('Deve atualizar os dados de um pet existente', () => {
      const getResponsePet = Cypress.env("saveResponsePet");

      petStorePage.updatePet(updatedPetData).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.id).to.eq(getResponsePet.id);
        expect(response.body.name).to.eq('update doggie teste');
        expect(response.body.status).to.eq("unavailable");
      });
    });

    it('Deve excluir um pet existente com sucesso', () => {
      const getResponsePet = Cypress.env("saveResponsePet");

      petStorePage.deletePet(getResponsePet.id).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });


  describe('Cenários Negativos', () => {
    it('Deve falhar ao criar um pet com dados inválidos', () => {
      petStorePage.createPet(invalidPetData).then((response) => {
        expect(response.status).to.not.eq(400);
      });
    });
  });
});