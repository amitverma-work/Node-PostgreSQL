const db = require("../utils/db");

exports.getUser = async (req, res) => {
  try {
    const client = await db.connect();
    const query = "SELECT * FROM users";
    const result = await client.query(query);
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

exports.createUser = async (req, res) => {
  const { name, email } = req.body;
  try {
    const client = await db.connect();
    const query = "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *";
    const values = [name, email];
    const result = await client.query(query, values);
    res.json(result.rows[0]);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const client = await db.connect();
    const query = "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *";
    const values = [name, email, id];
    const result = await client.query(query, values);
    res.json(result.rows[0]);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await db.connect();
    const query = "DELETE FROM users WHERE id = $1 RETURNING *";
    const values = [id];
    const result = await client.query(query, values);
    res.json(result.rows[0]);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};
