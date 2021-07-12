const Response = require('../lib/response');
const HTTPStatus = require('../constants/http_status');

class MainController {
  /**
     * Class Constructor
     * @param logger - winston logger
     * @param recordController
     * @param recorValidator
     */
  constructor(logger, recordControllers, recordValidator) {
    this.logger = logger;
    this.recordControllers = recordControllers;
    this.recordValidator = recordValidator;
  }

  // fetches the r
  async getRecords(req, res) {
    const {
      startDate, endDate, minCount, maxCount,
    } = req.body;
    try {
      // validates request body
      await this.recordValidator(req.body);
      const data = await this.recordControllers.getRecords({
        startDate,
        endDate,
        minCount,
        maxCount,
      });
      // returns success response
      return this.handleOk(res, data);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return this.handleBadRequest(res, error);
      }
      console.log({error});
      return this.handleInternalServerError(res, error);
    }
  }

  handleOk(res, data) {
    this.logger.info('records gotten successfully');
    const response = new Response(HTTPStatus.OK, 'SUCCESS', res, false, data);
    return response.res_message(200);
  }

  handleNoContent(res, data) {
    this.logger.info('No available record matching your request ');
    const emptyResponse = new Response(HTTPStatus.NO_CONTENT, 'No content available', res, false, data);
    return emptyResponse.res_message(404);
  }

  handleInternalServerError(res, err) {
    this.logger.error('Error from getting records data', err);
    const resp = new Response(HTTPStatus.INTERNAL_SERVER_ERROR, 'Internal server error', res, true, []);
    return resp.res_message(500);
  }

  // eslint-disable-next-line class-methods-use-this
  handleBadRequest(res) {
    const resp = new Response(HTTPStatus.BadRequest, 'Bad request, Add all required fields, startDate, endDate, minCount, maxCount', res, true, []);
    return resp.res_message(400);
  }
}

module.exports = MainController;
