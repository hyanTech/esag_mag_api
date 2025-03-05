

import fetch from "node-fetch";

const API_URL = "https://edok-api.kingsmspro.com/api/v1/sms/send";
const API_KEY = process.env.KINGSMS_API_KEY ;
const CLIENT_ID = process.env.KINGSMS_CLIENT_ID ;

/**
 * Envoie un code SMS à un numéro donné
 * @param {string} phoneNumber - Numéro de téléphone au format international sans "+" ni "00" (ex: 22890443679)
 * @param {string} message - Contenu du message (ex: "Votre code est 1234")
 * @param {string} [from="YourApp"] - Nom de l'expéditeur
 * @param {string} [type="text"] - Type de message ("text" ou "flash")
 * @param {number} [dlr=1] - 1 pour recevoir un accusé de réception, 0 sinon
 * @returns {Promise<Object>} - Réponse de l'API
 */
export async function sendSms(phoneNumber, message, from = "Doctagan", type = "text", dlr = 1) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "APIKEY": API_KEY,
        "CLIENTID": CLIENT_ID,
      },
      body: JSON.stringify({
        from,
        to: phoneNumber,
        type,
        message,
        dlr,
      }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Erreur lors de l'envoi du SMS:", error);
    throw error;
  }
}
