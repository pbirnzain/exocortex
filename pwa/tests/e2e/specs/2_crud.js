/* eslint-disable no-undef */

describe('Home & Edit page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should allow adding topics', () => {
    cy.get(e('filterpinned')).click()

    // no initial topics
    cy.get(e('emptyState')).should('be.visible')

    // add a topic
    cy.get(e('fabAdd')).click()
    cy.get(e('topicTitle')).type('my topic title')
    cy.get(e('editBack')).click()
    cy.get(e('topicListTile')).contains('my topic')

    cy.get(e('topicListTile')).should(t => expect(t.length).to.equal(1))
  })

  it('should allow editing topics', () => {
    cy.get(e('filterpinned')).click()
    cy.get(e('topicListTile')).contains('my topic title').click()

    cy.get(e('topicTitle')).should('have.value', 'my topic title')

    cy.get(e('topicTitle')).type('Modified')
    cy.get(e('editBack')).click()
    cy.get(e('topicListTile')).contains('my topic titleModified').click()

    cy.get(e('topicTitle')).should('have.value', 'my topic titleModified')
    cy.get(e('topicTitle')).clear().type('my topic title')
    cy.get(e('editBack')).click()
    cy.get(e('topicListTile')).contains('my topic title')
    cy.get(e('topicListTile')).contains('my topic titleModified').should('not.exist')
  })

  it('should allow deleting topics', () => {
    // delete the topic
    cy.get(e('topicListTile')).contains('my topic title').click()
    cy.get(e('editDelete')).click()

    cy.get(e('topicListTile')).should('not.exist')
    cy.get(e('emptyState')).should('be.visible')
  })
})
