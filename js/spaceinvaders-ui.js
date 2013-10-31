/*
 * Copyright (c) 2013 Fabrice ECAILLE aka Febbweiss
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/*global jQuery */

var PLAYGROUND_WIDTH = 448,
	PLAYGROUND_HEIGHT = 544,
	MODAL_WIDTH = 300,
	REFRESH_RATE = 15,
	HUD_HEIGHT = 70,

	ROWS = 5,
	ALIENS = 11,

	ALIENS_WIDTH = 24,
	ALIENS_HEIGHT = 17,

	START_Y = 40;

var animations = WORLD.farm;


function explose( div, explosion, step, callback ) {
	if( step < explosion.length - 2 ) {
		div.setAnimation( explosion[step].animation, function() {
			explose( div, explosion, step + 1, callback );
		}); 
	} else {
		div.setAnimation( explosion[step].animation, callback);
	}
};

function explosionBig( div, callback ) {
	explose(div, EXPLOSIONS.BIG, 0, callback );
};

function explosionSmall( div, callback ) {
	explose(div, EXPLOSIONS.SMALL, 0, callback );
};

function displayModal(data) {
	var score = data.score.toString();
	$.playground()
		.addGroup( "modal_pane", {width: MODAL_WIDTH, height: data.end ? 190 : 140, posx: (PLAYGROUND_WIDTH - MODAL_WIDTH ) /2, posy: (PLAYGROUND_HEIGHT - (140 ))/2})
			.addSprite("scoreLbl", {width: 180, height: 32, posx: 10, posy: data.end ? 50 : 10})
			.addSprite("scoreNbr", {width: score.length * 32, height: 32, posx: (MODAL_WIDTH - 10 - score.length * 32), posy: data.end ? 50 : 10})
		.end();
	if( data.end ) {
		var width = (data.end.length - 1 ) * 16 + 32;
		$("#modal_pane").addSprite("gameSt", {width: width, height: 32, posx: (MODAL_WIDTH - width) / 2, posy: 10});
		$("#gameSt").append(data.end).lettering();
	}
	
	if( data.bonus ) {
		var bonus = data.bonus.toString(),
			total = data.wave_score.toString();
		$("#modal_pane")
			.addSprite("totalLbl", {width: 180, height: 32, posx: 10, posy: data.end ? 130 : 90})
			.addSprite("totalNbr", {width: total.length * 32, height: 32, posx: (MODAL_WIDTH - 10 - total.length * 32), posy: data.end ? 130 : 90})
			.addSprite("bonusLbl", {width: 180, height: 32, posx: 10, posy: data.end ? 90 : 50})
			.addSprite("bonusNbr", {width: bonus.length * 32, height: 32, posx: (MODAL_WIDTH - 10 - bonus.length * 32), posy: data.end ? 90 : 50})
			;
		$("#totalLbl").append("Wave").lettering();
		$("#totalNbr").append(total).lettering();
		$("#bonusLbl").append("Bonus").lettering();
		$("#bonusNbr").append(bonus).lettering();
	}
	
	$("#modal_pane").addClass( "modal" );
	$("#scoreLbl").append("Score").lettering();
	$("#scoreNbr").append(score).lettering();
}

function hideModal() {
	$("#modal_pane").remove();
}

function updateWeaponLoad( load ) {
	"use strict";
	var HTMLDiv = $("#weapon_load");
	HTMLDiv.removeClass().addClass("weapon_level");
	if( load > 2/3) {
		HTMLDiv.addClass("good");
	} else {
		if( load > 1/3) {
			HTMLDiv.addClass("middle");
		} else {
			HTMLDiv.addClass("bad");
		}
	}
	HTMLDiv.width( (load * 100) + "%" );
}

function updateLevel(level) {
	var strLevel = level.toString();
	var div = $("#level");
	div.w(strLevel.length * 32);
	div.x( PLAYGROUND_WIDTH  / 2 - 10 - strLevel.length * 32);
	div.empty().append(strLevel).lettering();
}

