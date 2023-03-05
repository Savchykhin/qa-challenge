
import { defineFeature, loadFeature } from 'jest-cucumber';
const feature = loadFeature('features/LoggingIn.feature');
import { login } from "./utils"

defineFeature(feature, (test) => {
  test('User with valid credentials can login', ({ and, when, then }) => {
    let response;

    when('I send request with registered username and correct password', async (table) => {
      const { email, validpassword } = table[0];
      response = await login(email, validpassword);
    });

    then('I should be granted JWT token', () => {
      expect(response.body).toHaveProperty('data.session.token');
    });

    and('get 200 status code', () => {
      expect(response.status).toBe(200);
    });

    and('get `ok: true` in response body', () => {
      expect(response.body.ok).toBe(true);
    });
  });

  test('User with invalid credentials cannot login', ({ and, when, then }) => {
    let response;

    when('I send request with invalid login credentials', async (table) => {
      const { email, invalidpassword } = table[0];
      response = await login(email, invalidpassword);
    });

    then('I should not be granted JWT token', () => {
      expect(response.body).not.toHaveProperty('data.session.token');
    });

    and('get 400 status code', () => {
      expect(response.status).toBe(400);
    });

    and('get `ok: false` and `Invalid login credentials` message in response body', () => {
      expect(response.body.ok).toBe(false);
      expect(response.body.data.message).toBe("Invalid login credentials");
    });
  });
});