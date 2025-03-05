// imageGenerator.js
const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');


async function generateUniqueProfileImage() {
  const width = 200; // largeur de l'image
  const height = 200; // hauteur de l'image
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Remplir le fond avec une couleur aléatoire
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  ctx.fillStyle = randomColor;
  ctx.fillRect(0, 0, width, height);

  
  for (let i = 0; i < 10; i++) {
    ctx.beginPath();
    const x = Math.random() * width;
    const y = Math.random() * height;
    const radius = Math.random() * 50;
    ctx.arc(x, y, radius, 0, Math.PI * 2, true);
    ctx.fillStyle = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)}, 0.5)`;
    ctx.fill();
  }

  // Générer un nom de fichier unique
  const filename = `${uuidv4()}.png`;
  const uploadsDir = path.join(__dirname, '../uploads');

  // S'assurer que le dossier uploads existe
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
  }

  // Chemin complet pour enregistrer l'image
  const filePath = path.join(uploadsDir, filename);

  // Convertir le canvas en buffer PNG et sauvegarder le fichier
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(filePath, buffer);

  return filename;
}

module.exports = { generateUniqueProfileImage };
