import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 50,          
  duration: '10s',  
};

export default function () {
  const url = 'http://localhost:3000/api/candidates';
  const payload = JSON.stringify({
    firstName: 'Load',
    lastName: 'Tester',
    email: `test-${Math.random()}@example.com`,
  });
  const params = { headers: { 'Content-Type': 'application/json' } };

  const res = http.post(url, payload, params);
  check(res, { 'is status 201': (r) => r.status === 201 });
  sleep(0.1);
}
