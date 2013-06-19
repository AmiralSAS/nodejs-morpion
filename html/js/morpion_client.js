jQuery(function ($){
	console.log('jQuery est reconnu');
	// Mode strict
	'use strict';

	
	/* Code socket */
	var socket 							= io.connect();
	
	/**
	** Variables
	**/
	var joueur_actif 					= 'Joueur1';
	var template_victoire 				= '<p>{{joueur}} a gagné !</p>';
	cases 							= [];
	infos = {};
	infos.canClick = false;

	/**
	** Initialisation du jeu
	**/

	
	socket.on("startGame", function(){
		$("#pauseCache").fadeOut();
		creationDuTerrain();
		if (infos.me === "player1") {
			console.log("player1 begin to play");
			infos.canClick = true;
		}
	});

	socket.on("youArePlayer", function(me){
		infos.me = me;
		if (infos.me === "player1") {
			$("#joueur1").css("background-color", "#055");
		}
		if (infos.me === "player2") {
			$("#joueur2").css("background-color", "#055");
		}
	});



	
	/***************
		Scripts
	***************/
	/**
	** Clique sur case
	**/
	$('#container_jeu #jeu').on('click', '.case', function(event){
		event.preventDefault();
		if (infos.canClick === true) {
			var caseCliquee 				= $(this).prop("id");
			var posX 						= 0;
			var posY 						= 0;
			
			for (var i = 0; i < cases.length; i++){
				for (var j = 0; j < cases.length; j++){
					if(cases[i][j].getId() === caseCliquee){
						posX 				= j;
						posY 				= i;
					}
				}
			}
			
			if(cases[posY][posX].getValidePourClick() === true){
				var data = {};
				data.posY = posY;
				data.posX = posX;
				data.me = infos.me;
				socket.emit("endTurn", data)
			}
		}
	});
	

	
	
	/**
	** Clique sur bouton reset
	**/
	// $('#boutonReset').click(function(event){
	// 	event.preventDefault();
	// 	resetDuTerrain();
	// 	changerJoueurActif('Joueur1');
	// 	$('#fin_de_partie').fadeOut;
	// });
	
	











	socket.on("changeTurn", function(data){
		cases[data.posY][data.posX].setPossesseur(data.me);
					
		if (data.me === 'player1'){
			cases[data.posY][data.posX].setCouleur('bleu');
			cases[data.posY][data.posX].setValidePourClick(false)
			controlerTerrain();
			changerJoueurActif('Joueur2');
		}
		else if (data.me === 'player2'){
			cases[data.posY][data.posX].setCouleur('cyan');
			cases[data.posY][data.posX].setValidePourClick(false)
			controlerTerrain();
			changerJoueurActif('Joueur1');
		}
		if (infos.me != data.me) {
			infos.canClick = true;
		}else if (infos.me === data.me){
			infos.canClick = false;
		}
	})














	/***************
		Fonctions
	***************/
	/**
	** Gestion du terrain
	**/	
	function creationDuTerrain(){
		cases 							= [
											[(c00 = new Case('c00')), (c01 = new Case('c01')), (c02 = new Case('c02'))],
											[(c10 = new Case('c10')), (c11 = new Case('c11')), (c12 = new Case('c12'))],
											[(c20 = new Case('c20')), (c21 = new Case('c21')), (c22 = new Case('c22'))]
										];
		for (var i = 0; i < cases.length; i++){
			for (var j = 0; j < cases.length; j++){
				cases[i][j].creer();
			}
		}
		changerJoueurActif('Joueur1');
	}
	
	function resetDuTerrain(){
		$('#jeu').empty();
		creationDuTerrain();
	}
	
	
	
	/**
	** Changer joueur actif
	**/
	function changerJoueurActif(nouvelActif){
		if ( nouvelActif === 'Joueur1' ) {
			joueur_actif 				= 'Joueur1';
			$('#joueur2').removeClass('joueur_actif');
			$('#joueur1').addClass('joueur_actif');
		}
		else if ( nouvelActif === 'Joueur2' ){
			joueur_actif 				= 'Joueur2';
			$('#joueur1').removeClass('joueur_actif');
			$('#joueur2').addClass('joueur_actif');
		} 
	}

	
	
	/**
	** Scripts - Analyse du terrain et arret de partie
	**/
	// Arret de partie
	function arreterLaPartie(gagnant){
		$('#resultat').empty();
		if (gagnant === '0'){
			$('#resultat').append("Match nul.");
		}
		else {
			resultat.joueur 		= gagnant;
			$('#resultat').append(Mustache.render(template_victoire, resultat));
		}
		$('#fin_de_partie').fadeIn();
	}
	
	
	// Analyse du terrain
	function controlerTerrain(){
		// Controle des lignes
		for ( var i = 0 ; i < cases.length ; i++ ){
			for ( var j = 0 ; j < 1 ; j++ ){
				if(( cases[i][j].getPossesseur() === cases[i][j+1].getPossesseur() ) 
				&& ( cases[i][j].getPossesseur() === cases[i][j+2].getPossesseur() )){
					arreterLaPartie(cases[i][j].getPossesseur());
				}
			}
		}
		// Controle des colonnes
		for ( var i = 0 ; i < 1 ; i++ ){
			for ( var j = 0 ; j < cases.length ; j++ ){
				if(( cases[i][j].getPossesseur() === cases[i+1][j].getPossesseur() ) 
				&& ( cases[i][j].getPossesseur() === cases[i+2][j].getPossesseur() )){
					arreterLaPartie(cases[i][j].getPossesseur());
				}
			}
		}
		// Controle de la diagonale HG->BD
		if(( cases[0][0].getPossesseur() === cases[1][1].getPossesseur() ) 
		&& ( cases[1][1].getPossesseur() === cases[2][2].getPossesseur() )){
			arreterLaPartie(cases[i][j].getPossesseur());
		}
		// Controle de la diagonale BG->HD
		if(( cases[2][0].getPossesseur() === cases[1][1].getPossesseur() ) 
		&& ( cases[1][1].getPossesseur() === cases[0][2].getPossesseur() )){
			arreterLaPartie(cases[i][j].getPossesseur());
		}
		// controle des .vierge sur le terrain
		if ( $('.vierge').length === 0 ){
			arreterLaPartie('0');
		}
	}
});