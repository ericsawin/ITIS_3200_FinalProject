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
const port = 3000;

// used in expressJs servers to parse JSON and put it in the request body as a JS object
app.use(express.json());
// decodes form submission html
app.use(express.urlencoded({ extended: true }));
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
// passwords are stored as plaintext to show how data exfil can be exacerbated without proper data obfuscation
db.serialize(() => {
  // delete any old artifacts
  db.run("DROP TABLE IF EXISTS users");
  console.log("Database deleted.");

  // create fresh table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `);
  console.log("users table created.");

  db.run(`
    INSERT INTO users (username, password)
    VALUES
      ('admin', 'Admin123!'),
      ('alice', 'Password123!'),
      ('bob', 'MySecretPassword321')
  `);
  console.log("Seed data injected.");
});

// ==============================
// Routing and endpoints
// ==============================

// Registration (Safe from SQLi)
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "register.html"));
});

app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required." });
  }

  try {
    db.run(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, password],
      function (err) {
        if (err) {
          return res
            .status(400)
            .json({ message: "User already exists OR invalid credentials." });
        }

        res.json({
          message: "Registration successful.",
          userId: this.lastID,
        });
      },
    );
  } catch {
    res.status(500).json({ message: "Something went wrong." });
  }
});

// Login (Safe from SQLi)
app.get("/safe-login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "safe-login.html"));
});

app.post("/api/login-safe", async (req, res) => {
  const { username, password } = req.body;

  db.get("SELECT * FROM users WHERE USERNAME = ?", [username], (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Something went wrong." });
    }

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    res.json({
      message: "Login successful.",
      user: {
        id: user.id,
        username: user.username,
      },
    });
  });
});

// Login (Vulnerable to SQLi)
app.get("/dangerous-login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dangerous-login.html"));
});

app.post("/api/login-dangerous", async (req, res) => {
  const { username, password } = req.body;

  const sql = `
SELECT id, username, password FROM users
WHERE username = '${username}'
AND password = '${password}'
`;

  console.log("sql:");
  console.log(sql);

  db.get(sql, (err, user) => {
    if (err) {
      return res.status(500).json({
        message: "Something went wrong.",
        error: err.message,
      });
    }

    if (!user) {
      return res.status(401).json({
        message: "Invalid username or password.",
      });
    }

    res.json({
      message: "Unsafe login successful.",
      user: {
        id: user.id,
        username: user.username,
      },
    });
  });
});

// ==============================
// Start your engines
// ==============================
app.listen(port, () => {
  console.log(`Server running: http://localhost:${port}`);
});
