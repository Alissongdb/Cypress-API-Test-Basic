/// <reference types="cypress"/>

describe('Buscar Dispositivos', () => {

  it('Buscar dispositivo especifico', () => {

    cy.request({
      method: "GET",
      url: "https://api.restful-api.dev/objects/ff808181932badb60193d1edb5ff6c65"
    })
      .then((result) => {
        expect(result.status)
          .equal(200)
        expect(result.body.id)
          .equal('ff808181932badb60193d1edb5ff6c65')
        expect(result.body.id)
          .not.empty
        expect(result.body.name)
          .equal('Apple MacBook Air M2')

      })

  })

  it('Buscar dispositivo inexistente', () => {

    cy.request({
      method: "GET",
      url: "https://api.restful-api.dev/objects/ff808181932badb60193d1edb5ff6c6",
      failOnStatusCode: false

    })
      .then((result) => {
        expect(result.status)
          .equal(404)
        expect(result.body.error)
          .equal('Oject with id=ff808181932badb60193d1edb5ff6c6 was not found.')

      })

  });

})