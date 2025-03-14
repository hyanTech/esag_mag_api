// testConnection.js

require('dotenv').config();
const { Sequelize } = require('sequelize');

// Créez une instance Sequelize avec les informations provenant de votre fichier .env
const sequelize = new Sequelize(
  process.env.DB_DATABASE, 
  process.env.DB_USERNAME, 
  process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: process.env.DB_LOGGING === 'true'
  }
);

// Fonction asynchrone pour tester la connexion
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('La connexion à la base de données a été établie avec succès.');
  } catch (error) {
    console.error('Impossible de se connecter à la base de données :', error);
  } finally {
    // Fermer la connexion si nécessaire
    await sequelize.close();
  }
}

testConnection();
