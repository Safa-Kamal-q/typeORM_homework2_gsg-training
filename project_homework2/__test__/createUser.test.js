import 'dotenv/config';
import '../dist/config.js';
import dataSource from '../dist/db/dataSource.js';
import express from 'express'
import request from 'supertest'

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

beforeAll(async () => {
    await dataSource.initialize().then(() => {
        console.log('DB connected');
    }).catch(err => {
        console.log("DB connection failed", err);
    });
}, 30000);

afterAll(async () => {
    await dataSource.destroy();
});

import { login } from "../dist/controllers/user.js";
import jwt from 'jsonwebtoken';

let validToken;

describe("Login process", () => {
    const validData = {
        "userName": "Ruba",
        "password": "r1112345"
    };

    beforeAll(async () => {
        validToken = await login(validData.userName, validData.password);
    })

    it("returns a token", async () => {
        expect(validToken).toBeTruthy();
    });

    it("has a valid token", () => {
        const tokenIsValid = jwt.verify(validToken, process.env.SECRET_KEY || '');
        expect(tokenIsValid).toBeTruthy();
    });

    it("has valid payload", () => {
        const payload = jwt.decode(validToken, { json: true });
        expect(payload?.userName).toEqual(validData.userName);
    });
});


import usersRouter from "../dist/routers/user.js";
app.use("/users", usersRouter);

describe('Create User ', () => {
    it('should return a 201 status code ', async () => {
        const newUser = {
            userName: "Safa",
            email: "ahmad@email.com",
            password: "123456",
            type: "admin",
            roles: ["cd82e975-703c-417c-808e-542780a1050d"]
        };

        const response = await request(app)
            .post('/users')
            .set('Authorization', validToken)
            .send(newUser);

        expect(response.status).toBe(201);
        expect(response.text).toBe("user added successfully");
    });
});