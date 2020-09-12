// npm init -y HelloExpress // Creates package.json 
// npm install express/ npm i express // installs express to the node_modules folder and package.json dependencies 

const express = require("express");
const app = express();

// Start the express application server and listen on port 8000
const server = app.listen(8000, () =>
  console.log(`Server is locked and loaded on port ${server.address().port}!`)
);

// Routing in Express below

// req is short for request
// res is short for response
app.get("/api", (req, res) => {
  res.send("Our express api server is now sending this over to the browser");
});


