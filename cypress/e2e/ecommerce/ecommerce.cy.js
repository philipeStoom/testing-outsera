/// <reference types="cypress" />
import EcommercePage from "../../pages/ecommerce/EcommercePage";

// Teste End-to-end
describe('Teste de Fluxo do E-commerce', () => {
    const ecommercePage = new EcommercePage();

    before(() => {
        ecommercePage.visit();
    });

    it('Deve concluir o fluxo do carrinho de compras', () => {
        //Login na Plataforma
        ecommercePage.login('standard_user', 'secret_sauce');

        // Adicionar item ao Carrinho
        ecommercePage.addItemToCart('#add-to-cart-sauce-labs-backpack');
        ecommercePage.goToCart();
        ecommercePage.verifyCartItemCount('1');
        ecommercePage.proceedToCheckout();

        // Preenchimento de formulário de entrega
        ecommercePage.fillDeliveryForm('username', 'lastName', '13092432');

        // Validação dos itens do carrinho de compras
        ecommercePage.validateCheckoutItems();
        ecommercePage.completeOrder();

        // Valida a tela de Finalização
        ecommercePage.verifyOrderCompletion();
    });
});



