const query = {
  getRecords: ({
    startDate, endDate, minCount, maxCount,
  }) => {
    const pipeline = [];
    // The pipeline stages have been split up to make the pipeline more readable and easy to modify
    // Stage 1
    pipeline.push({
      $match: {
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      },
    });

    // Stage 2
    pipeline.push({
      $addFields: {
        totalCount: { $sum: '$counts' },
      },
    });

    // Stage 3
    pipeline.push({
      $match: {
        totalCount: {
          $gte: minCount,
          $lte: maxCount,
        },
      },
    });

    // Stage 4
    pipeline.push({
      $project: {
        _id: 0,
        key: 1,
        createdAt: 1,
        totalCount: 1,
      },
    });
    return pipeline;
  },
};

module.exports = query;
