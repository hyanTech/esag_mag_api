const jwt = require('jsonwebtoken');
const { Admin } = require('../Models');

const secretKey = process.env.JWT_SECRET || 'votre_cle_secrete';

async function verifyAdminToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Token manquant' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Token mal formaté' });
  }

  try {
    const decoded = jwt.verify(token, secretKey); // Vérification du token de manière synchrone
    const user = await Admin.findByPk(decoded.id);

    if (!user) {
      return res.status(403).json({ error: "Accès interdit : vous n'êtes pas administrateur" });
    }

    req.user = decoded; // Stocker les informations de l'utilisateur dans la requête
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalide ou expiré' });
  }
}

module.exports = verifyAdminToken;
