function route(handle, pathname, response, request)
{
	debutTraitementUrl( pathname);
	
	if (typeof handle[pathname] === 'function'){
		handle[pathname](response, request);
	}
	else{
		aucunGestionnaire( pathname );
		response.writeHead(404, {"Content-Type": "text/html"});
		response.write("404 Non trouvé");
		response.end();
	}
}

exports.route							= route;




/********************
**
** AFFICHAGE MESSAGES
**
********************/
function debutTraitementUrl(cible){
	var message = "Début du traitement de l'URL " + cible;
	console.log(message.yellow);
}

function aucunGestionnaire(cible){
	var message = "Aucun gestionnaire associé à " + cible + "\n";
	console.log(message.bold.red);
}