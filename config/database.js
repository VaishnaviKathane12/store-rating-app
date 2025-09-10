const { Sequelize } = require('sequelize');

// PostgreSQL database configuration
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres', // Your PostgreSQL username
  password: 'vaishnavi', // Add your PostgreSQL password here
  database: 'store_rating_db', // Change to your database name
  logging: false, // Set to console.log to see SQL queries
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Test the connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL connection established successfully.');
  } catch (error) {
    console.error('Unable to connect to PostgreSQL database:', error);
  }
}

module.exports = { sequelize, testConnection };