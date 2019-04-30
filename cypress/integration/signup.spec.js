/// <reference types="Cypress" />

describe('sign up', () => {
    before(() => {
        cy.ensurePageLoaded('/signup');
    });

    it('greets with sign up', () => {
        cy
            .wait(10000)
            .contains('Create Account');
    });

    it('contains name, email, password', () => {
        cy.get('form').should('contain', 'Name', 'Email', 'Password');

    });

    it('requires email', () => {
        cy.get('form').contains('Email').click();
        cy.hash().should('eq', '#/signup');
    });

    it('requires name, password', () => {
        cy.get('input[type=email]').type('o.stoliar3@gmail.com').click();
        cy.hash().should('eq', '#/signup');
        cy.get('input[type=email]').clear();
        cy.window().then((win) => {
            win.location.hash = '#/login';
        });
    });
});




// it('login anonymously', () => {
//     cy.contains('Skip step, start anonymously').click(0);
