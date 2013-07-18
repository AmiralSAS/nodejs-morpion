var Case = Class.create({
	// Constructeur (???)
	initialize: function(id) {
		//
		// Paramètres
		//
		this.couleur 					= 'vierge'; // string
		this.id 						= id; // string
		this.possesseur 				= id; // string
		this.validePourClick 			= true; // bool
	},
	
	
	//
	// Méthodes
	//
	// Setters
	setCouleur: function(valeur) {
		jQuery('#' + this.id).removeClass(this.couleur );
		this.couleur 					= valeur;
		jQuery('#' + this.id).addClass(this.couleur);
		return 							true;
	},
	setPossesseur: function(valeur) {
		this.possesseur 				= valeur;
		return 							true;
	},
	setValidePourClick: function(valeur) {
		this.validePourClick 			= valeur;
		return 							true;
	},

	// Getters
	getCouleur: function() 				{return this.couleur;},
	getId: function() 					{return this.id;},
	getPossesseur: function() 			{return this.possesseur;},
	getValidePourClick: function() 		{return this.validePourClick;},
	
	// Autres
	creer: function() {
		jQuery('#jeu').append('<div class="case ' + this.couleur + '" id="' + this.id + '"></div>');
	},
	effacer: function() {
		jQuery('#' + this.id).remove();
	}
});