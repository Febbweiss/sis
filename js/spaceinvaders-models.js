/*** Weapons ***/

function Weapon() {
	"use strict";
}
Weapon.prototype = {
	speed : 5,
	strength : 10,
	rof : 300,
	ror : 1500,
	load : 3,
	max_load : 3,
	width : 5,
	height : 20,
	shot_timer : false,
	reload_timer : false,
	directionX : 0,
	directionY : 1,
	animation : null,

	fire : function() {
		if (this.shot_timer || this.load <= 0) {
			return false;
		}
		
		var _this = this;
		this.load = Math.max(0,this.load - 1);
		this.shot_timer = setInterval(function() {
			if (_this.load > 0) {
				clearTimeout(_this.shot_timer);
				_this.shot_timer = false;
			}
		}, this.rof);
		
		if( !this.reload_timer) {
			this.reload_timer = setInterval( function() {
				_this.load = Math.min(_this.load + 1, _this.max_load);
				if( _this.load == _this.max_load ) {
					clearInterval(_this.reload_timer);
					_this.reload_timer = false;
				}
			}, this.ror);
		}
		return true;
	}

}

function HeroWeapon() {
	"use strict";
	this.directionY = -1;
}
HeroWeapon.prototype = {
		
}
heriter(HeroWeapon.prototype, Weapon.prototype);

function AlienWeapon() {
	"use strict";
	this.directionY = 1;
	this.width = 5;
	this.height = 10;
}
AlienWeapon.prototype = {
		
}
heriter(AlienWeapon.prototype, Weapon.prototype);
/*** Weapons -END ***/


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
	speed : null,
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
			$("#" + name).addClass(clazz)
			$("#" + name)[0].weapon = this.weapon;
		}
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

/*** Actors - Aliens ***/
function Alien(id, start, move) {
	"use strict";

	this.id = id;
	this.x = start.x;
	this.y = start.y;
	this.moveFct = move;

	this.weapon = new AlienWeapon();
	this.fireDirectionY = 1;

	this.originX = this.x;
	this.originY = this.y;
	this.directionX = -1;
	this.speed = 0.5;
}

Alien.prototype = {
	speed : 0,
	directionX : 0,
	directionY : 0,
	moveFct : null,
	width : ALIENS_WIDTH,
	height : ALIENS_HEIGHT,
	aggression : 0.0005,

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
		Game.addToScore( 5 );
	}
};

heriter(Alien.prototype, Actor.prototype);

/*** Actors - Aliens - END ***/

/*** Actors - Heroes - END ***/
function Ship(id, start, speed, animation) {
	"use strict";
	this.id = id;
	this.x = start.x;
	this.y = start.y;

	this.weapon = new HeroWeapon();
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

/*	right : function(active) {
		if( this.x + this.node.w() > PLAYGROUND_WIDTH ){
			return false;
		}
		this._super("right", arguments);
		
		this.bigWheel.rotate(this.bigWheelAngle, true);
		this.smallWheel.rotate(this.smallWheelAngle, true);
	},
	
	left : function(active) {
		if( this.x < 0 ){
			return false;
		}
		this._super("left", arguments);
		
		this.bigWheel.rotate(this.bigWheelAngle, true);
		this.smallWheel.rotate(this.smallWheelAngle, true);
	},
*/	
	up : function(active) {
		if (this.y < (PLAYGROUND_HEIGHT - 2 * HUD_HEIGHT)) {
			return false;
		}
		this._super("up", arguments);
	},

	destroy : function() {
		$("#life" + this.lives).remove();
		this.lives = this.lives - 1;
		$("#hero").children().hide();
		var _this = this;
		setTimeout(function() {
			$("#hero").children().show();
			_this.health = 1;
		}, 2000);
	}

};

heriter(Ship.prototype, Actor.prototype);
/*** Actors - Heroes - END ***/

/*** Actors - END ***/