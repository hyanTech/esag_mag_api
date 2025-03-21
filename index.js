require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./Routes/routes");
const session = require("express-session");
const { sequelize } = require("./Models");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const http = require("http");
const socketModule = require("./config/socket");

const app = express();
const PORT = process.env.PORT || 5000;

// Configuration de CORS
const corsOptions = {
  origin: ["http://localhost:3000"], // ou l'URL de votre front-end
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuration du store des sessions avec SequelizeStore
const sessionStore = new SequelizeStore({
  db: sequelize,
});
sessionStore.sync();

app.use(
  session({
    secret: process.env.SESSION_SECREY,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    },
  })
);

app.use("/api", routes);

// Création du serveur HTTP à partir de l'app Express
const server = http.createServer(app);

// Initialisation de Socket.IO via notre module dédié
socketModule.init(server, {
  cors: {
    origin: ["*"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});


// Démarrage du serveur
server.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log("Connexion à la base de données réussie.");
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
  } catch (error) {
    console.error("Impossible de se connecter à la base de données : ", error);
  }
});

