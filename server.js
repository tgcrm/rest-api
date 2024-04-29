const http = require("http");

const app = require("./app");
const port = process.env.PORT || 5000;
const server = http.createServer(app, function (request, response) {
  response.writeHead(200, {
    "Content-Type": "text/plain",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
  });
});
server.listen(port, () => {
  console.log("this app is running on " + port);
});
