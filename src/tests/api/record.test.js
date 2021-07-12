/* eslint-disable no-undef */
// we will use supertest to test HTTP requests/responses
const request = require('supertest');
const mongoose = require('mongoose');
const server = require('../../server');
const { seedDB } = require('./test.setup');
const config = require('../../config/config');

const VERSION = config.version;
const mockData = require('../mocks/payload');

describe('Records Controller', () => {
  // Close the server to avoid memory leaks
  afterAll(() => mongoose.disconnect());
  beforeAll(async () => {
    await seedDB({ records: mockData.samplePayload });
  });
  describe('get Records', () => {
    it('It should test if base url is healthy', async () => {
      const response = await request(server).get('/');
      expect(response.body).toStrictEqual({ message: 'Welcome to the Test API Service' });
      expect(response.statusCode).toBe(200);
    });

    it('It should fetch record succesfully', async () => {
      const response = await request(server).post(`/${VERSION}/records`)
        .send(mockData.mockRequestBody);
      expect(response.statusCode).toBe(200);
      expect(response.body.code).toBe(0);
      expect(response.body.message).toBe('SUCCESS');
    });
  });

  it('should return an error when invalid request body is provided', async () => {
    const sampleRequestBody = { ...mockData.mockRequestBody };
    sampleRequestBody.startDate = '';
    const response = await request(server).post(`/${VERSION}/records`)
      .send(sampleRequestBody);
    expect(response.statusCode).toBe(400);
    expect(response.body.code).toBe(400);
    expect(response.body.message).toBe('Bad request, Add all required fields, startDate, endDate, minCount, maxCount');
  });

  it('hould return an error when a required field is missing in the request body', async () => {
    const sampleRequestBody = { ...mockData.mockRequestBody };
    delete sampleRequestBody.startDate;
    const response = await request(server).post(`/${VERSION}/records`)
      .send(sampleRequestBody);
    expect(response.statusCode).toBe(400);
    expect(response.body.code).toBe(400);
    expect(response.body.message).toBe('Bad request, Add all required fields, startDate, endDate, minCount, maxCount');
  });
});
