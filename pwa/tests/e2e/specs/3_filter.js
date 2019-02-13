/* eslint-disable no-undef */

describe('Home view', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should correctly filter topics', () => {
    cy.get(e('filterurgent')).click()
    cy.get(e('topicListTile')).should(t => expect(t.length).to.equal(0))

    cy.get(e('filterready')).click()
    cy.get(e('topicListTile')).should(t => expect(t.length).to.equal(25))

    cy.get(e('filterblocked')).click()
    cy.get(e('topicListTile')).should(t => expect(t.length).to.equal(2))

    cy.get(e('filterinfo')).click()
    cy.get(e('topicListTile')).should(t => expect(t.length).to.equal(28))

    cy.get(e('filterall')).click()
    cy.get(e('topicListTile')).should(t => expect(t.length).to.equal(93))
  })

  it('should filter according to search text', () => {
    cy.get(e('filterinfo')).click()
    cy.get(e('searchText')).type('inf')

    cy.get(e('topicListTile')).should((t) => {
      expect(t.length).to.equal(2)
    })

    cy.get(e('searchText')).clear()

    cy.get(e('topicListTile')).should((t) => {
      expect(t.length).to.equal(28)
    })
  })
})
