import { readFile } from "node:fs";
import http from "node:http";
import path from "node:path";

const servefile = (res, fileName) => {
  const filePath = path.join(import.meta.dirname, fileName);
  readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "content-type": "text/html" }).end("error");
    } else {
      res.writeHead(200, { "content-type": "text/html" }).end(data);
    }
  });
};

const server = http.createServer((req, res) => {
  switch (req.url) {
    case "/":
      servefile(res, "index.html");
      break;
    case "/about":
      servefile(res, "about.html");
      break;
    case "/contact":
      servefile(res, "contact-me.html");
      break;
    default:
      servefile(res, "404.html");
      break;
  }
});

const hostname = "127.0.0.1";
const port = 3001;

server.listen(port, hostname, () => {
  console.log(`server running successfully http://${hostname}:${port}`);
});
