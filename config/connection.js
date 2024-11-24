const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.DATABASE_URL) {
  // For Render: Use DATABASE_URL if available
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true, // Enforce SSL
        rejectUnauthorized: false // Allow self-signed certificates
      }
    }
  });
} else {
  // For local development: Use DB_NAME, DB_USER, DB_PASSWORD
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'postgres',
      port: 5432,
    }
  );
}

module.exports = sequelize;