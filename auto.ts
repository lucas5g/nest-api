import { env } from "@/utils/env";
import { exec } from "child_process";

let command = `sshpass -p ${env.PASSWORD} ssh -t root@128.199.12.79 "\
  source ~/.nvm/nvm.sh &&\
  cd projects/nest-api &&\
  git pull &&\
  npm run build
  pm2 restart nest-api
  "`

exec(command, (error, stdout, stderr) => {
  console.log({
    error,
    stdout,
    // stderr
  })
})