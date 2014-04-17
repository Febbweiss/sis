/*
 * Copyright (c) 2013 Fabrice ECAILLE aka Febbweiss
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

Game = {
	running : false,
	wave_index : -1,
	wave : undefined,
	aliens : [],
	ship : null,
	score : 0,
	shots : {
		total : 0,
		lost : 0
	},
	
	init : function() {
		"use strict";
		animations = WORLD.farm;
		Game.wave_index = Game.wave_index + 1;
		Game.wave = WAVES[Math.min(Game.wave_index, WAVES.length - 1)];
		Game.wave.score = 0;
		
		var row, col, wave = Game.wave.wave;
		
		for (row = 0; row < wave.length; row = row + 1) {
			var alien_width_avg = 0,
				aliens_row = wave[row], 
				offset = 0;

			for (col = 0; col < aliens_row.length; col = col + 1) {
				var current_width = typeof aliens_row[col] !== "undefined" ? aliens_row[col].animation.width : ALIENS_TYPE[2].width;
				alien_width_avg = alien_width_avg + current_width;
			}

			alien_width_avg = alien_width_avg / aliens_row.length;
			offset = (PLAYGROUND_WIDTH - (aliens_row.length  * 1.5 - 0.5) * alien_width_avg) / 2;

			for (col = 0; col < aliens_row.length; col = col + 1) {
				Game.setAlien(col, row, offset, alien_width_avg, aliens_row[col], Game.wave.move);
			}
		}

		SCOREBOARD.init();
		SCOREBOARD.set_score( Game.score );
		
		updateLevel(Game.wave_index + 1);
		
		Game.setShip();
		
		hideModal();
		Game.running = true;
	},

	game_over : function() {
		displayModal( {
			end: "Loose",
			score: Game.score
		});
	},
	
	levelComplete : function() {
		"use strict";
		Game.running = false;
		var bonus = Math.round(((Game.shots.total - Game.shots.lost) / Game.shots.total) * Game.wave.score),
			wave_score = Game.wave.score;
		Game.addToScore(bonus);
		
		displayModal( {
			bonus: bonus,
			wave_score: wave_score,
			score: Game.score,
		});

		setTimeout(function() {
			Game.init();
		}, 5000);
	},
	
	hit : function() {
		"use strict";
		if( !Game.running ) {
			return false;
		}

		var health = Game.ship.hit();
		$(".alienShot").remove();
		$(".shipShot").remove();
		$("#life" + Game.ship.lives).remove();
		Game.running = false;
		$("#hero").children().hide();
		
		if( Game.ship.lives > 0 ) {
			var _this = Game.ship;
			setTimeout(function() {
				Game.ship.respawn();
				Game.running = true;
			}, 5000);
		}
		else {
			Game.game_over();
		}
	},
	
	setAlien : function(x, y, offset, width, type, move) {
		"use strict";
		if( typeof type === "undefined" ) {
			return;
		}
		var id = Game.aliens.length + 1, 
			alien = new Alien("alien" + id, {
				x : offset + x * width * 1.5,
				y : START_Y + (y * 1.25 * type.animation.height)
			}, move.move, type),
			directions = move.init( alien.x, alien.y );
		alien.directionX = directions.directionX;
		alien.directionY = directions.directionY;
		$("#actors").addSprite("alien" + id, $.extend({posx : alien.x, posy : alien.y}, alien.animation));
		alien.node = $("#alien" + id);
		alien.node.addClass("alien");
		$("#alien" + id)[0].alien = alien;
		Game.aliens.push(alien);
	},

	setShip : function() {
		Game.ship = new Ship("ship", {
			x : $("#hero").x(),
			y : $("#hero").y()
		}, 3, animations.hero.ship.animation);
		var hero = $("#hero");
		$.each(animations.hero, 
			function(id, obj){
				hero.addSprite(id, obj);
			});
		Game.ship.node = $("#hero");
	},
	
	addToScore : function( toAdd ) {
		Game.score = Game.score + toAdd;
		Game.wave.score = Game.wave.score + toAdd;
		SCOREBOARD.add( toAdd );
	},
	
	control : function() {
		if( !Game.running ) {
			return false;		
		}

		$(document).keyup(function(e){
			switch(e.keyCode) {
				case 37:
					e.preventDefault();
					Game.ship.left(false);
					break;	
				case 39:
					e.preventDefault();
					Game.ship.right(false);
					break;
			} 
		 });
		 $(document).keydown(function(e){
			switch(e.keyCode) {
				case 37:
					e.preventDefault();
					Game.ship.left(true);
					break;
				case 39:
					e.preventDefault();
					Game.ship.right(true);
					break;
				case 32:
					e.preventDefault();
					Game.ship.fire($("#shipShots"), "shipShot");
					return false;
				} 
			 });
	},
	
	alienControl : function() {
		if( !Game.running ) {
			return false;		
		}

		$.each(Game.aliens, function(index, alien ) {
			alien.move();
			var node = alien.node;
			if( (node.y() + node.h()) > $("#hero").y() ) {
				Game.running = false;
				Game.game_over();
				return false;
			}
			if( alien.health > 0 && Math.random() < (alien.aggression * (Game.wave_index + 1)) ) {
				alien.fire($("#aliensShots"), "alienShot");
			}
		});
	},
	
	heroShotCollision : function() {
		if( !Game.running ) {
			return false;		
		}
		
		var shots = $(".shipShot");
		if( shots.length == 0 ) {
			return false;
		}
		
		shots.each(function(i,e) {
			var posy = $(this).y(),
				posx = $(this).x(),
				weapon = $(this)[0].weapon;
				
			// Lost shots
			if( posy < -$(this).height() || posy > PLAYGROUND_HEIGHT || posx < -$(this).width() || posx > PLAYGROUND_WIDTH ) {
				Game.shots.lost = Game.shots.lost + 1;
				this.remove();
				return;
			}
			$(this).y(weapon.directionY * weapon.speed, true);
			$(this).x(weapon.directionX * weapon.speed, true);
			
			if( weapon.callback ) {
				weapon.callback($(this));
			} else {
				// Shots collisions
				var collisions = $(this).collision(".alien,."+$.gQ.groupCssClass);
				collisions.each( function() {
					var alien = $(this)[0],
						alienX = alien.alien.x,
						alienY = alien.alien.y,
						alienWidth = alien.alien.width,
						alienHeight = alien.alien.height;
					
					alien.alien.hit();
					Game.aliens = $.grep( Game.aliens, function( elementOfArray, index) {
								return elementOfArray.health == 0 && elementOfArray.id == alien.id;
							}, true);
					var remainingAliens = $(".alien").length;
					if( remainingAliens == Game.wave.bonus[0] || remainingAliens == Game.wave.bonus[1] ) {
						Game.bonus(alienX, alienY, alienWidth, alienHeight);					
					}
				});
				if( collisions.length > 0 ) {
					this.remove()
				}
			
				if( Game.aliens.length == 0 ) {
					Game.running = false;
					Game.levelComplete();
				}
			}
		});
	},

	bonusCollision : function() {
		if( !Game.running ) {
			return false;		
		}
		
		$(".bonus").each(function(i,e) {
			var collisions = $(this).collision("#ship,."+$.gQ.groupCssClass);
			var bonus = $(this)[0].bonus;
			if( collisions.length > 0 ) {
				if( bonus.type === "weapon" ) {
					Game.ship.weapon = new Weapon(bonus.clazz);
					$("#current_weapon").setAnimation(bonus.animation.animation);
					this.remove();
				}
			}
		});
	},


	bonus : function(alienX, alienY, alienWidth, alienHeight) {
		var bonus = animations.bonus[Math.round(Math.random() * (animations.bonus.length - 1)) ];
		var id = Math.round(Math.random() * 10000);
		$("#actors").addSprite("bonus" + id, 
			$.extend(
				{
					posx: alienX + (alienWidth - bonus.animation.width) / 2, 
					posy: alienY 
				}, bonus.animation));
		$("#bonus" + id).addClass("bonus");
		$("#bonus" + id)[0].bonus = bonus;
	},
	
	alienShotCollision : function() {
		if( !Game.running ) {
			return false;		
		}

		$(".alienShot").each(function(i,e) {
			var posy = $(this).y();
			if( posy > PLAYGROUND_HEIGHT ) {
				this.remove();
				return;
			}
			var weapon = $(this)[0].weapon;
			$(this).y(weapon.directionY * weapon.speed, true);
			$(this).x(weapon.directionX * weapon.speed, true);
//			var collisions = $(this).collision("#ship,."+$.gQ.groupCssClass);
			try {
				var collisions = $(this).collision("#actors,#hero,#ship");
				if( collisions.length > 0 ) {
					Game.hit();
					this.remove();
				}
			}catch(e) {
			}
		});
	}
};
