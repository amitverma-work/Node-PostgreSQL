const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const app = express();

// set up middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  res.send("I'm in!!");
});

app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
