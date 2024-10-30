/// <reference types="cypress" />

import { loginDataSucess } from "../../fixtures/login/login";
import LoginPage from "../../pages/login/loginPage";

// Teste End-to-end
describe('Teste de Login na plataforma demoqa', () => {
  const loginPage = new LoginPage();

  beforeEach(() => {
    loginPage.visit();
  });

  it('Deve realizar o login com sucesso', function () {
    const { username, password } = loginDataSucess;

    loginPage.fillUsername(username);
    loginPage.fillPassword(password);
    loginPage.submit();
    loginPage.validateLoginRequest();
  });

  it('Deve exibir erro ao tentar logar sem fornecer o nome de usuário', function () {
    const { password } = loginDataSucess;

    loginPage.fillPassword(password);
    loginPage.submit();
    loginPage.validateInvalidUsername();
  });

  it('Deve exibir erro ao tentar logar sem fornecer a senha', function () {
    const { username } = loginDataSucess;

    loginPage.fillUsername(username);
    loginPage.submit();
    loginPage.validateInvalidPassword();
  });

  it('Deve acessar a página de livros após login bem-sucedido', function () {
    const { username, password } = loginDataSucess;

    loginPage.fillUsername(username);
    loginPage.fillPassword(password);
    loginPage.submit();
    loginPage.validateLoginRequest();
    loginPage.goToBookStore();
    loginPage.validateBookStoreAccess();
  });
});
