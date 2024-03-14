import cluster from "cluster";
import os from 'os'
import http from 'http'
import { randomInt } from "crypto";

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`)

  for (let i = 0; i < 10; i++) {
    cluster.fork()
  }

  console.log(os.availableParallelism())
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`)
  })
} else {
  http.createServer((req, res) => {
    res.writeHead(200);
    setTimeout(() => {

      res.end('hello world\n');
    }, 1000)
  }).listen(8000)
  console.log(`Worket ${process.pid} started`)
}

// http.createServer((req, res) => {
//       res.writeHead(200);
//       setTimeout(() => {
//         res.end('Processo ' +process.pid);
//       }, randomInt(5000))
//     }).listen(8000)