$(function(){
	"use strict";
	
	//Playground Sprites
	$("#playground").playground({height: PLAYGROUND_HEIGHT, width: PLAYGROUND_WIDTH, keyTracker: true});
	
	$.playground({refreshRate: 60})
		.addGroup("background", {posx: 0, posy: HUD_HEIGHT, width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT - HUD_HEIGHT})
			.addSprite( "background1", {animation: animations.backgrounds.farm.background1.animation, width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT - HUD_HEIGHT})
			.addSprite( "background2", {animation: animations.backgrounds.farm.background2.animation, width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT - HUD_HEIGHT})
			.addSprite("ground", {posx: 0, posy : PLAYGROUND_HEIGHT - HUD_HEIGHT - 20, width: PLAYGROUND_WIDTH, height: 20})
		.end()
		.addGroup("actors", {posx: 0, posy: HUD_HEIGHT, width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT - HUD_HEIGHT})
			.addGroup("hero", {
				width: 48,
				height: 60,
				posx: (PLAYGROUND_WIDTH - 48) / 2,
				posy: PLAYGROUND_HEIGHT - HUD_HEIGHT - 50
			})
			.end()
			.addSprite("explosion", {
				width: 64,
				height: 64,
				posx: 100,
				posy: 100
			})
		.end()
		.addGroup( "shipShots", {posx: 0, posy: HUD_HEIGHT, width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT - HUD_HEIGHT})
		.end()
		.addGroup( "aliensShots", {posx: 0, posy: HUD_HEIGHT, width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT - HUD_HEIGHT})
		.end()
		.addGroup( "hud", {width: PLAYGROUND_WIDTH, height: HUD_HEIGHT, posx: 0, posy: 0})
			.addSprite( "current_weapon", $.extend({posx: 10, posy: 40}, animations.weapons.gun))
			.addGroup("weapon_bar", {
				posx : 50,
				posy : 40,
				width : 100,
				height : 10
			})
				.addSprite("weapon_load", {
					width : 100,
					height : 10
				})
			.end()
			.addGroup("scoreboard", {
				posx: 10,
				posy: 2,
				width: 6 * 32,
				height: 32
			})
				.addSprite( "subScoreboard", {
					width: 6 * 32,
					height: 32
				})
			.end()
			.addGroup("lives", {
				posx: PLAYGROUND_WIDTH - 100,
				posy: 32,
				width: 100,
				height: 32
			})
				.addSprite("life2", animations.life)
				.addSprite("life1", $.extend({posx: 32}, animations.life))
				.addSprite("life0", $.extend({posx: 64}, animations.life))
			.end()
			.addGroup("levelGrp", {
				posx: PLAYGROUND_WIDTH / 2,
				posy: 2,
				width: PLAYGROUND_WIDTH / 2,
				height: 16
				})
				.addSprite("levelLbl", {
					width: 32 + 5 * 16,
					posx: 10
				})
				.addSprite("level", {
					width : 64,
					posx: 32 + 7 * 16,
					height: 32
				})
			.end()
		.end()
		;

	$("#ground").css("background-color", "brown");
	$("#levelLbl").append("Level").lettering();
	$("#level").append("0").lettering();
	$("#scoreboard").addClass("scoreboard");
	$("#subScoreboard").addClass("subScoreboard");
	var hud = $("#hud");

	// Controls
	$.playground().registerCallback(Game.control, REFRESH_RATE);
	$.playground().registerCallback(Game.alienControl, REFRESH_RATE);
	
	// Collisions management
	$.playground().registerCallback(Game.bonusCollision, REFRESH_RATE);
	$.playground().registerCallback(Game.heroShotCollision, REFRESH_RATE);
	$.playground().registerCallback(Game.alienShotCollision, REFRESH_RATE);
	
	// Refresh playground
	$.playground().registerCallback(function(){
		updateWeaponLoad(Game.ship.weapon.load / Game.ship.weapon.max_load);
		if( Game.running ) {
			Game.ship.move();
			$(".bonus").each( function(index, bonus) {
				var posy = $(this).y();
				if( posy < Game.ship.y + 10 ) {
					$(this).y(3, true);
					return;
				}			
			});
		}
	}, REFRESH_RATE);
});

$(document).ready(function () {
	Game.init();
	$.loadCallback(function(percent){
        	$("#loadingBar").width(400*percent);
	});
	$.playground().startGame(
		function() {
			$("#welcomeScreen").remove();
		}
	);
});
