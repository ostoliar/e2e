// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

/// <reference types="Cypress" />

import constants from '../common/constants';

function ensurePageLoaded(url = constants.nav.index) {
    cy.hash()
        .then(hash => {
            if (hash === url) {
                return;
            }

            if (hash.length === 0) {
                cy.visit('/');
                cy.get('aside[data-sidebar=true]', { timeout: 1000000 });
            }
        })
        .window()
        .then(win => {
            if (url === constants.nav.index) {
                return;
            }

            win.location.hash = url;
        });
}

function setLocationHash(hash) {
    cy.window().then((win) => {
        win.location.hash = hash;
    });

    cy.wait(200);
}

Cypress.on("window:before:load", win => {
    win.fetch = null;
});

Cypress.Commands.add("ensurePageLoaded", ensurePageLoaded);
Cypress.Commands.add("setLocationHash", setLocationHash);
