import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
//dotenv.config();

const pool = mysql.createPool({

  host: "tiendasmass.mysql.database.azure.com",
  user: 'tilioes',
  port: 3306,
  password: 'Michita0123+',
  database: 'vitalcare',
  ssl: {
    rejectUnauthorized: false,  // Si no necesitas validar estrictamente el certificado
  },
});


// console.log('DB_USER:', process.env.DB_USER);
// console.log('DB_PASS:', process.env.DB_PASS);
// console.log('DB_HOST:', process.env.DB_HOST);
// console.log('DB_NAME:', process.env.DB_NAME);

export default pool; 