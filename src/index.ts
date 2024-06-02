// import needed libraries
import * as express from 'express';
import * as bodyParser from 'body-parser';
import {pool} from './db'

const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 3000;


// starts the server
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
})

app.get('/', (req, res) => {
  pool.query('INSERT INTO test(var1) VALUES (1)', (error, result) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send("Hello World")
    }
  });
})

app.get('/data', (req, res) => {
  pool.query('SELECT * FROM test', (error, results) => {
      if (error) {
          res.status(500).send(error);
      } else {
          res.json(results);
      }
  });
});
