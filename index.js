require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./Routes/routes");
const session = require("express-session");
const { sequelize } = require("./Models");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 5000;

// Configuration de CORS
const corsOptions = {
  origin: ["http://localhost:3000", "http://10.10.3.127:3000"],// ou l'URL de ton front-end
  credentials: true, // Permet l'envoi des cookies de session
};

app.use(cors(corsOptions));

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Middleware pour parser les données URL-encoded (formulaires)
app.use(express.urlencoded({ extended: true }));

// Configuration du store des sessions avec SequelizeStore
const sessionStore = new SequelizeStore({
  db: sequelize, // Instance Sequelize configurée avec sequelize-cli
});

// Synchroniser le store pour créer automatiquement la table "Sessions" en BDD
sessionStore.sync();

app.use(
  session({
    secret: process.env.SESSION_SECREY, // Clé secrète pour signer la session
    resave: false, // Empêche la sauvegarde de session si elle n'a pas changé
    saveUninitialized: false, // Ne crée pas de session vide
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // Durée de vie du cookie (1 jour)
      httpOnly: true, // Sécurise contre les attaques XSS
      secure: false, // Mettre true si HTTPS est activé
      sameSite: "lax",
    },
  })
);

// d'endpoint
app.use("/api", routes);

// Lancer le serveur
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log("Connexion à la base de données réussie.");
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
  } catch (error) {
    console.error("Impossible de se connecter à la base de données : ", error);
  }
});