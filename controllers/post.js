const db = require("../utils/db");

exports.getPost = async (req, res) => {
  try {
    const client = await db.connect();
    const query =
      "SELECT * FROM posts INNER JOIN users ON users.id = posts.user_id";
    const result = await client.query(query);
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

exports.createPost = async (req, res) => {
  const { user_id } = req.params;
  const { title, content, image_url } = req.body;
  try {
    const client = await db.connect();
    const query = "INSERT INTO posts (user_id, title, content, image_url) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [user_id, title, content, image_url];
    const result = await client.query(query, values);
    res.json(result.rows[0]);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};
