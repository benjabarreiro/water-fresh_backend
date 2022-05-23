const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});

const accessToken = oauth2Client.getAccessToken();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
    accessToken,
    tls: {
      rejectUnauthorized: false,
    },
  },
});

const sendEmail = (req, res) => {
  var { fullName, email, phone } = req.body;

  var content = "";
  content += `<h3>Informacion ingresada: </h3>`;
  content += `<ul>
			<li>${fullName}</li>
			<li>${email}</li>
			<li>${phone}</li>
		  </ul>`;

  var mail = {
    from: "benjanodemailer@gmail.com",
    to: "barreirobenjamin@gmail.com",
    subject: "Distribuidores - Water Fresh",
    html: content,
  };

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      console.log('No se envió')
      return res.status(500).send({message: 'Mail no se pudo enviar', err})
    }
    return res.status(200).send('Mail enviado')
  });
};

module.exports = sendEmail;
