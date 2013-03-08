var express = require( "express" );
var flash = require( "connect-flash" );
var leveldb = require( "leveldb" );
var port = process.env.PORT;



var app = express();

app.set( "view engine", "hbs" );

app.use( express.logger() );
app.use( express.bodyParser() );
app.use( express.cookieParser( "gwen" ) );
app.use( express.cookieSession( "sid" ) );
app.use( flash() );

require( "./lib/routes" )( app );

startServer();



function startServer() {
	leveldb.open(
		__dirname + "/subscriptions.db",
		{ create_if_missing: true },
	function( error, db ) {
		if ( error ) {
			console.log( "Error opening leveldb." );
			console.log( error.stack );
			process.exit( 1 );
		}

		app.set( "db", db );
		app.listen( port );
		console.log( "Server listening on port " + port );
	});
}
