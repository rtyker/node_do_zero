// db.js
import 'dotenv/config';
import postgres from 'postgres';
//const postgres = require('postgres');
//require('dotenv').config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`;

export const sql = postgres(URL, { ssl: 'require' });

async function getPgVersion() {
  const result = await sql`select version()`;
  console.log(result);
}

//getPgVersion();