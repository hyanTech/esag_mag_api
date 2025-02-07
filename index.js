require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./Routes/routes");

const app = express();
const PORT = process.env.PORT || 5000;

// Configuration de CORS
app.use(cors());

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Middleware pour parser les données URL-encoded (formulaires)
app.use(express.urlencoded({ extended: true }));


// d'endpoint
app.use("/api", routes);

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
