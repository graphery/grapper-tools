import path from 'node:path';

export default {
  'root' : process.cwd(),
  'test' : path.resolve(process.cwd(), './test/cases/'),
  'port' : 8080
};