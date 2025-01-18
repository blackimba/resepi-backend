import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    host: process.env.PGHOST,
    port: parseInt(process.env.PGPORT || '5432', 10),
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    // Specify the schema to use
    // searchPath: ['public', 'your_schema_name']
  });

pool.on('connect', () => {
    console.log('connected to the PostgreSQL database');
});

export default pool;