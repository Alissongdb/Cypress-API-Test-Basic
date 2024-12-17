/// <reference types="cypress"/>

describe('Deletar Dispositivos', () => {
    it('Deletar dispositivo existente com sucesso', () => {
        // Primeiro, criar um dispositivo para garantir que ele existe
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
            url: "https://api.restful-api.dev/objects",
            body: newDevice

        }).then((postResponse) => {
            expect(postResponse.status).to.equal(200);
            const deviceId = postResponse.body.id;

            cy.request({
                method: "DELETE",
                url: `https://api.restful-api.dev/objects/${deviceId}`
            }).then((deleteResponse) => {
                expect(deleteResponse.status).to.equal(200);
                expect(deleteResponse.body).to.have.property('message').that.includes('has been deleted.');
            });
        });
    });

    it('Tentar deletar um dispositivo inexistente', () => {

        const invalidId = "nonexistent-id-12345";

        cy.request({
            method: "DELETE",
            url: `https://api.restful-api.dev/objects/${invalidId}`,
            failOnStatusCode: false

        }).then((response) => {
            expect(response.status).to.equal(404);
            expect(response.body).to.have.property('error').that.includes('Object with id');
        });
    });
});
