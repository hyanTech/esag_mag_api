module.exports = {
    isAgentAuthenticated: function (req, res, next) {
        if (req.session && req.session.agentId) {
            return next();
        }
        return res.status(401).json({ message: "Non autorisé. Veuillez vous connecter." });
    }
};
