const cluster = require("cluster");
const os = require('os')
const http = require('http');
const { randomInt } = require("crypto");

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`)

  for (let i = 0; i < os.availableParallelism(); i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`${process.pid} exit`)
    cluster.fork()
  })
} else {
  http.createServer((req, res) => {
    res.writeHead(200);
    if (randomInt(100) === 90) {
      throw new Error('erro aleatorio')
    }
    res.end('hello world\n');

  }).listen(8000)

  console.log(process.pid)
}

// http.createServer((req, res) => {
//       res.writeHead(200);
//       setTimeout(() => {
//         res.end('Processo ' +process.pid);
//       }, randomInt(5000))
//     }).listen(8000)