import http from 'k6/http'
import { sleep } from 'k6'
import { randomInt } from 'crypto';
export const options = {
  vus: 10,
  iterations: 10,
  duration: '10s',
}

export default function () {

  const url = 'http://localhost:3333/users';


  const payload = JSON.stringify({
    name: new Date().toISOString().slice(14, 23)
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  http.post(url, payload, params);
  // sleep(Math.floor(5))

}