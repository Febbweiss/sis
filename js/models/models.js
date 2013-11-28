/*
 * Copyright (c) 2013 Fabrice ECAILLE aka Febbweiss
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

function getAliensMidHeight() {
	var higherAlien = Math.max.apply( null, 
		$(".alien").map(function() {
			return $(this).y();
		}).get() ),
		lowerAlien = Math.min.apply( null, 
		$(".alien").map(function() {
			return $(this).y();
		}).get() );
		
	return (higherAlien + lowerAlien) / 2;
}

WORLD.farm.bonus = [
	{
		type: "weapon",
		clazz: WEAPONS.CAROT,
		animation: WORLD.farm.weapons.carot
	},
	{
		type: "weapon",
		clazz: WEAPONS.CORN,
		animation: WORLD.farm.weapons.corn
	}
];

/*** Actors ***/
function Actor() {
	"use strict";
}
Actor.prototype = {
	id : null,
	node : null,
	x : null,
	y : null,
	originX : 0,
	originY : 0,
	speed : 0,
	health : 1,
	directionX : 0,
	directionY : 0,
	fireDirectionX : 0,
	fireDirectionY : 0,
	weapon : null,
	animations : {},

	getX : function() {
		"use strict";
		return this.x;
	},

	getY : function() {
		"use strict";
		return this.y;
	},

	move : function() {
		"use strict";
		if (!Game.running) {
			return;
		}
		this.x += this.directionX * this.speed;
		this.y += this.directionY * this.speed;
		this.x = Math.min(this.x, PLAYGROUND_WIDTH - this.node.w());
		this.x = Math.max(this.x, 0);
		this.node.x(this.x);
		this.node.y(this.y);
	},

	getOriginX : function() {
		return this.originX;
	},
	
	getOriginY : function() {
		return this.originY;
	},

	up : function(active) {
		"use strict";
		this.directionY = active ? -1 : 0;
	},

	down : function(active) {
		"use strict";
		this.directionY = active ? 1 : 0;
	},

	left : function(active) {
		"use strict";
		this.directionX = active ? -1 : 0;
	},

	right : function(active) {
		"use strict";
		this.directionX = active ? 1 : 0;
	},

	fire : function(layout, clazz) {
		var name = "shot" + Math.ceil(Math.random() * 1000);
		if (this.weapon.fire(layout)) {
			layout.addSprite(name, $.extend({ posx : this.x + this.node.w() / 2, posy : this.y + this.fireDirectionY * this.node.h()}, this.weapon));
			$("#" + name).addClass(clazz).addClass(this.weapon.clazz);
			$("#" + name)[0].weapon = this.weapon;
			return true;
		}
		return false;
	},
	
	hit : function() {
		this.health = this.health - 1;
		if( this.health == 0 ) {
			this.destroy();
		}
		
		return this.health;
	},

	destroy : function() {
		$("#" + this.id).remove();
	}
};


/*** Actors - Heroes - END ***/
function Ship(id, start, speed, animation) {
	"use strict";
	this.id = id;
	this.x = start.x;
	this.y = start.y;

	this.weapon = new Weapon(WEAPONS.SHOTGUN);
	this.fireDirectionY = -1;

	this.originX = this.x;
	this.originY = this.y;
	this.speed = speed;
	
	this.animation = animation;
	
	/*this.bigWheel = $("#bigWheel");
	this.smallWheel = $("#smallWheel");
	var bigWheelRadius = bigWheel.h() / 2,
		smallWheelRadius = smallWheel.h() / 2;
	this.bigWheelAngle = this.speed * 360 / ( 2 * Math.PI * bigWheelRadius );
	this.smallWheelAngle = this.speed * 360 / ( 2 * Math.PI * smallWheelRadius );*/

}

Ship.prototype = {
	speed : 0,
	directionX : 0,
	directionY : 0,
	lives : 3,
	animation : null,
	/*bigWheel : null,
	bigWheelAngle : 0,
	smallWheel : null,
	smallWheelAngle : 0,*/
	
	init : function() {
		"use strict";
		this.speed = 0;
		this.node.x(this.x);
		this.node.y(this.y);
	},

	/**
	 * Arc = (2* Pi * R) / (360) * alpha
	 * 
	 */
	move : function() {
		"use strict";
		this._super("move", arguments);
	},
	
	up : function(active) {
		if (this.y < (PLAYGROUND_HEIGHT - 2 * HUD_HEIGHT)) {
			return false;
		}
		this._super("up", arguments);
	},

	destroy : function() {
		var 	_this = this,
			_hero = $("#hero"),
			explosion = EXPLOSIONS.BIG;

		$("#life" + this.lives).remove();
		this.lives = this.lives - 1;
		
		$("#actors").addSprite("heroExplosion", 
			{
				width: explosion[0].width, 
				height: explosion[0].height, 
				posx: _hero.x() - explosion[0].width / 2 + _hero.w(), 
				posy: _hero.y() - explosion[0].height / 2 - _hero.h() /4
			}
		);
		explosionBig($("#heroExplosion"), function() {$("#heroExplosion").remove()});
		_hero.children().hide();
	}, 
	
	respawn : function() {
		$("#heroExplosion").remove();
		$("#hero").children().show();
	},

	fire : function() {
		if(this._super("fire", arguments)) {
			Game.shots.total = Game.shots.total + 1;
			this.weapon.stock--;
			if( this.weapon.stock == 0 ) {
				this.weapon = new Weapon(WEAPONS.SHOTGUN);
				$("#current_weapon").setAnimation(this.weapon.animation);
			} 
		}
	}

};

heriter(Ship.prototype, Actor.prototype);
/*** Actors - Heroes - END ***/

/*** Actors - END ***/
