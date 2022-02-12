const app = require('../api/app');
const  request = require('supertest');

describe('api/users', ()=>{
    describe("POST", () => {
        test('It validates requests', async () => {
            const response = await request(app).post('/users').send({
                firstName: 'Silla'
            })
            expect(response.statusCode).toBe(400)
        })
    })
})