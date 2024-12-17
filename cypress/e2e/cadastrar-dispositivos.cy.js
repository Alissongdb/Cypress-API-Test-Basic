/// <reference types="cypress"/>

describe('Cadastrar Dispositivos', () => {
    it('Cadastrar dispositivo específico com sucesso', () => {

        const newDevice = {
            name: "Apple MacBook Air M1",
            data: {
                year: 2020,
                price: 999,
                CPU: "M1"
            }
        };

        cy.request({
            method: "POST",
            url: "https://api.restful-api.dev/objects", // URL direta
            body: newDevice

        }).then((response) => {

            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('id').that.is.a('string').and.not.be.empty;
            expect(response.body).to.have.property('name').that.equals(newDevice.name);

        });
    });

    it('Cadastrar dispositivo com campo "year" vazio', () => {

        const invalidDevice = {
            name: "Apple MacBook Air M1",
            data: {
                year: "",
                price: 999,
                CPU: "M1"
            }
        };

        cy.request({
            method: "POST",
            url: "https://api.restful-api.dev/objects",
            body: invalidDevice,
            failOnStatusCode: false

        }).then((response) => {

            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('data');
            expect(response.body.data.year).to.be.oneOf([null, ""]);
        });
    });
});
