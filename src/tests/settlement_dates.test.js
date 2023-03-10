const app = require("../index.js");
const request = require("supertest");

const settlementDateRoute = "/api/v1/settlementDate";

describe(`GET ${settlementDateRoute}`, () => {

    const initialDate = "2016-08-21";
    const delay = "25";

    const expectedResponse = {
        ok: true,
        initialQuery: {
            delay,
            initialDate
        },
        results: {
            businessDate: "2016-09-26T07:00:00Z",
            holidayDays: 1,
            totalDays: 37,
            weekendDays: 11
        }
    };

    test("should respond with a 200 status code and settlement data for default US country", async () => {
        const response = await request(app).get(`${settlementDateRoute}?delay=${delay}&initialDate=${initialDate}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject(expectedResponse);
    })

    test("should respond with a 200 status code and settlement data for Ukraine country", async () => {
        const country = "UA";
        const response = await request(app).get(`${settlementDateRoute}?delay=${delay}&initialDate=${initialDate}&country=${country}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject(expectedResponse);
    })

    // This test should be failing because of defect in app's code - status code 500 is returned and error is not handled
    test("should respond with `ok: false` and error message when `delay` param is not set", async () => {
        const response = await request(app).get(`${settlementDateRoute}?initialDate=${initialDate}`);
        expect(response.body.ok).toBe(false);
    })
})