/// <reference types="cypress"/>

describe('Listar Dispositivos', () => {

    it('Listar dispositivos', () => {
        cy.request({
            method: "GET",
            url: "https://api.restful-api.dev/objects"
        }).then((response) => {

            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array').and.not.be.empty;

            const firstItem = response.body[0];
            expect(firstItem)
                .to.have.property('id').that.is.a('string').and.not.be.empty;
            expect(firstItem.id)
                .to.equal('1');
            expect(firstItem)
                .to.have.property('name').that.is.a('string').and.not.be.empty;
            expect(firstItem.name)
                .to.equal('Google Pixel 6 Pro');

        });
    });


    it('Listar dispositivo inexistente', () => {

        cy.request({
            method: "GET",
            url: "https://api.restful-api.dev/objects/100",
            failOnStatusCode: false

        })
            .then((result) => {
                expect(result.status)
                    .equal(404)
                expect(result.body.error)
                    .equal('Oject with id=100 was not found.')

            })

    });

})