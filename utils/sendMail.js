const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const { OAuth2 } = google.auth;
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground';

const {
	MAILING_SERVICE_CLIENT_ID,
	MAILING_SERVICE_CLIENT_SECRET,
	MAILING_SERVICE_REFRESH_TOKEN,
	SENDER_EMAIL_FROM,
} = process.env;

const oauth2Client = new OAuth2(
	MAILING_SERVICE_CLIENT_ID,
	MAILING_SERVICE_CLIENT_SECRET,
	MAILING_SERVICE_REFRESH_TOKEN,
	OAUTH_PLAYGROUND
);

const sendEmail = (to, url, message) => {
	oauth2Client.setCredentials({
		refresh_token: MAILING_SERVICE_REFRESH_TOKEN,
	});

	const accessToken = oauth2Client.getAccessToken();
	const smtpTransport = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			type: 'OAuth2',
			user: SENDER_EMAIL_FROM,
			clientId: MAILING_SERVICE_CLIENT_ID,
			clientSecret: MAILING_SERVICE_CLIENT_SECRET,
			refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
			accessToken,
		},
	});

	const mailOptions = {
		from: SENDER_EMAIL_FROM,
		to: to,
		subject: 'TCAR Application',
		html: `
            <div style="max-width: 800px; margin:auto; border: 10px solid #ddd; border-radius: 10px; padding: 40px 30px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase;color: #003e95;">Please use following the instructions below !!</h2>
            <p">Hello 😄🤣 Please click the button !!
            </p>
            <div style="display: flex; justify-content: space-evenly; margin-top: 10px;">
            <a href=${url} style="background: #a71547; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; border-radius: 10px; display: inline-block;">${message}</a>
			</div>
            <p>You can also click the link below instead of clicking the button</p>
        
            <div>${url}</div>
            </div>
        `,
	};

	smtpTransport.sendMail(mailOptions, (err, information) => {
		if (err) return err;
		return information;
	});
};

module.exports = sendEmail;
