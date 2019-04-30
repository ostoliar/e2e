class UserMenu {
    logout() {
        cy.get('#root > div:first-child > div:first-child > div:first-child > button').click();
        cy.wait(200);
        cy.get('body .react-tiny-popover-container button').contains('Logout').click();
    }
}

export default new UserMenu();