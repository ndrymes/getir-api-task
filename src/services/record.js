class recordServices {
  /**
     * The constructor
     *
     * @param logger
     */
  constructor(logger, recordsAgg, recordsModel) {
    this.logger = logger;
    this.recordsAgg = recordsAgg;
    this.recordsModel = recordsModel;
  }

  // eslint-disable-next-line class-methods-use-this
  async getReport({
    startDate, endDate, minCount, maxCount,
  }) {
    // The allowDiskUse function will help optimize when we have large queries
    const data = await this.recordsModel
      .aggregate(this.recordsAgg.getRecords({
        startDate, endDate, minCount, maxCount,
      }))
      .allowDiskUse(true);
    return data;
  }
}

module.exports = recordServices;
