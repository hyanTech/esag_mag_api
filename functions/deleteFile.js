// utils/fileUtils.js
const fs = require('fs');
const path = require('path');

/**
 * Supprime un fichier du dossier uploads.
 * @param {string} fileName - Le nom du fichier à supprimer.
 */
const deleteFile = (fileName) => {
    const filePath = path.join(__dirname, '../uploads', fileName); // Chemin complet du fichier

    // Vérifier si le fichier existe avant de le supprimer
    fs.access(filePath, fs.constants.F_OK | fs.constants.W_OK, (err) => {
        if (err) {
            console.warn(`Le fichier ${fileName} n'existe pas ou n'est pas accessible.`);
            return;
        }

        // Supprimer le fichier après vérification
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(`Erreur lors de la suppression du fichier ${fileName} :`, err);
            } else {
                console.log(`Fichier ${fileName} supprimé avec succès.`);
            }
        });
    });
};

module.exports = { deleteFile };