const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./db');
const store = new SequelizeStore({ db });
const PORT = process.env.PORT || 8080;
const app = express();
module.exports = app;

// import { renderToString } from 'react-dom/server';

// function handleRender(req, res) {
//   // Create a new Redux store instance
//   const store = createStore(counterApp)

//   // Render the component to a string
//   const html = renderToString(
//     <Provider store={store}>
//       <App />
//     </Provider>
//   )

//   // Grab the initial state from our Redux store
//   const preloadedState = store.getState()

//   // Send the rendered page back to the client
//   res.send(renderFullPage(html, preloadedState))
// }

// function renderFullPage (html, preloadedState) {
  
// }

const createApp = () => app
  .use(morgan('dev'))
  .use(express.static(path.join(__dirname, '..', 'public')))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  // .use(handleRender)
  .use('/api', require('./api'))
  .use((req, res, next) =>
    path.extname(req.path).length > 0 ? res.status(404).send('Not found') : next())
  .use('*', (req, res) =>
    res.sendFile(path.join(__dirname, '..', 'public/index.html')))
  .use((err, req, res, next) =>
    res.status(err.status || 500).send(err.message || 'Internal server error.'));

const syncDb = () =>
  db.sync();

const listenUp = () =>
  app.listen(PORT, () =>
    console.log(`Mixing it up on port ${PORT}`));

// This evaluates as true when this file is run directly from the command line,
// i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// It will evaluate false when this module is required by another module - for example,
// if we wanted to require our app in a test spec
if (require.main === module) {
  store.sync()
    .then(syncDb)
    .then(createApp)
    .then(listenUp);
} else {
  createApp(app);
}

