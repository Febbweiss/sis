/*
 * Copyright (c) 2013 Fabrice ECAILLE aka Febbweiss
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

var ALIENS = {
	alien1 : {
		health 		: 1,
		weapon 		: WEAPONS.ALIEN,
		score 		: 5,
		aggression 	: 0.0005,
		animation 	: ALIENS_TYPE[0]
	},
	alien2 : {
		health 		: 2,
		weapon 		: WEAPONS.ALIEN,
		score 		: 10,
		aggression 	: 0.001,
		animation 	: ALIENS_TYPE[1]
	},
	alien3 : {
		health 		: 3,
		weapon 		: WEAPONS.ALIEN,
		score 		: 20,
		aggression 	: 0.0015,
		animation 	: ALIENS_TYPE[2]
	}
}


/*** Actors - Aliens ***/
function Alien(id, start, move, type) {
	"use strict";

	this.id = id;
	this.x = start.x;
	this.y = start.y;
	this.moveFct = move;

	this.weapon = new Weapon(type.weapon);
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
