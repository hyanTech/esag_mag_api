const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

async function generateTicketPDF({ ticketCode, qrDataUrl, eventName, ticketType, lieu, date }) {
  return new Promise((resolve, reject) => {
    // Création du document en format A5 avec des marges adaptées
    const doc = new PDFDocument({
      size: 'A5',
      margins: { top: 50, bottom: 50, left: 50, right: 50 }
    });

    // Nom de fichier et chemin
    const filename = `ticket_${ticketCode}.pdf`;
    const pdfPath = path.join(__dirname, '../doc', filename);
    const stream = fs.createWriteStream(pdfPath);
    doc.pipe(stream);

    // Formatter la date en français (ex: Lundi 30 janvier 2025)
    const formattedDate = new Date(date).toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    const formattedDateCapitalized = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

    // En-tête avec fond coloré et titre de l'événement
    doc
      .rect(0, 0, doc.page.width, 60)
      .fill('#4A90E2');
    doc
      .fillColor('#FFFFFF')
      .fontSize(24)
      .text(eventName, 20, 15, { align: 'center' });
    doc.moveDown(2);
    doc.fillColor('#000000');

    // Section principale du ticket : type, code, lieu et date
    doc
      .fontSize(16)
      .fillColor('#333333')
      .text('Votre Ticket', { align: 'center' });
    doc.moveDown(0.5);
    doc
      .fontSize(12)
      .fillColor('#000000')
      .text(`Type de ticket : ${ticketType}`, { align: 'center' });
    doc.text(`Code : ${ticketCode}`, { align: 'center' });
    doc.moveDown(0.5);

    // Affichage du lieu en gras et souligné
    doc
      .font('Helvetica-Bold')
      .text(`Lieu : ${lieu}`, { align: 'center', underline: true });
    doc.moveDown(0.5);

    // Affichage de la date formatée en police normale
    doc
      .font('Helvetica')
      .text(`Date : ${formattedDateCapitalized}`, { align: 'center' });

    // Ajout du QR code dans une zone encadrée
    doc.moveDown();
    const base64Data = qrDataUrl.split(',')[1];
    const imgBuffer = Buffer.from(base64Data, 'base64');
    const qrSize = 150;
    // Calcul pour centrer le QR code
    const qrX = (doc.page.width - qrSize) / 2;
    const qrY = doc.y;
    // Encadrement du QR code
    doc
      .lineWidth(2)
      .strokeColor('#4A90E2')
      .rect(qrX - 10, qrY - 10, qrSize + 20, qrSize + 20)
      .stroke();
    doc.image(imgBuffer, qrX, qrY, { fit: [qrSize, qrSize] });

    // Pied de page : texte positionné tout en bas
    const footerY = doc.page.height - doc.page.margins.bottom - 20;
    doc.fontSize(8)
       .fillColor('#555555')
       .text(
         'Merci de conserver ce ticket pour accéder à l\'événement.',
         50,
         footerY,
         { align: 'center', width: doc.page.width - 100 }
       );

    doc.end();

    // Retourne à la fois le chemin et le nom du fichier
    stream.on('finish', () => resolve({ pdfPath, filename }));
    stream.on('error', (err) => reject(err));
  });
}

module.exports = { generateTicketPDF };
