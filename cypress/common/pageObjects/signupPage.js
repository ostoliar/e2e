class SignupPage {
    get title() {
        return cy.get("label[for=signUp]");
    }
   
    get emailInput() {
        return cy.get('input[type=email]');
    }
    
    get signUpButton() {
        return cy.get('button[type=submit]');
    }

    get nameImput() {
        return cy.get('input[type=text]');
    }

    get passwordInput() {
        return cy.get('input[type=password]');
    }
}

export default new SignupPage();