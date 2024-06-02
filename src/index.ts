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

//TESTING DATA

interface Pub {
  id: number;
  name: string;
  coordinate: {
      latitude: number;
      longitude: number;
  };
  visited: boolean;
  imgs: string[];
}

// Example data
const pubs: Pub[] = [
  {
      id: 1,
      name: "Malt Shovel",
      coordinate: {
          latitude: 51.064634403576925,
          longitude: -0.331125913184682
      },
      visited: true,
      imgs: ["crown-1.png", "crown-2.png"]
  },
  {
      id: 2,
      name: "The Lynd Cross",
      coordinate: {
          latitude: 51.063710071150595,
          longitude: -0.3322078296009859
      },
      visited: false,
      imgs: ["the-lynd-cross-1.png", "the-lynd-cross-2.png"]
  },
  {
      id: 3,
      name: "The Bear",
      coordinate: {
          latitude: 51.06199853684657,
          longitude: -0.32850815009521195
      },
      visited: true,
      imgs: ["the-bear-1.png", "the-bear-2.png"]
  },
  {
      id: 4,
      name: "Crown",
      coordinate: {
          latitude: 51.06257652002502,
          longitude: -0.3285208182900828
      },
      visited: false,
      imgs: ["crown-1.png", "crown-2.png"]
  },
  // Add more pubs as needed
];

// Define a route to return the example data
app.get('/data', (req, res) => {
  res.json(pubs);
});