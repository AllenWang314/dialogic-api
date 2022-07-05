//import libraries needed for the webserver to work!
const http = require("http");
const express = require("express"); // backend framework for our node server.
const path = require("path"); // provide utilities for working with file and directory paths

const api = require("./api");

// create a new express server
const app = express();

// allow us to process POST requests
app.use(express.json());

// connect user-defined routes
app.use("/api", api);

// load the compiled react files, which will serve /index.html and /bundle.js
const reactPath = path.resolve(__dirname, "..", "client", "dist");
app.use(express.static(reactPath));

// for all other routes, render index.html and let react router handle it
app.get("*", (_req, res) => {
  res.sendFile(path.join(reactPath, "index.html"));
});

// hardcode port to 3000 for now
const port = 3000;
const server = http.Server(app);

server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});