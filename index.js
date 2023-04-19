const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");

const pool = new Pool({
  user: "your_username",
  host: "your_host",
  database: "your_database",
  password: "your_password",
  port: 5432,
});

const app = express();

// set up middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// define the routes
app.get("/users", async (req, res) => {
  try {
    const client = await pool.connect();
    const query = "SELECT * FROM users";
    const result = await client.query(query);
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  try {
    const client = await pool.connect();
    const query = "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *";
    const values = [name, email];
    const result = await client.query(query, values);
    res.json(result.rows[0]);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;
  try {
    const client = await pool.connect();
    const query = "UPDATE users SET email = $1 WHERE id = $2 RETURNING *";
    const values = [email, id];
    const result = await client.query(query, values);
    res.json(result.rows[0]);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const client = await pool.connect();
    const query = "DELETE FROM users WHERE id = $1 RETURNING *";
    const values = [id];
    const result = await client.query(query, values);
    res.json(result.rows[0]);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

// start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
