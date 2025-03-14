const { fetch } = require("undici");

async function sendSms(phoneNumber, message, from = "Doctagan", type = 0, dlr = "1") {
  try {
    const response = await fetch("https://edok-api.kingsmspro.com/api/v1/sms/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "APIKEY": process.env.KINGSMS_API_KEY,
        "CLIENTID": process.env.KINGSMS_CLIENT_ID, 
      },
      body: JSON.stringify({ from, to: phoneNumber, type, message, dlr }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Erreur lors de l'envoi du SMS:", error);
    throw error;
  }
}

module.exports = { sendSms };
