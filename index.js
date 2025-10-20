const express = require("express");
const fs = require("fs");
const path = require("path");
const http = require("http");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
app.use(cors());

const port = process.env.PORT || 4000;
const dataPath = path.join(__dirname, "data.json");

app.get("/", (req, res) => {
  res.send("DB");
});

app.get("/read", (req, res) => {
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    try {
      console.log(JSON.parse(data));
      _data = JSON.parse(data);
      res.json(_data);
    } catch (parseErr) {
      console.error("JSON 파싱 오류:", parseErr);
      res.status(500).json({ error: "JSON 형식이 잘못되었습니다." });
    }
  });
});

app.get("/write/:v", (req, res) => {
  const value = req.params.v;
  console.log(value);
  fs.writeFile(dataPath, value, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
});

server.listen(port, () => {
  console.log(`server is listening at localhost:${port}`);
  fetch("http://127.0.0.1:4000/read");
});

let _data;
