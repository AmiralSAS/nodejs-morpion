// Modules
var http								= require("http");
var url									= require("url");


  /***********/
 /* Serveur */
/***********/
function index(route, handle){
	function onRequest(request, response){
		var pathname					= url.parse(request.url).pathname;
		var requeteRecue = "\nRequête reçue pour le chemin ";
		console.log( (requeteRecue + pathname).cyan );
		route(handle, pathname, response, request);
	}
	var port = process.env.PORT || 80;
	httpServer = http.createServer(onRequest).listen(port);
	console.log( ("Démarrage du serveur. Ecoute sur le port " + port + ".").green );

	/***********
	**
	** Socket.IO
	**
	***********/
	var players = 0;
	var io = require('socket.io').listen(httpServer);

	io.sockets.on('connection', function(socket){
		players++;
		var me = "player"+players;
		socket.emit("youArePlayer", me)

		if (me === "player2") {
			io.sockets.emit("startGame");
		}

		var contenu = {};
		// var dataPre;
		socket.on('endTurn', function(data){
			// if (dataPre) {
			// 	if (!chechData(dataPre,data)) {
			// 		// vérifier joueur du tour
			// 		// controle des cases existante
			// 		// vérifier qu'il n'y a pas plus d'une case de joué
			// 		return "triche !";
			// 	}
			// }
			// dataPre = data;
			io.sockets.emit('changeTurn', data);
		});

		socket.on('disconnect', function(){
			players--;
		});
	});
}


/**********************/

exports.index							= index;