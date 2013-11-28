var ALIENS = {
	alien1 : {
		health : 1,
		weapon : AlienWeapon,
		score : 5,
		aggression : 0.0005,
		animation : ALIENS_TYPE[0]
	},
	alien2 : {
		health : 1,
		weapon : AlienWeapon,
		score : 10,
		aggression : 0.001,
		animation : ALIENS_TYPE[1]
	},
	alien3 : {
		health : 1,
		weapon : AlienWeapon,
		score : 20,
		aggression : 0.0015,
		animation : ALIENS_TYPE[2]
	}
}


/*** Actors - Aliens ***/
function Alien(id, start, move, type) {
	"use strict";

	this.id = id;
	this.x = start.x;
	this.y = start.y;
	this.moveFct = move;

	this.weapon = new type.weapon();
	this.fireDirectionY = 1;

	this.originX = this.x;
	this.originY = this.y;
	this.directionX = -1;
	this.speed = 0.5;
	this.animation = type.animation;
	this.width = type.animation.width;
	this.height = type.animation.height;
	this.health = type.health;
	this.aggression = type.aggression;
	this.score = type.score;
}

Alien.prototype = {
	moveFct : null,
	width : 0,
	height : 0,
	aggression : 0,
	animation : null,
	score : 0,

	init : function() {
		"use strict";
		this.speed = 0;
		this.node.x(this.x);
		this.node.y(this.y);
	},

	move : function() {
		"use strict";
		this._super("move", arguments);
		if (typeof this.moveFct !== undefined) {
			this.moveFct();
		}
	},
	
	destroy : function() {
		this._super("destroy", arguments);
		Game.addToScore( this.score );
	}
};

heriter(Alien.prototype, Actor.prototype);

/*** Actors - Aliens - END ***/
