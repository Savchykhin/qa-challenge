import { defineFeature, loadFeature } from 'jest-cucumber';
const feature = loadFeature('features/SearchClinics.feature');
import { baseUrl, login } from "./utils"
import request from "supertest";

defineFeature(feature, (test) => {
    test('Search clinics with authenticated user', ({ when, given, then }) => {
        let jwtToken, response;

        given('user is logged in', async (table) => {
            const { email, password } = table[0];
            const { body: { data: { session: { token } } } } = await login(email, password);
            jwtToken = token;
        });

        when('search for clinics with `veterinary` word', async () => {
            response = await request(baseUrl).get(`/api/clinics?term=veterinary`)
                .set('Authorization', `Bearer ${jwtToken}`)
        });

        then('search returns names of clinics which contain `veterinary`', async () => {
            response.body.data.forEach(entry => expect(entry.displayName).toMatch(/[Vv]eterinary/))
        });

    });

    test('Search clinics with unauthenticated user', ({ when, then, and }) => {
        let response;

        when('search for clinics with `veterinary` word', async () => {
            response = await request(baseUrl).get(`/api/clinics?term=veterinary`)
        });

        then('user should be prevented from getting the search results', () => {
            expect(response.status).toBe(401);
            expect(response.body.ok).toBe(false);
        });

        and('response body should contain error message', (table) => {
            const { message } = table[0];
            expect(response.body.data.message).toBe(message);
        })
    });
});