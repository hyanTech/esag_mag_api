const path = require('path');
const fs = require('fs');

const sendFile = async (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '../uploads', filename);

    // Vérifier si le fichier existe avant de l'envoyer
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: 'Image non trouvée' });
    }

    // Envoyer le fichier en précisant le root
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error("Erreur lors de l'envoi du fichier :", err);
            res.status(err.status || 500).json({ message: "Erreur lors de l'envoi du fichier" });
        }
    });
};

module.exports = { sendFile };
