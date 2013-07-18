/* Modules */
var colors                              = require("colors");
var prototypejs                         = require('prototype');
Object.extend(global, prototypejs);     // to facilitate use of prototype
var http                                = require("http");
var url                                 = require("url");
var fs                                  = require("fs");
var express                             = require("express");
app                                     = express();
var server                              = http.createServer(app);
var io                                  = require('socket.io').listen(server);
/* Configuration */
var port                                = process.env.PORT || 80;

  /***********/
 /* Serveur */
/***********/
server.listen( port );
app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {
    fs.readFile(__dirname + '/public/index.html', 'utf8', function(err, text){
        res.send(text);
    });
});
console.log( "      Server listening on port : ".cyan.bold + port );


// Here we play with sockets

/***********
**
** Socket.IO and the game
**
***********/
var players = 0;

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
         //   if (!chechData(dataPre,data)) {
         //    // vérifier joueur du tour
         //    // controle des cases existante
         //    // vérifier qu'il n'y a pas plus d'une case de joué
         //    return "triche !";
         //   }
         // }
         // dataPre = data;
         io.sockets.emit('changeTurn', data);
    });

    socket.on('disconnect', function(){
        players--;
    });
});