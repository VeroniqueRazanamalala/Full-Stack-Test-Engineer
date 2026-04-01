/// <reference types="cypress" />


describe('Flux Complet Candidat', () => {
  it('devrait créer, voir et valider le candidat', () => {
    cy.visit('http://localhost:5173');

    cy.contains('Ajouter un Candidat').click();

    cy.get('input[placeholder="Prénom"]').type('Cypress');
    cy.get('input[placeholder="Nom"]').type('Robot');
    cy.get('input[placeholder="Email"]').type('robot@cypress.io');
    cy.get('button[type="submit"]').click();

    cy.contains('Cypress Robot').should('be.visible');

    cy.contains('Cypress Robot').click();

    cy.contains('Valider le candidat').click();
    
    cy.contains('Candidat validé avec succès !', { timeout: 10000 }).should('be.visible');
  });
});
