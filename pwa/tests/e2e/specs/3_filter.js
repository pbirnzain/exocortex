/* eslint-disable no-undef */

describe('Home view', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should correctly filter topics', () => {
    cy.get(e('topicListTile')).should(t => expect(t.length).to.equal(1))

    cy.get(e('filterpinned')).click()
    cy.get(e('topicListTile')).should(t => expect(t.length).to.equal(0))
    cy.get(e('emptyState')).should('be.visible')

    cy.get(e('filterready')).click()
    cy.get(e('topicListTile')).should(t => expect(t.length).to.equal(2))

    cy.get(e('filterinfo')).click()
    cy.get(e('topicListTile')).should(t => expect(t.length).to.equal(1))

    cy.get(e('filterblocked')).click()
    cy.get(e('topicListTile')).should(t => expect(t.length).to.equal(1))

    cy.get(e('filteropen')).click()
    cy.get(e('topicListTile')).should(t => expect(t.length).to.equal(4))

    cy.get(e('filterarchived')).click()
    cy.get(e('topicListTile')).should(t => expect(t.length).to.equal(1))
  })

  it('should filter according to search text', () => {
    cy.get(e('filterinfo')).click()
    cy.get(e('searchText')).type('dbaf1932')
    cy.get(e('topicListTile')).should(t => expect(t.length).to.equal(1))

    cy.get(e('searchText')).type('nraenreaaren')
    cy.get(e('topicListTile')).should(t => expect(t.length).to.equal(0))
    cy.get(e('emptyState')).should('be.visible')

    cy.get(e('searchText')).clear()
    cy.get(e('topicListTile')).should(t => expect(t.length).to.equal(1))
    cy.get(e('emptyState')).should('not.be.visible')
  })
})
