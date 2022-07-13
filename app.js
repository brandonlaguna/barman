const path = require('path');
const fs = require('fs');

const React = require('react');
const ReactDOMServer =require('react-dom/server');
const express = require('express');

const App = require('./src/App');

const PORT = process.env.PORT || 3006;
const app = express();

app.get('*', (req, res) => {
  const app = ReactDOMServer.renderToString(App);
  const indexFile = path.resolve('./build/index.html');

  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    );
  });
});

app.use(express.static('./build'));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});