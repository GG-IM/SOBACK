import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
//dotenv.config();

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456789',
  database: 'vitalcare',
});

// console.log('DB_USER:', process.env.DB_USER);
// console.log('DB_PASS:', process.env.DB_PASS);
// console.log('DB_HOST:', process.env.DB_HOST);
// console.log('DB_NAME:', process.env.DB_NAME);

export default pool; 