import { defineFeature, loadFeature } from 'jest-cucumber';
const feature = loadFeature('features/EmailList.feature');
import { baseUrl, login } from "./utils"
import request from "supertest";

defineFeature(feature, (test) => {
  test('Get a list of clinic`s email addresses with user with limited permissions', ({ given, when, then, and }) => {
    let jwtToken, response;

    given('user with limited permissions is logged in', async (table) => {
      const { email, password } = table[0];
      const { body: { data: { session: { token } } } } = await login(email, password);
      jwtToken = token;
    });

    when('user tries to get a list of email addresses of practice id 2', async () => {
      response = await request(baseUrl).get(`/api/clinics/2/emails`)
        .set('Authorization', `Bearer ${jwtToken}`)
    });

    then('user should be prevented from getting the list', () => {
      expect(response.status).toBe(400);
      expect(response.body.ok).toBe(false);
    })

    and('response body should contain error message', (table) => {
      const { message } = table[0];
      expect(response.body.data.error).toBe(message);
    })
  });

  test('Get a list of clinic`s email addresses with unauthenticated user', ({ when, then, and }) => {
    let response;

    when('the unauthenticated user tries to get a list of email addresses of practice id 2', async () => {
      response = await request(baseUrl).get(`/api/clinics/2/emails`)
    });

    then('user should be prevented from getting the list', () => {
      expect(response.status).toBe(401);
      expect(response.body.ok).toBe(false);
    })

    and('response body should contain error message', (table) => {
      const { message } = table[0];
      expect(response.body.data.message).toBe(message);
    })

  });
});