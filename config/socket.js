// socket.js
let io;

module.exports = {
  init: function (server, options) {
    io = require("socket.io")(server, options);

    // Exemple d'écoute globale de la connexion
    io.on("connection", (socket) => {
      console.log("Un client est connecté :", socket.id);
      socket.on("disconnect", () => {
        console.log("Client déconnecté :", socket.id);
      });
    });

    return io;
  },
  getIO: function () {
    if (!io) {
      throw new Error("Socket.IO n'est pas initialisé !");
    }
    return io;
  },
};
