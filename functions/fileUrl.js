const BASE_URL = (req) => `${req.protocol}://${req.get('host')}/api/sendFile/`;

module.exports = { BASE_URL };
