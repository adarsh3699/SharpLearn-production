const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const Share = require("./models/share");
require("dotenv").config();

const app = express();

const allowlist = [
  "http://localhost:3000/",
  "http://localhost:3001/",
  "https://www.sharplearn.tech/",
];

app.use(cors(allowlist));
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/set_share", async (req, res) => {
  try {
    const userId = req.query.id;
    if (!userId)
      return res
        .status(400)
        .json({ statusCode: 400, msg: "userId is required" });
    const queryResp = await Share.create({
      userId: userId,
      referralCount: 0,
      // referralDetails: 'referralDetails',
      createdOn: new Date(Date.now()),
      updatedOn: new Date(Date.now()),
    });

    res.status(200);
    res.send({ statusCode: 200, msg: "Inserted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send({ statusCode: 500, msg: error.message });
  }
});

app.get("/referral", async (req, res) => {
  try {
    const userId = req.query.id;
    if (!userId)
      return res
        .status(400)
        .json({ statusCode: 400, msg: "userId is required" });

    const queryResp = await Share.updateOne(
      { userId: userId },
      { $inc: { referralCount: 1 }, $push: { referralDetails: 124 } }
    );
    res.status(200);
    res.send({ statusCode: 200, msg: "Inserted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send({ statusCode: 500, msg: error.message });
  }
});

const PORT = process.env.PORT || 4000;

app.get("/", function (req, res) {
  res.send("Hello World");
  console.log(process.env.MONGO_DB_URI);
});
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_DB_URI || "mongodb://localhost:27017/")
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server is running at port ${PORT}`);
    })
  )
  .catch((err) => {
    console.log(err);
  });
