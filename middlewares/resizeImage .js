// middlewares/resizeImage.js
const sharp = require('sharp');
sharp.cache(false);
const path = require('path');
const { deleteFile } = require('../functions/deleteFile');

const resizeImage = (width, height) => {
    return async (req, res, next) => {
        try {
            // Vérifier si un fichier a été uploadé
            if (!req.file) {
                return next(); // Passer au middleware suivant si aucun fichier n'est uploadé
            }

            // Chemin d'entrée et de sortie de l'image
            const inputPath = req.file.path;
            const outputFileName = `resized-${Date.now()}.webp`; // Nom du fichier en WebP
            const outputPath = path.join(__dirname, '../uploads', outputFileName);

            // Redimensionner et convertir l'image en WebP
            await sharp(inputPath)
                .resize(width, height, {
                    fit: 'contain', // Conserver le ratio
                    background: { r: 0, g: 0, b: 0, alpha: 0 }
                })
                .toFormat('webp', { 
                    quality: 80, // Qualité de l'image (0 à 100)
                    lossless: true // Compression avec perte (pour réduire la taille)
                })
                .toFile(outputPath); // Sauvegarder l'image redimensionnée et convertie


                const originalFileName = path.basename(inputPath); // Extraire le nom du fichier original
                deleteFile(originalFileName);
                

            // Mettre à jour le chemin de l'image dans req.file
            req.file.path = outputPath;
            req.file.filename = outputFileName; // Mettre à jour le nom du fichier

            next(); // Passer au middleware suivant
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors du redimensionnement ou de la conversion de l'image." });
        }
    };
};

module.exports = resizeImage;