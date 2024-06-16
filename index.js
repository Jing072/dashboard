// Imports
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {} from "dotenv/config";
import { MongoClient, ServerApiVersion } from "mongodb";
import bcrypt from "bcrypt";
import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import cookies from "cookie-parser";

// Geheime sleutel
console.log(crypto.randomBytes(64).toString("hex"));

// Variabelen
const app = express();
const port = 3000;
const saltRounds = 10;
const databaseUrl = process.env.CONNECTION_URL;
const client = new MongoClient(databaseUrl);

// App.use(...)
app.use(express.static("server"));
app.use(cors());
app.use(bodyParser.json());
app.use(cookies());

// Paden naar alle data
app.get("/weather", (req, res) => {
  fetchWeatherData().then((data) => {
    res.json(data);
  });
});

app.get("/schedule", (req, res) => {
  fetchScheduleData().then((data) => {
    res.json(data);
  });
});

app.get("/parttime-job", (req, res) => {
  fetchParttimeJobData().then((data) => {
    res.json(data);
  });
});

// Alle paden voor login en registratie
app.get("/loggedIn", (req, res) => {
  return res.json({ loggedInUser: req.user.email });
  // return res.sendStatus(401);
});

// Test route om te kijken of we ingelogd zijn
app.get("/hello", authenticateToken, (req, res) => {
  res.send("Hello " + req.user.email);
});

app.post("/register", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  insertUser(email, password).then((existingUser) =>
    sendRegisterResponse(res, existingUser)
  );
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  loginUser(email, password).then((loggedIn) =>
    sendLoginResponse(res, email, loggedIn)
  );
});

app.post("/logout", (req, res) => {
  sendLogoutResponse(res);
});

// Pad om een bericht te verzenden
app.post("/send-message", (req, res) => {
  const message = req.body.message;

  sendMessage(message).then(res.send({ sendMessage: true }));
});

// Functies voor login en registratie
function sendRegisterResponse(res, existingUser) {
  if (existingUser) {
    res.send({ existingUser: true });
  } else {
    res.send({ existingUser: false });
  }
}

function sendLoginResponse(res, email, loggedIn) {
  if (loggedIn) {
    const token = generateAccessToken(email);
    res
      .status(200)
      .cookie("token", token, {
        secure: true,
        httpOnly: true,
        sameSite: "none",
      })
      .send({ loggedIn: true });
  } else {
    res.send({ loggedIn: false });
  }
}

function generateAccessToken(email) {
  return jwt.sign({ email: email }, process.env.TOKEN_SECRET, {
    expiresIn: 1800,
  });
}

function authenticateToken(req, res, next) {
  const token = req.cookies.token;
  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

function sendLogoutResponse(res) {
  res.send({ loggedOut: true });
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// Async functies voor login en register
async function insertUser(email, password) {
  try {
    await client.connect();
    const database = client.db("Project");
    const collection = database.collection("user");
    const existingUser = await collection.findOne({ email: email });

    if (existingUser) {
      return true;
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await collection.insertOne({ email: email, password: hashedPassword });

    console.log("succesfully inserted user");
    return false;
  } finally {
    await client.close();
  }
}

async function loginUser(email, password) {
  try {
    await client.connect();
    const database = client.db("Project");
    const collection = database.collection("user");
    const existingUser = await collection.findOne({ email: email });

    if (!existingUser) {
      return false;
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (passwordMatch) {
      return true;
    } else {
      return false;
    }
  } finally {
    await client.close();
  }
}

// Functie om data te fetchen van weather
async function fetchWeatherData() {
  try {
    await client.connect();
    const database = client.db("Project");
    const collection = database.collection("weather");
    const data = await collection.find().toArray();
    return data;
  } finally {
    await client.close();
  }
}

// Functie om data te fetchen van schedule
async function fetchScheduleData() {
  try {
    await client.connect();
    const database = client.db("Project");
    const collection = database.collection("schedule");
    const data = await collection.find().toArray();
    return data;
  } finally {
    await client.close();
  }
}

// Functie om data te fetchen van Parttime job
async function fetchParttimeJobData() {
  try {
    await client.connect();
    const database = client.db("Project");
    const collection = database.collection("parttime-job");
    const data = await collection.find().toArray();
    return data;
  } finally {
    await client.close();
  }
}

// Functie om een bericht toe te voegen in de database
async function sendMessage(message) {
  try {
    // connect the client to the server
    await client.connect();
    //we connect with the Project database
    const database = client.db("Project");
    //we connect with the data collection
    const collection = database.collection("message");
    //the message is inserted
    await collection.insertOne({ message: message });
    console.log("succesfully inserted message");
  } finally {
    // ensures that the client will close when you finish/error
    await client.close();
  }
}
