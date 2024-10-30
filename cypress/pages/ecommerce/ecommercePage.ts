class EcommercePage {
    visit() {
        cy.visit('https://www.saucedemo.com/');
    }

    login(username: string, password: string) {
        cy.get('#user-name').type(username);
        cy.get('#password').type(password);
        cy.get('#login-button').click();
    }

    addItemToCart(itemSelector: string) {
        cy.get(itemSelector).click();
    }

    goToCart() {
        cy.get('.shopping_cart_link').click();
    }

    verifyCartItemCount(expectedCount: string) {
        cy.get('.shopping_cart_badge').should('have.text', expectedCount);
    }

    proceedToCheckout() {
        cy.get('#checkout').click();
    }

    fillDeliveryForm(firstName: string, lastName: string, postalCode: string) {
        cy.get('#first-name').type(firstName);
        cy.get('#last-name').type(lastName);
        cy.get('#postal-code').type(postalCode);
        cy.get('#continue').click();
    }

    validateCheckoutItems() {
        cy.get('[data-test="payment-info-value"]').should('have.text', 'SauceCard #31337');
        cy.get('[data-test="shipping-info-value"]').should('have.text', 'Free Pony Express Delivery!');
        cy.get('[data-test="subtotal-label"]').should('have.text', 'Item total: $29.99');
        cy.get('[data-test="tax-label"]').should('have.text', 'Tax: $2.40');
        cy.get('[data-test="total-label"]').should('have.text', 'Total: $32.39');
    }

    completeOrder() {
        cy.get('#finish').click();
    }

    verifyOrderCompletion() {
        cy.get('[data-test="complete-header"]').should('have.text', 'Thank you for your order!');
    }
}

export default EcommercePage;