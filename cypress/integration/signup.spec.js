/// <reference types="Cypress" />

import constants from '../common/constants';
import signupPage from '../common/pageObjects/signupPage';
import loginPage from '../common/pageObjects/loginPage';


const EMAIL = 'o.stoliar3@gmail.com';
const INVALID_PASSWORD = 'o.stoliar@gmail.com'
const INVALID_EMAIL = 'o.stoliargmail.com'

describe('sign up', () => {
    before(() => {
        cy.ensurePageLoaded('/signup');
    });

    it('greets with sign up', () => {
        signupPage.title.should('have.text', 'Create Account');
    });

    // it('contains name, email, password', () => {
    //     cy.get('form').should('contain', 'Name', 'Email', 'Password');
    // });

    it('requires email', () => {
        // cy.get('form').contains('Email');
        assertWontSignup();
    });

    it('requires name, password', () => {
        signupPage.emailInput.type('EMAIL');
        assertWontSignup();
        // signupPage.emailInput.clear();
        // cy.window().then((win) => {
        //     win.location.hash = constants.nav.login;
        // });
    });
});

describe('when name is emty', () => {
    beforeEach(() => {
        signupPage.nameImput.clear();
    });

    describe('and email is empty', () => {
        beforeEach(() => {
            signupPage.emailInput.clear();
        });
    })

    describe('and password is empty', () => {
        beforeEach(() => {
            signupPage.passwordInput.clear();
        });
        it('should not sign up', () => {
            assertWontSignup();
        })
    });

    describe('password is not empty', () => {
        beforeEach(() => {
            signupPage.passwordInput.type(INVALID_PASSWORD);
        });

        it('should not signup', () => {
            assertWontSignup();
        });
    });
});

describe('when name is emty', () => {
    beforeEach(() => {
        signupPage.nameImput.clear();
    });

    describe('and email is empty', () => {
        beforeEach(() => {
            signupPage.emailInput.clear();
        });
    });
    describe('password is not empty', () => {
        beforeEach(() => {
            signupPage.passwordInput.type(INVALID_PASSWORD);
        });
    });


    it('should not sign up', () => {
        assertWontSignup();
    });
});

describe('when email is invalid', () => {
    beforeEach(() => {
        signupPage.passwordInput.type(INVALID_PASSWORD);
    });

    describe('and email is not contain @', () => {
        beforeEach(() => {
            signupPage.emailInput.type(INVALID_EMAIL);
        });
    })

    it('should not sign up', () => {
        assertWontSignup();
    });

    describe('and email does not contain domain', () => {
        beforeEach(() => {
            signupPage.emailInput.type('o.stoliar3@gmail');
        });
        it('should not sign up', () => {
            assertWontSignup();
        });
    });

});





function assertWontSignup() {
    signupPage.signUpButton.click();
    cy.hash().should('eq', constants.nav.signup);
}





// it('login anonymously', () => {
//     cy.contains('Skip step, start anonymously').click(0);
