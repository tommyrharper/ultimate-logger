const express = require('express');
const path = require('path');
const apiRouter = require('./routes/api');

const app = express();
const port = process.env.port || 3000;

app.use(express.json());

const DIST_DIR = path.join(__dirname, '../dist'); // NEW
const HTML_FILE = path.join(DIST_DIR, 'index.html'); // NEW

// // statically serve everything in the build folder on the route '/build'
// // app.use('/build', express.static(path.join(__dirname, '../build')));
// app.use('/build', express.static(path.join(__dirname, DIST_DIR)));
app.use(express.static(DIST_DIR)); // NEW

app.use('/api', apiRouter);

// serve index.html on the route '/'
app.get('/', (req, res) => res.status(200).sendFile(HTML_FILE));

const mockResponse = {
  foo: 'bar',
  bar: 'foo'
};

app.get('/apiTest', (req, res) => {
  console.log('hit /api');
  res.send(mockResponse);
});

// global error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  return res.status(errorObj.status).json(errorObj.message);
});

// listens on port 3000 -> http://localhost:3000/
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port: ${port}`);
});