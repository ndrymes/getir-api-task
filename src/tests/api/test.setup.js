const RecordSchema = require('../../models/record');

const seedDB = async ({
  records,
}) => {
  await Promise.all([
    RecordSchema.insertMany(records),
  ]);
};

module.exports = {
  seedDB,
};
