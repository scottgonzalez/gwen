var form = require( "express-form" );
var field = form.field;
var sendMail = require( "./mailer" ).sendMail;

module.exports = function( app ) {

app.get( "/", function( req, res ) {
	res.render( "index", {
		error: req.flash( "error" )
	});
});

app.post( "/subscribe", form(
	field( "repo" )
		.trim()
		.required()
		.is( /^[\w-]+\/[\w-]+$/ )
		.toLower(),

	field( "email" )
		.trim()
		.required()
		.isEmail()
		.toLower()
), function( req, res ) {
	var db = app.get( "db" );

	if ( !req.form.isValid ) {
		res.redirect( "/" );
		return;
	}

	db.put( req.form.repo, req.form.email, function( error ) {
		if ( error ) {
			res.send( "oh shit, it broke..." );
			return;
		}

		res.send( "yay" );
	});
});

app.post( "/wiki-update", function( req, res ) {
	if ( !req.body.payload ) {
		res.send( "nope" );
		return;
	}

	// TODO: handle invalid JSON
	// TODO: handle raw JSON
	var db = app.get( "db" );
	var payload = JSON.parse( req.body.payload );
	var repo = payload.repository.full_name;

	db.get( repo, function( error, email ) {
		if ( error ) {
			res.send( "oh shit, it broke..." );
			return;
		}

		if ( !email ) {
			res.send( "nope" );
			return;
		}

		payload.pages.forEach(function( page ) {
			sendMail({
				to: email,
				subject: page.page_name + " " + page.action,
				body: page.sha
			}, function() {
				// TODO: handle error
			});
		});

		res.send( "thanks" );
	});
});

};
