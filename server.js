// Dependencies required

// expressJs server
const express = require("express");
// sqlite database
const sqlite3 = require("sqlite3").verbose();
// path (allows us to use our file structure; our html pages and css sheets will be in the '/public' dir)
const path = require("path");

// create our express server and assign it to `app`
const app = express();
// use port 3000 for localhost to access when running locally
const port = 3000();

// used in expressJs servers to parse JSON and put it in the request body as a JS object
app.use(express.json());
// serve our `/public' directory as static assets`
app.use(express.static(path.join(__dirname, "public")));

// assign our demonstration database as a new instance called `db`
const db = new sqlite3.Database("./demo.db");
