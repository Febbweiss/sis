/*
 * Copyright (c) 2013 Fabrice ECAILLE aka Febbweiss
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

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
				_this.load = Math.min(_this.load + 1, Math.min(_this.max_load, _this.stock));
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
		var mediumAlien = getAliensMidHeight();
		
		if( shot.y() < mediumAlien ) {
			var 	x = shot.x(),
				y = shot.y(),
				explosion = EXPLOSIONS.SMALL[0];
			$("#shipShots").addSprite("cornExplosion", {width: explosion.width, height: explosion.height, posx: x - explosion.width / 2, posy: y - explosion.height / 2});
			explosionSmall($("#cornExplosion"), function() {$("#cornExplosion").remove()});
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
				shipShots.addSprite( "shotCorn" + i, { posx : x + 5 * cos, posy : y + 5 * sin, width: 2, height: 2});
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
