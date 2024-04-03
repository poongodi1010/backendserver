/* eslint-disable no-undef */
import express from "express";
import cors from "cors";
import fetch from "node-fetch";
//import { keyword } from "./data";
//import data from "./data";
//const data = require("./data");

const data = [
  "confidence",
  "courage",
  "dreams",
  "happiness",
  "inspiration",
  "kindness",
  "leadership",
  "love",
  "success",
];

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
const corsOptions = {
  // origin: "http://localhost:3000",
  // origin: "https://gratitude-production-f30d.up.railway.app",
  origin: "https://backendserver-production-af63.up.railway.app",
};

const requestEndpoint = " https://zenquotes.io/api/today";

// This function runs if the http://localhost:5000/getData endpoint
// is requested with a GET request
app.get("/", cors(corsOptions), async (req, res) => {
  const fetchOptions = {
    method: "GET",
  };
  const response = await fetch(requestEndpoint, fetchOptions);
  const jsonResponse = await response.json();
  res.json(jsonResponse);
});

console.log("data in server", data);
{
  data.map((word) => {
    let requestEndpointWithKeyword = `https://zenquotes.io/api/quotes/keyword=${word}`;
    app.get(`/${word}`, cors(corsOptions), async (req, res) => {
      const fetchOptions = {
        method: "GET",
      };
      console.log("word", word);
      console.log("server url", requestEndpointWithKeyword);
      const response = await fetch(requestEndpointWithKeyword, fetchOptions);
      const jsonResponse = await response.json();
      res.json(jsonResponse);
    });
  });
}

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
