/* eslint-disable no-undef */

describe('Edit page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should allow editing textchunks', () => {
    // create new topic
    cy.get(e('fabAdd')).click()

    // create textchunks
    cy.get(e('editCreateNote')).click()
    cy.get(e('textChunk')).get('textarea').type('my textchunk text')
    cy.get(e('editCreateNote')).click()
    cy.get(e('textChunk')).last().get('textarea').type('my second textchunk text')

    // unfocus last textchunk
    cy.get(e('topicTitle')).click()

    cy.get(e('textChunk')).should(t => expect(t.length).to.equal(2))
      .first().contains('my textchunk text')

    cy.get(e('textChunk')).last().click()
    cy.get(e('textChunk')).last().get('textarea').type('moretext')
    cy.get(e('textChunk')).last().get('.v-input__append-inner i.v-icon').contains('clear').click()

    cy.get(e('topicTitle')).click()
    cy.get(e('textChunk')).should(t => expect(t.length).to.equal(1))

    cy.get(e('editDelete')).click()
  })
})
