import {sql} from './db.js';

await sql `drop table if exists videos`;

const result = await sql `
CREATE TABLE videos (
    id TEXT PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    duration INTEGER
);
`


console.log(result);