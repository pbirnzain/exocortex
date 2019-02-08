/* eslint-disable no-undef */

describe('Home view', () => {
  beforeEach(() => {
    cy.location({log: false}).then((loc) => {
      if (loc.pathname != '/') {
        cy.visit('/')
      }
    })
  })

  it('should show no topics initialy', () => {
    cy.get(e('emptyState'))
  })

  it('should allow adding topics', () => {
    cy.get(e('fabAdd')).click()
    cy.get(e('topicTitle')).type('my topic title')
    cy.get(e('editBack')).click()

    cy.contains(e('topicListTile'), 'my topic')
  })

  it('should allow deleting topics', () => {
    cy.get(e('topicListTile')).first().click()
    cy.get(e('editDelete')).click()
    cy.get(e('emptyState'))
  })

  it('should correctly show blocked topics', () => {
    cy.get(e('filterblocked')).click()

    cy.get(e('topicListTile')).should((t) => {
      expect(t.length).to.equal(2)
    })
  })

  it('should correctly show informational topics', () => {
    cy.get(e('filterinfo')).click()

    cy.get(e('topicListTile')).should((t) => {
      expect(t.length).to.equal(28)
    })
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

  it('should open a topic when clicked', () => {
    cy.get(e('filterinfo')).click()
    cy.get(e('topicListTile')).first().click()

    cy.get(e('topicTitle')).should('have.value', 'Bauernladen')
    cy.get(e('topicDescription')).should('have.value', 'Wild-Obermayr')
  })
})
