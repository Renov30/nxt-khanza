import mysql from 'mysql2/promise';

export const db = mysql.createPool({
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '3306'),
  user: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASSWORD || 'rahasia',
  database: process.env.DATABASE_NAME || 'sik_ori',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
