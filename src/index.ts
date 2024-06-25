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


interface PubDetailed {
  images: string[];
  name: string;
  Description: string;
  contactNumber: string;
  starRating: number;
  reviews: string[];
  prices: {
    [key: string]: number;
  };
  events: {
    displayImage: string;
    title: string;
    dateTime: string;
    eventID: number;
  };
  openingHours: {
    Monday: string;
    Tuesday: string;
    Wednesday: string;
    Thursday: string;
    Friday: string;
    Saturday: string;
    Sunday: string;
  };
  visited: boolean;
}

// Example of using the interface
const examplePubDetailed: PubDetailed = {
  images: [
    "pintmate.uk/images/img1.png",
    "pintmate.uk/images/img2.png"
  ],
  name: "Malt Shovel",
  Description: "Lively pub full of locals with Karaoke",
  contactNumber: "07132984735",
  starRating: 4.2,
  reviews: [
    "Great Vibe ...",
    "Second Review...",
    "Third Review..."
  ],
  prices: {
    "1005": 6.60,
    "1006": 7.20,
    "1021": 4.00
  },
  events: {
    displayImage: "pintmate.uk/images/eventImg1.png",
    title: "Karaoke",
    dateTime: "2024-06-25T15:30:00Z",
    eventID: 1004
  },
  openingHours: {
    Monday: "09-23",
    Tuesday: "09-23",
    Wednesday: "09-23",
    Thursday: "09-23",
    Friday: "09-01",
    Saturday: "09-01",
    Sunday: "09-22"
  },
  visited: true
};



app.get('/pubDetailed', (req, res) => {
  //TODO get pubID out of req header
  res.json(examplePubDetailed);
});