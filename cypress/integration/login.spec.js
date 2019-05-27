/// <reference types="Cypress" />

import constants from '../common/constants';
import loginPage from '../common/pageObjects/loginPage';
import userMenu from '../common/pageObjects/userMenu';

const EMAIL = 'o.stoliar3@gmail.com';

describe('login:', () => {
    before(() => {
        cy.ensurePageLoaded(constants.nav.login);
    });

    it('greets with welcome message', () => {
        loginPage.title.should("have.text", "Welcome");
    });

    it('requires email', () => {
        assertWontLogin();
    });

    it('requires password', () => {
        loginPage.emailInput.type(EMAIL);
        assertWontLogin();
    });

    describe('valid username and password', () => {
        it('requires valid username and password', () => {
            loginPage.emailInput.clear().type(EMAIL);
            loginPage.passwordInput.clear().type('invalid{enter}');
            loginPage.loginButton.click();
            cy.get('body .react-tiny-popover-container')
                .should('contain', 'E-mail and password combination does not exist', { timeout: 2000 });
        });
    });

    describe('check valid email combination', () => {
        it('requires valid email', () => {
            resetPageState();
            loginPage.emailInput.type(EMAIL);
            assertWontLogin();
        });
    });

    describe('succesfull login', () => {
        it('navigates to #/ on succesfull login', () => {
            loginPage.emailInput.clear().type(EMAIL);
            loginPage.passwordInput.type('easy123{enter}');
            cy.wait(2000);
            cy.hash().should('eq', '#/');
            cy.wait(5000);
        });
    });

    describe('logout', () => {
        it('logout from the course', () => {
            userMenu.logout();
            cy.wait(200);
            cy.hash().should('eq', constants.nav.login);
        });
    });

    describe('when skip login', () => {
        it('should login anonymously', () => {
            loginPage.skipButton.click();
            cy.wait(2000)
            cy.hash().should('eq', constants.nav.index);
        });
    });

    describe('logout', () => {
        it('logout from the course', () => {
            userMenu.logout();
            cy.wait(200);
            cy.hash().should('eq', constants.nav.login);
        });
    });

});

function assertWontLogin() {
    loginPage.loginButton.click();
    cy.hash().should('eq', constants.nav.login);
}

function resetPageState() {
    cy.setLocationHash(constants.nav.signup);
    cy.setLocationHash(constants.nav.login);
}