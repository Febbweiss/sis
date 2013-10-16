/*
 * Copyright (c) 2013 Fabrice ECAILLE aka Febbweiss
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

WORLD.farm.bonus = [
	{
		type: "weapon",
		clazz: CarotWeapon,
		animation: WORLD.farm.weapons.carot
	},
	{
		type: "weapon",
		clazz: CornWeapon,
		animation: WORLD.farm.weapons.corn
	}
];

/*** Move ***/

var MOVE = {
	translation : {
		init : function (x, y) {
			return {directionX : 1, directionY : 0};
		},
		move : function() {
			var offset = (PLAYGROUND_WIDTH - 16 * this.width) / 2;
			if (Math.abs((this.getOriginX() - this.getX())) >= offset) {
				this.directionX *= -1;
				this.y = (this.y + this.height / 4);
			}
		
		},
	},
	mirror : {
		init : function(x, y) {
			if( x < PLAYGROUND_WIDTH / 2 ) {
				return {directionX: -1, directionY: 0};
			}
			return {directionX: 1, directionY: 0};
		},
		move : function() {
			var offset =  this.width / 2;
			if (Math.abs((this.getOriginX() - this.getX())) >= offset) {
				this.directionX *= -1;
				this.y = (this.y + this.height / 4);
			}
		
		},
	},
	sinusoid : {
		init : function (x, y) {
			return {directionX : 1, directionY : 0};
		},
		move : function () {
			var offsetX = (PLAYGROUND_WIDTH - 16 * this.width) / 2;
			if (Math.abs((this.getOriginX() - this.getX())) >= offsetX) {
				this.directionX *= -1;
			}
			var offsetY = 5 * ALIENS_HEIGHT;
			if (Math.abs((this.getOriginY() - this.getY())) >= offsetY) {
				this.directionY *= -1;
			}
		}
	}
};

/*** Move - end ***/

/*** Waves ***/

var WAVES = [
		{
			wave : [ [ Alien, Alien, Alien, Alien, Alien, Alien, Alien, Alien, Alien, Alien, Alien ],
				 [ Alien, Alien, Alien, Alien, Alien, Alien, Alien, Alien, Alien, Alien, Alien ],
				 [ Alien, Alien, Alien, Alien, Alien, Alien, Alien, Alien, Alien, Alien, Alien ],
				 [ Alien, Alien, Alien, Alien, Alien, Alien, Alien, Alien, Alien, Alien, Alien ],
				 [ Alien, Alien, Alien, Alien, Alien, Alien, Alien, Alien, Alien, Alien, Alien ], ],
			move : MOVE.sinusoid,
			bonus : [40, 20]
		},
		{
			wave : [ [ Alien, Alien, Alien, undefined, Alien, Alien, Alien ], 
				 [ Alien, Alien, Alien, Alien, undefined, Alien, Alien, Alien ],
				 [ Alien, Alien, Alien, Alien, undefined, Alien, Alien, Alien, Alien ],
				 [ Alien, Alien, Alien, Alien, undefined, Alien, Alien, Alien, Alien, Alien ],
				 [ Alien, Alien, Alien, Alien, Alien, undefined, Alien, Alien, Alien, Alien, Alien ] ],
			move : MOVE.mirror,
			bonus : [30, 15]
		} 
	];


/*** Waves - end ***/


/*** Weapons ***/

function Weapon() {
	"use strict";
}
Weapon.prototype = {
	speed : 5,
	strength : 10,
	stock: Infinity,
	rof : 300,
	ror : 1500,
	load : 1,
	max_load : 1,
	width : 5,
	height : 5,
	shot_timer : false,
	reload_timer : false,
	directionX : 0,
	directionY : 1,
	animation : null,
	clazz : "default",
	callback : undefined,

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

function ShotgunWeapon() {
	"use strict";
	this.directionY = -1;
	this.rof = 200;
	this.ror = 1500;
	this.load = 2;
	this.max_load = 2;
	this.width = 3;
	this.height = 3;
	this.clazz = "Shotgun"
}
ShotgunWeapon.prototype = {
}
heriter(ShotgunWeapon.prototype, Weapon.prototype);

function CarotWeapon() {
	"use strict";
	this.directionY = -1;
	this.stock = 10;
	this.clazz = "carot";
	this.load = 5;
	this.max_load = 5;
	this.width = 5;
	this.height = 10;
}
CarotWeapon.prototype = {
		
}
heriter(CarotWeapon.prototype, Weapon.prototype);

function CornWeapon() {
	"use strict";
	this.directionY = -1;
	this.stock = 3;
	this.clazz = "corn";
	this.load = 1;
	this.max_load = 1;
	this.callback = function(shot) {
		var higherAlien = Math.max.apply( null, 
			$(".alien").map(function() {
				return $(this).y();
			}).get() ),
			lowerAlien = Math.min.apply( null, 
			$(".alien").map(function() {
				return $(this).y();
			}).get() ),
			mediumAlien = (higherAlien + lowerAlien) / 2;
		
		if( shot.y() < mediumAlien ) {
			shot.remove();
			var shipShots = $("#shipShots");
			for( var i = 0; i < 8; i++) {
				var cos = Math.cos( (Math.PI / 4) * i ),
					sin = Math.sin( (Math.PI / 4) * i);
				if( Math.abs(cos) < 0.01 ) {
					cos = 0;
				}
				if( Math.abs(sin) < 0.01) {
					sin = 0;
				}
				shipShots.addSprite( "shotCorn" + i, { posx : shot.x() + 5 * cos, posy : shot.y() + 5 * sin, width: 2, height: 2});
				var shotCorn = $("#shotCorn" + i);
				shotCorn.addClass("shipShot").addClass("shotCorn");
				$("#shotCorn" + i)[0].weapon = $.extend({
						directionX : cos < 0 ? -1 : cos > 0 ? 1 : 0,
						directionY : sin < 0 ? -1 : sin > 0 ? 1 : 0,
						speed : 1
					}, shot.weapon); 
			}
		}
	}
}
CornWeapon.prototype = {
		
}
heriter(CornWeapon.prototype, Weapon.prototype);


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

	this.weapon = new ShotgunWeapon();
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
		if( this.lives == 0 ) {
			Game.game_over();
			return true;
		}
		
		var _this = this;
		setTimeout(function() {
			$("#hero").children().show();
			_this.health = 1;
		}, 2000);
	}, 

	fire : function() {
		if(this._super("fire", arguments)) {
			Game.shots.total = Game.shots.total + 1;
			this.weapon.stock--;
			if( this.weapon.stock == 0 ) {
				this.weapon = new ShotgunWeapon();
				$("#current_weapon").setAnimation(this.weapon.animation);
			} 
		}
	}

};

heriter(Ship.prototype, Actor.prototype);
/*** Actors - Heroes - END ***/

/*** Actors - END ***/
