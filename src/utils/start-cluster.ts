import { Logger } from '@nestjs/common';
import cluster from 'node:cluster';
import os from 'os';

export function startCluster(callback: any) {
  const runPrimaryProcess = () => {
    const processCount = os.availableParallelism();

    Logger.log(`Server start in process ${process.pid}`);

    for (let i = 0; i <= 4; i++) {
      cluster.fork();
    }

    cluster.on('exit', () => {
      cluster.fork();
    });
  };
  const runWorkerProcess = async () => {
    callback();
  };

  cluster.isPrimary ? runPrimaryProcess() : runWorkerProcess();
}
