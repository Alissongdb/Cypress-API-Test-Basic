/// <reference types="cypress"/>

describe('Alterar Dispositivos', () => {
    it('Alterar dispositivo existente com sucesso', () => {

        const newDevice = {
            name: "Apple MacBook Air M1",
            data: {
                year: 2020,
                price: 999,
                CPU: "M1"
            }
        };

        const updatedDevice = {
            name: "Apple MacBook Pro M2",
            data: {
                year: 2022,
                price: 1999,
                CPU: "M2"
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
                method: "PUT",
                url: `https://api.restful-api.dev/objects/${deviceId}`,
                body: updatedDevice

            }).then((putResponse) => {

                expect(putResponse.status).to.equal(200); // Espera sucesso
                expect(putResponse.body).to.have.property('name').that.equals(updatedDevice.name);
                expect(putResponse.body).to.have.property('data').that.deep.equals(updatedDevice.data);
            });
        });
    });

    it('Tentar alterar um dispositivo inexistente', () => {

        const invalidId = "nonexistent-id-12345";

        const updatedDevice = {
            name: "Apple MacBook Pro M2",
            data: {
                year: 2022,
                price: 1999,
                CPU: "M2"
            }
        };

        cy.request({
            method: "PUT",
            url: `https://api.restful-api.dev/objects/${invalidId}`,
            body: updatedDevice,
            failOnStatusCode: false

        }).then((response) => {
            expect(response.status).to.equal(404);
            expect(response.body).to.have.property('error')
                .that.includes(`Object with id = ${invalidId} doesn't exist.`);
        });
    });
});
