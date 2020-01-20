const accountSID = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = require("twilio")(accountSID, authToken);

const sendSMS = (text, phoneNumber) => {
  client.messages
    .create({
      body:
        "Sent from the Komoto app -- This is the ship that made the Kessel Run in fourteen parsecs?",
      from: twilioPhoneNumber,
      to: "+19093193158"
    })
    .then(message => console.log(message.sid));
};

module.exports = { sendSMS };
