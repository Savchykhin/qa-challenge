import request from "supertest";

export const baseUrl = "https://qa-challenge-api.scratchpay.com";

export const login = async (email, password) => 
    await request(baseUrl).get(`/api/auth?email=${email}&password=${password}`);