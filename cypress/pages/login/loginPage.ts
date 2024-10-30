class LoginPage {
    visit() {
        cy.visit('https://demoqa.com/login');
    }

    fillUsername(username: string) {
        cy.get('#userName').type(username);
    }

    fillPassword(password: string) {
        cy.get('#password').type(password);
    }

    submit() {
        cy.get('#login').click();
    }

    validateLoginRequest() {
        cy.intercept("POST", "https://demoqa.com/Account/v1/Login").as("loginRequest");
        cy.wait("@loginRequest").then((interception) => {
            if (interception.response) {
                const response = interception.response.body;
                expect(interception.response.statusCode).to.eq(200);
                expect(response.password).to.eq('1234567Aa3Advc@');
                expect(response.username).to.eq('testeCypress');
            } else {
                throw new Error('A resposta da interceptação não foi recebida.');
            }
        });
    }

    validateInvalidUsername() {
        cy.get('#userName').should('have.class', 'is-invalid');
    }

    validateInvalidPassword() {
        cy.get('#password').should('have.class', 'is-invalid');
    }

    goToBookStore() {
        cy.get('#gotoStore').click();
    }

    validateBookStoreAccess() {
        cy.get('#userName-value').should('be.visible');
    }
}

export default LoginPage;