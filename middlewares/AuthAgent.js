// middlewares/authMiddleware.js
module.exports = (req, res, next) => {
    if (!req.session.agentId) {
      return res.status(401).json({ message: 'Accès non autorisé' });
    }
    next();
  };
  