/*global jQuery, console */

var PLAYGROUND_WIDTH = 448,
	PLAYGROUND_HEIGHT = 544,
	REFRESH_RATE = 15,
	HUD_HEIGHT = 70,

	ROWS = 5,
	ALIENS = 11,

	ALIENS_WIDTH = 24,
	ALIENS_HEIGHT = 17,

	START_Y = 40,
	IMAGES_PREFIX = "images/";

var SHIPS = {
  	scout: {width: 30, height: 25},
  	bomber: {width: 30, height: 25},
  	cruser: {width: 30, height: 25}
};

var animations = {
		hero : {
			ship : {
				animation : new $.gameQuery.Animation({
					imageURL : IMAGES_PREFIX + "farm.png"
				}),
				width : 48,
				height : 24,
				posx : 0,
				posy : 17
			},
			/*cockpit : {
				animation : new $.gameQuery.Animation({
					imageURL : IMAGES_PREFIX + "farm.png",
					offsety : 24,
					offsetx : 20
				}),
				width : 20,
				height : 33,
				posx : 28,
				posy : 3
			},*/
			smallWheel : {
				animation  : new $.gameQuery.Animation({
					imageURL : IMAGES_PREFIX + "farm.png",
					offsetx : 0,
					offsety : 24
				}),
				posx : 4,
				posy : 30,
				width: 14,
				height: 14
			},
			bigWheel : {
				animation  : new $.gameQuery.Animation({
					imageURL : IMAGES_PREFIX + "farm.png",
					offsetx : 0,
					offsety : 38
				}),
				width : 19,
				height : 19,
				posx : 25,
				posy : 27
			}
		},
		alien : {
			animation : new $.gQ.Animation({
				imageURL : IMAGES_PREFIX + "invader.png",
				numberOfFrame : 2,
				delta : ALIENS_WIDTH,
				rate : 400,
				type : $.gQ.ANIMATION_HORIZONTAL
			}),
			width : ALIENS_WIDTH,
			height : ALIENS_HEIGHT			
		},
		ufo : {
			animation: new $.gQ.Animation({imageURL: IMAGES_PREFIX + "ufo.png"}), 
			width: 48, 
			height: 32,
			posy: 10
		},
		life : {
			animation : new $.gameQuery.Animation({
				imageURL : IMAGES_PREFIX + "farm.png",
				offsetx : 14,
				offsety : 24
			}),
			width: 32,
			height: 16
		},
		weapons : {
			carot : {
				animation : new $.gameQuery.Animation({
					imageURL : IMAGES_PREFIX + "farm.png",
					offsetx : 19,
					offsety : 37
				}),
				width: 19,
				height: 19
			},
			corn : {
				animation : new $.gameQuery.Animation({
					imageURL : IMAGES_PREFIX + "farm.png",
					offsetx : 38,
					offsety : 37
				}),
				width: 19,
				height: 19
			},
			gun : {
				animation : new $.gameQuery.Animation({
					imageURL : IMAGES_PREFIX + "farm.png",
					offsetx : 57,
					offsety : 37
				}),
				width: 19,
				height: 19
			}
		},
		backgrounds : {
			farm: {
				background1 : {
					animation : new $.gQ.Animation({
						imageURL : IMAGES_PREFIX + "background.png"
					})
				},
				background2 : {
					animation : new $.gQ.Animation({
						imageURL : IMAGES_PREFIX + "background2.png"
					})
				}
			}
		}
};

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
				.addSprite("life3", animations.life)
				.addSprite("life2", $.extend({posx: 32}, animations.life))
				.addSprite("life1", $.extend({posx: 64}, animations.life))
			.end()
			.addGroup("levelGrp", {
				posx: PLAYGROUND_WIDTH - 6 * 32 + 16,
				posy: 2,
				width: 32 + 5 * 16,
				height: 16
				})
				.addSprite("levelLbl", {
					width: 32 + 5 * 16
				})
				.addSprite("level", {
					width : 64,
					posx: 32 + 7 * 16,
					posy: 16,
					height: 16
				})
			.end()
			.addSprite( "carot", $.extend({posx: 210, posy: 40}, animations.weapons.carot))
			.addSprite( "corn", $.extend({posx: 230, posy: 40}, animations.weapons.corn))
		.end()
		;

	$("#ground").css("background-color", "brown");
	$("#levelLbl").append("Level").lettering();
	$("#level").append("0").lettering();
	$("#scoreboard").addClass("scoreboard");
	$("#subScoreboard").addClass("subScoreboard");
	var hud = $("#hud");

	/*  
	hud.append("<div id='scoreMessage'></div>");
	hud.append("<div id='message'></div>'");
	hud.append("<div id='level'></div>'");
	hud.append("<div id='levelNumber'></div>'");*/

	// Controls
	$.playground().registerCallback(Game.control, REFRESH_RATE);
	$.playground().registerCallback(Game.alienControl, REFRESH_RATE);
	
	// Collisions management
	$.playground().registerCallback(Game.heroShotCollision, REFRESH_RATE);
	$.playground().registerCallback(Game.alienShotCollision, REFRESH_RATE);
	
	// Refresh playground
	$.playground().registerCallback(function(){
		updateWeaponLoad(Game.ship.weapon.load / Game.ship.weapon.max_load);
		if( Game.running ) {
			Game.ship.move();
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
