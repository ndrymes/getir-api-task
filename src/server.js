const app = require('./app');

const PORT = 3000
app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
module.exports = app;