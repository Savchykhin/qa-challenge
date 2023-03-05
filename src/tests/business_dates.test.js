const app = require("../index.js");
const request = require("supertest");

const businessDateRoute = "/api/v1/isBusinessDay";
const date = "2016-08-24"

describe(`GET ${businessDateRoute}`, () => {

    test("should respond with a 200 status code and `results: true` for a business date in default US country", async () => {
        const response = await request(app).get(`${businessDateRoute}?date=${date}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.ok).toBe(true);
        expect(response.body.results).toBe(true);
    })

    test("should respond with a 200 status code and `results: false` for a non business date in default US country", async () => {
        const date = "2016-05-21"
        const response = await request(app).get(`${businessDateRoute}?date=${date}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.ok).toBe(true);
        expect(response.body.results).toBe(false);
    })


    test("should respond with a 200 status code and `results: true` for a business date in non default country", async () => {
        const country = "TR";
        const response = await request(app).get(`${businessDateRoute}?date=${date}&country=${country}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.ok).toBe(true);
        expect(response.body.results).toBe(true);
    })

    test("should respond with a 200 status code and `results: false` for a non business date in non default country", async () => {
        const country = "UA";
        const response = await request(app).get(`${businessDateRoute}?date=${date}&country=${country}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.ok).toBe(true);
        expect(response.body.results).toBe(false);
    })

    test("should return error message when `date` URL param is not passed", async () => {
        const dateErrorMsg = "A valid date is required";
        const response = await request(app).get(businessDateRoute);
        expect(response.statusCode).toBe(200);
        expect(response.body.ok).toBe(false);
        expect(response.body.errorMessage).toBe(dateErrorMsg);
    })
})