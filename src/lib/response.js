/* eslint-disable camelcase */
class Response {
  constructor(code, message, res, error, data) {
    this.code = code;
    this.message = message;
    this.res = res;
    this.error = error;
    this.data = data;
  }

  res_message(statusCode) {
    return this.res.status(statusCode)
      .send({
        code: this.code,
        message: this.message,
        records: this.data,
      });
  }
}

module.exports = Response;
