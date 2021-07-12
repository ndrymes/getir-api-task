/* eslint-disable no-undef */
const winston = require('winston');
const MainController = require('../../controllers/index');
const RecordController = require('../../controllers/record');
const RecordValidator = require('../../validators/records');
const mockData = require('../mocks/payload');
const response = require('../mocks/dependencies/response');

jest.mock('winston');
jest.mock('../../controllers/record');
const getRecords = jest.fn();
getRecords.mockReturnValue(mockData.sampleResponseBody);
RecordController.prototype.getRecords = getRecords;

describe('main Controller', () => {
  afterAll(() => jest.clearAllMocks());
  const res = response();
  // mockDependencies //logger //RecordController;
  const recordController = new MainController(winston, new RecordController(), RecordValidator);
  describe('get Records', () => {
    it('should fetch records sucessfully when called with the right data', async () => {
      const sampleRequestBody = { ...mockData.mockRequestBody };
      const req = {
        body: sampleRequestBody,
      };
      getRecords.mockReturnValue(mockData.sampleResponseBody);
      await recordController.getRecords(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        code: 0,
        records: mockData.sampleResponseBody,
        message: 'SUCCESS',
      });
    });
  });

  it('should return an error when invlid request body is provided', async () => {
    const sampleRequestBody = { ...mockData.mockRequestBody };
    sampleRequestBody.startDate = '';
    const req = {
      body: sampleRequestBody,
    };
    getRecords.mockReturnValue(mockData.sampleResponseBody);
    await recordController.getRecords(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      code: 400,
      records: [],
      message: 'Bad request, Add all required fields, startDate, endDate, minCount, maxCount',
    });
  });

  it('should return an error when a required parameter is not provided', async () => {
    const sampleRequestBody = { ...mockData.mockRequestBody };
    delete sampleRequestBody.startDate;
    const req = {
      body: sampleRequestBody,
    };
    getRecords.mockReturnValue(mockData.sampleResponseBody);
    await recordController.getRecords(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      code: 400,
      records: [],
      message: 'Bad request, Add all required fields, startDate, endDate, minCount, maxCount',
    });
  });
});
