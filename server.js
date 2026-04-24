// ==============================
// Dependencies
// ==============================

// expressJs server
const express = require("express");
// sqlite database
const sqlite3 = require("sqlite3").verbose();
// path (allows us to use our file structure; our html pages and css sheets will be in the '/public' dir)
const path = require("path");

// ==============================
// Server Setup
// ==============================

// create our express server and assign it to `app`
const app = express();
// use port 3000 for localhost to access when running locally
const port = 3000();

// used in expressJs servers to parse JSON and put it in the request body as a JS object
app.use(express.json());
// serve our `/public' directory as static assets`
app.use(express.static(path.join(__dirname, "public")));

// ==============================
// Database Connection
// ==============================

// assign our demonstration database as a new instance called `db`
const db = new sqlite3.Database("./demo.db");

// ==============================
// DB initialization and seeding
// ==============================

// create our users table
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `);
});

// ==============================
// Routing and endpoints
// ==============================

// Registration
app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "register.html"));
  }),
);

app.post("/api/register", async (req, res) => {});

// Login (Safe from SQLi)
app.get("/safe-login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "safe-login.html"));
});

app.post("/api/login-safe", async (req, res) => {});

// Login (Vulnerable to SQLi)
app.get("/dangerous-login", (req, res) => {
  res.sendFile(path.join(__dirname), "public", "dangerous-login.html"));
})

app.post("/api/login-dangerous", async (req, res) => {});

// ==============================
// Start your engines
// ==============================
app.listen(port, () => {
  console.log(`Server running: http://localhost:${port}`);
});
