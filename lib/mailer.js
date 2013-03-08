var mailer = require( "nodemailer" );
var from = process.env.MAIL_FROM;
var transport = mailer.createTransport( "SMTP", {
	service: "Gmail",
	auth: {
		user: process.env.GMAIL_USER,
		pass: process.env.GMAIL_PASS
	}
});

function sendMail( settings, callback ) {
	transport.sendMail({
		from: from,
		to: settings.to,
		subject: settings.subject,
		text: settings.body
	}, callback );
}

module.exports = {
	sendMail: sendMail
};
