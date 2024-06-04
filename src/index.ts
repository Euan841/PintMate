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
      res.status(200).send("Hello World 2")
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

interface VisitedPub {
  type: "visited_pub";
  friend: {
    userID: number;
    name: string;
    profilePicture: string;
  }
  pub: {
    pubID: string;
    pubName: string;
  }
  timestamp: string; // ISO 8601 format
}

interface CompletedGroup {
  type: "completed_group";
  friend: {
    userID: number;
    name: string;
    profilePicture: string;
  }
  area: string;
  timestamp: string; // ISO 8601 format
}

interface MilestoneAchieved {
  type: "milestone_achieved";
  friend: {
    userID: number;
    name: string;
    profilePicture: string;
  }
  milestone: number;
  timestamp: string; // ISO 8601 format
}

interface LeftReview {
  type: "left_review";
  friend: {
    userID: number;
    name: string;
    profilePicture: string;
  }
  pub: {
    pubID: string;
    pubName: string;
  }
  review: {
    userID: string;
    score: number; // Rating score (1-5)
    reviewText: string;
  };
  timestamp: string; // ISO 8601 format
}

interface JoinedApp {
  type: "joined_app";
  friend: {
    userID: number;
    name: string;
    profilePicture: string;
  }
  timestamp: string; // ISO 8601 format
}

type FeedItem = VisitedPub | CompletedGroup | MilestoneAchieved | LeftReview | JoinedApp;

const exampleFeed: FeedItem[] = [
  {
    "type": "visited_pub",
    "friend": {
      "userID": 1,
      "name": "Alice",
      "profilePicture": "alice_pic.jpg"
    },
    "pub": {
      "pubID": "pub001",
      "pubName": "The Red Lion"
    },
    "timestamp": "2024-06-01T14:30:00Z"
  },
  {
    "type": "completed_group",
    "friend": {
      "userID": 2,
      "name": "Bob",
      "profilePicture": "bob_pic.jpg"
    },
    "area": "Downtown",
    "timestamp": "2024-06-02T16:00:00Z"
  },
  {
    "type": "milestone_achieved",
    "friend": {
      "userID": 3,
      "name": "Charlie",
      "profilePicture": "charlie_pic.jpg"
    },
    "milestone": 10,
    "timestamp": "2024-06-03T18:00:00Z"
  },
  {
    "type": "left_review",
    "friend": {
      "userID": 4,
      "name": "Diana",
      "profilePicture": "diana_pic.jpg"
    },
    "pub": {
      "pubID": "pub002",
      "pubName": "The King's Head"
    },
    "review": {
      "userID": "4",
      "score": 5,
      "reviewText": "Great atmosphere and friendly staff!"
    },
    "timestamp": "2024-06-04T19:00:00Z"
  },
  {
    "type": "joined_app",
    "friend": {
      "userID": 5,
      "name": "Edward",
      "profilePicture": "edward_pic.jpg"
    },
    "timestamp": "2024-06-05T20:00:00Z"
  },
  {
    "type": "visited_pub",
    "friend": {
      "userID": 6,
      "name": "Fiona",
      "profilePicture": "fiona_pic.jpg"
    },
    "pub": {
      "pubID": "pub003",
      "pubName": "The Crown Inn"
    },
    "timestamp": "2024-06-06T21:00:00Z"
  },
  {
    "type": "completed_group",
    "friend": {
      "userID": 7,
      "name": "George",
      "profilePicture": "george_pic.jpg"
    },
    "area": "Uptown",
    "timestamp": "2024-06-07T22:00:00Z"
  },
  {
    "type": "milestone_achieved",
    "friend": {
      "userID": 8,
      "name": "Hannah",
      "profilePicture": "hannah_pic.jpg"
    },
    "milestone": 5,
    "timestamp": "2024-06-08T23:00:00Z"
  },
  {
    "type": "left_review",
    "friend": {
      "userID": 9,
      "name": "Ian",
      "profilePicture": "ian_pic.jpg"
    },
    "pub": {
      "pubID": "pub004",
      "pubName": "The White Horse"
    },
    "review": {
      "userID": "9",
      "score": 4,
      "reviewText": "Nice place but a bit crowded."
    },
    "timestamp": "2024-06-09T14:00:00Z"
  },
  {
    "type": "joined_app",
    "friend": {
      "userID": 10,
      "name": "Jack",
      "profilePicture": "jack_pic.jpg"
    },
    "timestamp": "2024-06-10T15:00:00Z"
  },
  {
    "type": "visited_pub",
    "friend": {
      "userID": 11,
      "name": "Karen",
      "profilePicture": "karen_pic.jpg"
    },
    "pub": {
      "pubID": "pub005",
      "pubName": "The Green Dragon"
    },
    "timestamp": "2024-06-11T16:00:00Z"
  },
  {
    "type": "completed_group",
    "friend": {
      "userID": 12,
      "name": "Leo",
      "profilePicture": "leo_pic.jpg"
    },
    "area": "Eastside",
    "timestamp": "2024-06-12T17:00:00Z"
  },
  {
    "type": "milestone_achieved",
    "friend": {
      "userID": 13,
      "name": "Mona",
      "profilePicture": "mona_pic.jpg"
    },
    "milestone": 15,
    "timestamp": "2024-06-13T18:00:00Z"
  },
  {
    "type": "left_review",
    "friend": {
      "userID": 14,
      "name": "Nina",
      "profilePicture": "nina_pic.jpg"
    },
    "pub": {
      "pubID": "pub006",
      "pubName": "The Black Bull"
    },
    "review": {
      "userID": "14",
      "score": 3,
      "reviewText": "Average experience, nothing special."
    },
    "timestamp": "2024-06-14T19:00:00Z"
  },
  {
    "type": "joined_app",
    "friend": {
      "userID": 15,
      "name": "Oscar",
      "profilePicture": "oscar_pic.jpg"
    },
    "timestamp": "2024-06-15T20:00:00Z"
  },
  {
    "type": "visited_pub",
    "friend": {
      "userID": 16,
      "name": "Paul",
      "profilePicture": "paul_pic.jpg"
    },
    "pub": {
      "pubID": "pub007",
      "pubName": "The Blue Boar"
    },
    "timestamp": "2024-06-16T21:00:00Z"
  },
  {
    "type": "completed_group",
    "friend": {
      "userID": 17,
      "name": "Quincy",
      "profilePicture": "quincy_pic.jpg"
    },
    "area": "Westside",
    "timestamp": "2024-06-17T22:00:00Z"
  },
  {
    "type": "milestone_achieved",
    "friend": {
      "userID": 18,
      "name": "Rachel",
      "profilePicture": "rachel_pic.jpg"
    },
    "milestone": 20,
    "timestamp": "2024-06-18T23:00:00Z"
  },
  {
    "type": "left_review",
    "friend": {
      "userID": 19,
      "name": "Sam",
      "profilePicture": "sam_pic.jpg"
    },
    "pub": {
      "pubID": "pub008",
      "pubName": "The Silver Fox"
    },
    "review": {
      "userID": "19",
      "score": 2,
      "reviewText": "Not a great experience, would not recommend."
    },
    "timestamp": "2024-06-19T14:00:00Z"
  },
  {
    "type": "joined_app",
    "friend": {
      "userID": 20,
      "name": "Tina",
      "profilePicture": "tina_pic.jpg"
    },
    "timestamp": "2024-06-20T15:00:00Z"
  }
]

app.get('/feed', (req, res) => {
  res.json(exampleFeed);
});