var FARM_SPRITE = IMAGES_PREFIX + "farm.png",
	FARM_BACKGROUND_1 = IMAGES_PREFIX + "background.png",
	FARM_BACKGROUND_2 = IMAGES_PREFIX + "background2.png";

var WORLD = {
	farm : {
		hero : {
			ship : {
				animation : new $.gameQuery.Animation({
					imageURL : FARM_SPRITE
				}),
				width : 48,
				height : 24,
				posx : 0,
				posy : 17
			},
			/*cockpit : {
				animation : new $.gameQuery.Animation({
					imageURL : FARM_SPRITE,
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
					imageURL : FARM_SPRITE,
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
					imageURL : FARM_SPRITE,
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
				imageURL : FARM_SPRITE,
				offsetx : 14,
				offsety : 24
			}),
			width: 32,
			height: 16
		},
		weapons : {
			corn : {
				animation : new $.gameQuery.Animation({
					imageURL : FARM_SPRITE,
					offsetx : 19,
					offsety : 37
				}),
				width: 19,
				height: 19
			},
			carot : {
				animation : new $.gameQuery.Animation({
					imageURL : FARM_SPRITE,
					offsetx : 38,
					offsety : 37
				}),
				width: 19,
				height: 19
			},
			gun : {
				animation : new $.gameQuery.Animation({
					imageURL : FARM_SPRITE,
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
						imageURL : FARM_BACKGROUND_1
					})
				},
				background2 : {
					animation : new $.gQ.Animation({
						imageURL : FARM_BACKGROUND_2
					})
				}
			}
		}	
	}
};
