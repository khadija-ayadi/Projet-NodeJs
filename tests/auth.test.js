const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/modules/app');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/recouvra_test');
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});

describe('Auth - Register', () => {
    it('should register a new user', async () => {
        const res = await request(app).post('/api/users/register').send({
            name:     'John Doe',
            email:    'john@example.com',
            password: '123456',
            role:     'agent',
        });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('token');
    });

    it('should fail if email already exists', async () => {
        await request(app).post('/api/users/register').send({
            name:     'John Doe',
            email:    'john@example.com',
            password: '123456',
            role:     'agent',
        });
        const res = await request(app).post('/api/users/register').send({
            name:     'John Doe',
            email:    'john@example.com',
            password: '123456',
            role:     'agent',
        });
        expect(res.statusCode).toBe(400);
    });

    it('should fail if required fields are missing', async () => {
        const res = await request(app).post('/api/users/register').send({
            email: 'missing@example.com',
        });
        expect(res.statusCode).toBe(400);
    });
});

describe('Auth - Login', () => {
    it('should login with correct credentials', async () => {
        await request(app).post('/api/users/register').send({
            name:     'Jane Doe',
            email:    'jane@example.com',
            password: '123456',
            role:     'agent',
        });
        const res = await request(app).post('/api/users/login').send({
            email:    'jane@example.com',
            password: '123456',
        });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
    });

    it('should fail with wrong password', async () => {
        const res = await request(app).post('/api/users/login').send({
            email:    'jane@example.com',
            password: 'wrongpassword',
        });
        expect(res.statusCode).toBe(401);
    });

    it('should fail with non-existent email', async () => {
        const res = await request(app).post('/api/users/login').send({
            email:    'nobody@example.com',
            password: '123456',
        });
        expect(res.statusCode).toBe(401);
    });
});