var WAVES = [
		{
			wave : [ [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ] ],
			move : function() {
				var offset = (PLAYGROUND_WIDTH - 16 * this.width) / 2;
				if (Math.abs((this.getOriginX() - this.getX())) >= offset) {
					this.directionX *= -1;
					this.y = (this.y + this.height / 4);
				}
			}
		},
		{
			wave : [ [ 0, 0, 0, 0, 0, 0, 0 ], [ 0, 0, 0, 0, 0, 0, 0, 0 ],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ] ],
			move : function() {
				var offset = (PLAYGROUND_WIDTH - 16 * this.width) / 2;
				if (Math.abs((this.getOriginX() - this.getX())) >= offset) {
					this.directionX *= -1;
					this.y = (this.y + this.height / 4);
				}
			}
		} ];

Game = {
	running : false,
	wave : -1,
	aliens : [],
	ship : null,
	score : 0,
	
	init : function() {
		"use strict";
		Game.wave = Game.wave + 1;
		var row, col;
		var wave = WAVES[Game.wave].wave;
		for (row = 0; row < wave.length; row = row + 1) {
			var aliensRow = wave[row], type = aliensRow[0], offset = (PLAYGROUND_WIDTH - ((aliensRow.length - 1) * 0.5 + aliensRow.length)
					* ALIENS_WIDTH) / 2;
			for (col = 0; col < aliensRow.length; col = col + 1) {
				Game.setAlien(col, row, offset, type, WAVES[Game.wave].move);
			}
		}

		SCOREBOARD.init();
		SCOREBOARD.set_score( Game.score );
		
		Game.setShip();
		
		Game.running = true;
	},

	levelComplete : function() {
		"use strict";
		Game.running = false;

		setTimeout(function() {
			Game.init();
		}, 3000);
	},
	
	hit : function() {
		"use strict";
		if( !Game.running ) {
			return false;
		}
		console.log( "Game.hit" );
		var health = Game.ship.hit();
		$(".alienShot").remove();
		$(".shipShot").remove();
		$("#life" + Game.ship.lives).remove();
		Game.running = false;
		Game.ship.lives = Game.ship.lives - 1;
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
			GUI.drawText( $("#message"), game_over, true );
			Game.show_game_over();
		}
	},
	
	setAlien : function(x, y, offset, type, move) {
		"use strict";
		var id = x * ROWS + y;
		var alien = new Alien("alien" + id, {
			x : offset + x * ALIENS_WIDTH * 1.5,
			y : START_Y + (y * 1.25 * ALIENS_HEIGHT)
		}, move);
		$("#actors").addSprite("alien" + id, $.extend({posx : alien.x, posy : alien.y}, animations.alien));
		alien.node = $("#alien" + id);
		alien.node.addClass("alien");
		$("#alien" + id)[0].alien = alien;
		Game.aliens.push(alien);
	},

	setShip : function() {
		var type = SHIPS.scout;
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

		$(".shipShot").each(function(i,e) {
			var posy = $(this).y();
			if( posy < -$(this).height() ) {
				this.remove();
				return;
			}
			var weapon = $(this)[0].weapon;
			$(this).y(weapon.directionY * weapon.speed, true);
			$(this).x(weapon.directionX * weapon.speed, true);
			var collisions = $(this).collision(".alien,."+$.gQ.groupCssClass);
			collisions.each( function() {
				var alien = $(this)[0];
				var aliensNotInArray = $.grep( Game.aliens, function( elementOfArray, index) {
					return elementOfArray.id == alien.id;
				}, true);
				Game.aliens = aliensNotInArray;
				$(this)[0].alien.hit();
			})
			if( collisions.length > 0 ) {
				this.remove()
			}
			
			if( Game.aliens.length == 0 ) {
				Game.running = false;
				Game.levelComplete();
			}
		});
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
			collisions.each( function() {
				Game.hit();
			})
			if( collisions.length > 0 ) {
				this.remove()
			}
		});
	}
};
