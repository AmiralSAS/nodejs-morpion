var querystring							= require("querystring");
var fs									= require("fs");
var formidable							= require("formidable");

function index(response) {
	

	fs.readFile("./html/index.html", "binary", function(error, file) {
		if(error) {
			response.writeHead(500, {"Content-Type": "text/html"});
			response.write(error + "\n");
			response.end();
		} else {
			response.writeHead(200, {"Content-Type": "text/html"});
			response.write(file, "binary");
			response.end();
		}
	});
}

/********************
*********************
**
** GESTION DES STYLES
**
*********************
********************/

function normalize(response) {
	appelGestionnaire("normalize");

	fs.readFile("./html/css/normalize.css", "binary", function(error, file) {
		if(error) {
			response.writeHead(500, {"Content-Type": "text/html"});
			response.write(error + "\n");
			response.end();
		} else {
			response.writeHead(200, {"Content-Type": "text/css"});
			response.write(file, "binary");
			response.end();
		}
	});
}

function grid(response) {
	appelGestionnaire("grid");

	fs.readFile("./html/css/grid.css", "binary", function(error, file) {
		if(error) {
			response.writeHead(500, {"Content-Type": "text/html"});
			response.write(error + "\n");
			response.end();
		} else {
			response.writeHead(200, {"Content-Type": "text/css"});
			response.write(file, "binary");
			response.end();
		}
	});
}

function animations(response) {
	appelGestionnaire("animations");

	fs.readFile("./html/css/animations.css", "binary", function(error, file) {
		if(error) {
			response.writeHead(500, {"Content-Type": "text/html"});
			response.write(error + "\n");
			response.end();
		} else {
			response.writeHead(200, {"Content-Type": "text/css"});
			response.write(file, "binary");
			response.end();
		}
	});
}

function styles(response) {
	appelGestionnaire("styles");

	fs.readFile("./html/css/styles.css", "binary", function(error, file) {
		if(error) {
			response.writeHead(500, {"Content-Type": "text/html"});
			response.write(error + "\n");
			response.end();
		} else {
			response.writeHead(200, {"Content-Type": "text/css"});
			response.write(file, "binary");
			response.end();
		}
	});
}


/***********************
************************
**
** GESTION DU JAVASCRIPT
**
************************
***********************/

function jquery(response) {
	appelGestionnaire("jquery");

	fs.readFile("./html/js/jquery-1.9.1.js", "binary", function(error, file) {
		if(error) {
			response.writeHead(500, {"Content-Type": "text/html"});
			response.write(error + "\n");
			response.end();
		} else {
			response.writeHead(200, {"Content-Type": "text/javascript"});
			response.write(file, "binary");
			response.end();
		}
	});
}

function prototype(response) {
	appelGestionnaire("prototype");

	fs.readFile("./html/js/prototype-1.7.1.js", "binary", function(error, file) {
		if(error) {
			response.writeHead(500, {"Content-Type": "text/html"});
			response.write(error + "\n");
			response.end();
		} else {
			response.writeHead(200, {"Content-Type": "text/javascript"});
			response.write(file, "binary");
			response.end();
		}
	});
}

function mustache(response) {
	appelGestionnaire("mustache");

	fs.readFile("./html/js/mustache.js", "binary", function(error, file) {
		if(error) {
			response.writeHead(500, {"Content-Type": "text/html"});
			response.write(error + "\n");
			response.end();
		} else {
			response.writeHead(200, {"Content-Type": "text/javascript"});
			response.write(file, "binary");
			response.end();
		}
	});
}

function classCase(response) {
	appelGestionnaire("client");

	fs.readFile("./html/js/Classes/class_case.js", "binary", function(error, file) {
		if(error) {
			response.writeHead(500, {"Content-Type": "text/html"});
			response.write(error + "\n");
			response.end();
		} else {
			response.writeHead(200, {"Content-Type": "text/javascript"});
			response.write(file, "binary");
			response.end();
		}
	});
}

function client(response) {
	appelGestionnaire("client");

	fs.readFile("./html/js/client.js", "binary", function(error, file) {
		if(error) {
			response.writeHead(500, {"Content-Type": "text/html"});
			response.write(error + "\n");
			response.end();
		} else {
			response.writeHead(200, {"Content-Type": "text/javascript"});
			response.write(file, "binary");
			response.end();
		}
	});
}

function morpionClient(response) {
	appelGestionnaire("client");

	fs.readFile("./html/js/morpion_client.js", "binary", function(error, file) {
		if(error) {
			response.writeHead(500, {"Content-Type": "text/html"});
			response.write(error + "\n");
			response.end();
		} else {
			response.writeHead(200, {"Content-Type": "text/javascript"});
			response.write(file, "binary");
			response.end();
		}
	});
}


/*********
**********
**
** EXPORTS
**
**********
*********/
/* HTML */
exports.index							= index;
/* CSS */
exports.normalize						= normalize;
exports.grid							= grid;
exports.animations						= animations;
exports.styles							= styles;
/* JavaScript */
exports.jquery							= jquery;
exports.mustache						= mustache;
exports.client							= client;
exports.classCase						= classCase;
exports.prototype						= prototype;
exports.morpionClient					= morpionClient;





function appelGestionnaire(cible){
	var message = "Gestionnaire appelé          " + cible;
	console.log(message.green);
}