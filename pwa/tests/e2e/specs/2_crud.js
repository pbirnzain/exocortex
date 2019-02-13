/* eslint-disable no-undef */

describe('Home view', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should allow adding and deleting topics', () => {
    // no initial topics
    cy.get(e('emptyState'))

    // add a topic
    cy.get(e('fabAdd')).click()
    cy.get(e('topicTitle')).type('my topic title')
    cy.get(e('editBack')).click()
    cy.contains(e('topicListTile'), 'my topic')

    cy.get(e('topicListTile')).should(t => expect(t.length).to.equal(1))

    // delete the topic
    cy.get(e('topicListTile')).first().click()
    cy.get(e('editDelete')).click()
    cy.get(e('emptyState'))
  })

  it('should allow editing topics', () => {
    cy.get(e('filterinfo')).click()
    cy.get(e('topicListTile')).first().click()

    cy.get(e('topicTitle')).should('have.value', 'Bauernladen')
    cy.get(e('topicDescription')).should('have.value', 'Wild-Obermayr')

    cy.get(e('topicTitle')).type('Modified')
    cy.get(e('editBack')).click()
    cy.get(e('topicListTile')).first().contains('BauernladenModified')
    cy.get(e('topicListTile')).first().click()

    cy.get(e('topicTitle')).should('have.value', 'BauernladenModified')
    cy.get(e('topicTitle')).clear().type('Bauernladen')
    cy.get(e('editBack')).click()
    cy.get(e('topicListTile')).first().contains('Bauernladen')
  })
})
