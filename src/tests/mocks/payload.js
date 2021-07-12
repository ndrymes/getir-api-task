const mockRequestBody = {
  startDate: '2016-01-26',
  endDate: '2018-02-02',
  minCount: 2700,
  maxCount: 3000,
};

const sampleResponseBody = [
  {
    key: 'ibfRLaFT',
    createdAt: '2016-12-25T16:43:27.909Z',
    totalCount: 2892,
  },
  {
    key: 'pxClAvll',
    createdAt: '2016-12-19T10:00:40.050Z',
    totalCount: 2772,
  },
  {
    key: 'XCiSazeS',
    createdAt: '2016-12-13T18:58:33.864Z',
    totalCount: 2906,
  },
  {
    key: 'kzSqsBrJ',
    createdAt: '2016-12-02T15:07:30.465Z',
    totalCount: 2803,
  },
];
const samplePayload = [
  {
    _id: '5ee21588e07f053f990cec7d',
    key: 'AlpgKxsdliUG',
    createdAt: '2016-12-25T16:43:27.909Z',
    counts: [
      341,
      997,
      1554,
    ],
  },
  {
    _id: '5ee21587e07f053f990cebb5',
    key: 'pxWfhQUtqkvS',
    createdAt: '2016-12-19T10:00:40.050Z',
    counts: [
      1179,
      15,
      1578,
    ],
  },
];
module.exports = {
  mockRequestBody, sampleResponseBody, samplePayload,
};
