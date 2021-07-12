class Record {
  /**
       * Class Constructor
       * @param logger - winston logger
       * @param recordServices - // Agrgregates record properly
       *
       */

  constructor(logger, recordServices) {
    this.logger = logger;
    this.recordService = recordServices;
  }

  async getRecords({
    startDate, endDate, minCount, maxCount,
  }) {
    // Agrgregates record properly
    const data = await this.recordService.getReport({
      startDate, endDate, minCount, maxCount,
    });
    return data;
  }
}
module.exports = Record;
