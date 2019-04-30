class LoginPage {
    get title() {
        return cy.get("label[for=formLogin]");
    }

    get loginButton() {
        return cy.get('form').contains('Login');
    }

    get emailInput() {
        return cy.get('input[type=email]');
    }

    get passwordInput() {
        return cy.get('input[type=password]');
    }

    get skipButton() {
        return cy.get('a').contains('Skip step, start anonymously');
    }
}

export default new LoginPage();