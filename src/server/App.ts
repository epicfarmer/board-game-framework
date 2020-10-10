/*
// The game server that hosts the static files,
// handles lobbies/client input etc
*/

// The require syntax works only with CommonJS modules,
// and Node.js will only run it correctly if the package.json file
// has a "type": "commonjs" key-value.
// See the NodeJS docs for an explanation:
// https://nodejs.org/api/packages.html

const express = require("express");
const http = require("http");
const webSocket = require("ws");

const gameport = process.env.PORT || 4004;
const __dirname__ = process.cwd();
const app = express();
const server = http.createServer(app);

app.get("/", (req, res) => {
  console.log("trying to load %s", __dirname__ + "/index.html");
  res.sendfile("/index.html", { root: __dirname__ });
});

// Serving static files
app.get("/*", function (req, res, next) {
  //This is the current file they have requested
  let file = req.params[0];
  //For debugging, we can track what files are requested.
  // console.log("\t :: Express :: file requested : " + file);
  //Send the requesting client the file.
  res.sendfile(__dirname__ + "/" + file);
});

const wss = new webSocket.Server({ port: 4005 });
wss.on("connection", (ws) => {
  ws.on("message", (message: string) => {
    ws.send(message); // Echo server
    console.log("Message received!");
    console.log(message);
  });

  console.log("Connection established!");
  ws.send("Connection established!");
});

app.listen(gameport, () => {
  console.log(`Example app listening at http://localhost:${gameport}`);
});
