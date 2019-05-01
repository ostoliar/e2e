/// <reference types="Cypress" />

import constants from '../common/constants';
import signupPage from '../common/pageObjects/signupPage';
import loginPage from '../common/pageObjects/loginPage';


const EMAIL = 'ya@sgrggg.com';
const NAME = 'Oleks Stoliar';
const PASSWORD = 'abcabcabc';
const INVALID_PASSWORD = 'o.stoliar@gmail.com';
const INVALID_EMAIL = 'o.stoliargmail.com';

describe('sign up', () => {
    before(() => {
        cy.ensurePageLoaded('/signup');
    });

    it('greets with sign up', () => {
        signupPage.title.should('have.text', 'Create Account');
    });

    it('requires email', () => {
        assertWontSignup();
    });

    it('requires name, password', () => {
        signupPage.emailInput.type('EMAIL');
        assertWontSignup();
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
                signupPage.passwordInput.clear().type(INVALID_PASSWORD);
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
                signupPage.passwordInput.clear().type(INVALID_PASSWORD);
            });
        });


        it('should not sign up', () => {
            assertWontSignup();
        });
    });

    describe('when email is invalid', () => {
        beforeEach(() => {
            signupPage.passwordInput.clear().type(INVALID_PASSWORD);
        });

        describe('and email is not contain @', () => {
            beforeEach(() => {
                signupPage.emailInput.clear().type(INVALID_EMAIL);
            });
        })

        it('should not sign up', () => {
            assertWontSignup();
        });

        describe('and email does not contain domain', () => {
            beforeEach(() => {
                signupPage.emailInput.clear().type('o.stoliar3@gmail');
            });
            it('should not sign up', () => {
                assertWontSignup();
            });
        });
    });
    describe('when user does not exist', () => {
        it('should register and open course', () => {
            cy.server();
            cy.route({
                method: 'POST',
                url: '**/user/exists',
                status: 204,
                force404: true,
                response: {}
            }).as('exists');
            cy.route({
                method: 'POST',
                url: '**/user/register',
                status: 200,
                force404: true,
                response: {"token":"token"}
            }).as('register');

            signupPage.nameImput.clear().type(NAME);
            signupPage.emailInput.clear().type(EMAIL);
            signupPage.title.click();
            cy.wait('@exists');
            
            signupPage.passwordInput.clear().type(PASSWORD);

            signupPage.signUpButton.click();
            cy.wait('@register');
            cy.get('@register').should((xhr) => {
                expect(xhr.requestBody).to.have.property('email', EMAIL);
                expect(xhr.requestBody).to.have.property('name', NAME);
                expect(xhr.requestBody).to.have.property('password', PASSWORD);
            });

            cy.hash().should('eq', constants.nav.index);
        });
    });
});

function assertWontSignup() {
    signupPage.signUpButton.click();
    cy.hash().should('eq', constants.nav.signup);
}





// it('login anonymously', () => {
//     cy.contains('Skip step, start anonymously').click(0);
