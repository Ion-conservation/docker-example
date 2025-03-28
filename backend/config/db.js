const mysql = require('mysql2/promise');
const logger = require('./logger');
require('dotenv').config();

// 从环境变量中读取数据库连接信息
const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
}

const pool = mysql.createPool(dbConfig);

pool.getConnection()
  .then((connection) => {
    logger.info('Database connected successfully');
    connection.release();
    logger.info('Connection released');
  })
  .catch((err) => logger.error('Database connection failed:', err))
  .finally(() => {
    logger.info('Promise completed');
  });

process.on('exit', (code) => {
  logger.info(`Process exiting with code ${code}`);
});

module.exports = pool;