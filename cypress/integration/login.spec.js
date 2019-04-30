/// <reference types="Cypress" />

import constants from '../common/constants';
import loginPage from '../common/pageObjects/loginPage';

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
        loginPage.emailInput.type('o.stoliar3@gmail.com');
        assertWontLogin();
    });

    describe('valid username and password', () => {
        beforeEach(() => {
            loginPage.emailInput.clear();
            loginPage.passwordInput.clear();
        });

        it('requires valid username and password', () => {
            loginPage.emailInput.type('o.stoliar3@gmail.com');
            loginPage.passwordInput.type('invalid{enter}');
            loginPage.loginButton.click();
            cy.get('body .react-tiny-popover-container')
                .should('contain', 'E-mail and password combination does not exist', { timeout: 2000 });
        });
    });


    describe('check valid email combination', () => {
        it('requires valid email', () => {
            cy.window().then((win) => {
                win.location.hash = '#/signup';
            });

            cy.wait(200);

            cy.window().then((win) => {
                win.location.hash = '#/login';
            });

            cy.wait(200);
            cy.get('input[type=email]').type('o.stoliar3gmail.com');
            cy.get('input[type=password]').click()
            cy.hash().should('eq', '#/login');
        });
    });


    describe('succesfull login', () => {
        it('navigates to #/ on succesfull login', () => {
            cy.get('input[type=email]').clear().type('o.stoliar3@gmail.com');
            cy.get('input[type=password]').type('easy123{enter}');
            cy.wait(2000);
            cy.hash().should('eq', '#/');
            cy.wait(5000);
        });
    });

    describe('logout', () => {
        it('logout from the course', () => {
            cy.get('#root > div:first-child > div:first-child > div:first-child > button').click();
            cy.wait(200);
            cy.get('body .react-tiny-popover-container button').contains('Logout').click();
        });
    });
});

function assertWontLogin() {
    loginPage.loginButton.click();
    cy.hash().should('eq', constants.nav.login);
}