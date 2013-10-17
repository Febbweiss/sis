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
			var aliensRow = wave[row], type = aliensRow[0], offset = (PLAYGROUND_WIDTH - ((aliensRow.length - 1) * 0.5 + aliensRow.length)
					* ALIENS_WIDTH) / 2;
			for (col = 0; col < aliensRow.length; col = col + 1) {
				Game.setAlien(col, row, offset, aliensRow[col], Game.wave.move);
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
		var bonus = Math.round(((Game.shots.total - Game.shots.lost) / Game.shots.total) * Game.wave.score);
		Game.addToScore(bonus);
		
		displayModal( {
			bonus: bonus,
			wave_score: Game.wave.score,
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
				Game.running = true;
				$("#hero").children().show();
				_this.health = 1;
			}, 2000);
		}
		else {
			Game.game_over();
		}
	},
	
	setAlien : function(x, y, offset, type, move) {
		"use strict";
		if( typeof type == "undefined" ) {
			return;
		}
		var id = x * ROWS + y;
		var alien = new type("alien" + id, {
			x : offset + x * ALIENS_WIDTH * 1.5,
			y : START_Y + (y * 1.25 * ALIENS_HEIGHT)
		}, move.move);
		var directions = move.init( alien.x, alien.y );
		alien.directionX = directions.directionX;
		alien.directionY = directions.directionY;
		$("#actors").addSprite("alien" + id, $.extend({posx : alien.x, posy : alien.y}, animations.alien));
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
			if( alien.health > 0 && Math.random() < alien.aggression ) {
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
				var collisions = $(this).collision(".alien,."+$.gQ.groupCssClass);
				collisions.each( function() {
					var alien = $(this)[0],
						aliensNotInArray = $.grep( Game.aliens, function( elementOfArray, index) {
						return elementOfArray.id == alien.id;
						}, true);
						alienX = alien.alien.x,
						alienY = alien.alien.y,
						alienWidth = alien.alien.width,
						alienHeight = alien.alien.height;
					Game.aliens = aliensNotInArray;
					alien.alien.hit();
					var remainingAliens = $(".alien").length;
					if( remainingAliens == Game.wave.bonus[0] || remainingAliens == Game.wave.bonus[1] ) {
						Game.bonus(alienX, alienY, alienWidth, alienHeight);					
					}
				})
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
					Game.ship.weapon = new bonus.clazz;
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
			var collisions = $(this).collision("#ship,."+$.gQ.groupCssClass);
			if( collisions.length > 0 ) {
				collisions.each( function() {
					Game.hit();
				});
				this.remove();
			}
		});
	}
};
