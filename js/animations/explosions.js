var	EXPLOSION_BIG = IMAGES_PREFIX + "explosion_big.png",
	EXPLOSION_BIG_RATE = 50,
	EXPLOSION_SMALL = IMAGES_PREFIX + "explosion_small.png",
	EXPLOSION_SMALL_RATE = 50;

var EXPLOSIONS = {
	BIG : [
		{
			animation : new $.gQ.Animation({
				imageURL : EXPLOSION_BIG,
				numberOfFrame : 8,
				delta : 128,
				rate : EXPLOSION_BIG_RATE,
				type : $.gQ.ANIMATION_HORIZONTAL | $.gQ.ANIMATION_CALLBACK
			}),
			width : 128,
			height: 128
		},
		{
			animation : new $.gQ.Animation({
				imageURL : EXPLOSION_BIG,
				offsety : 128,
				numberOfFrame : 8,
				delta : 128,
				rate : EXPLOSION_BIG_RATE,
				type : $.gQ.ANIMATION_HORIZONTAL | $.gQ.ANIMATION_CALLBACK
			}),
			width : 128,
			height: 128
		},
		{
			animation : new $.gQ.Animation({
				imageURL : EXPLOSION_BIG,
				offsety : 256,
				numberOfFrame : 8,
				delta : 128,
				rate : EXPLOSION_BIG_RATE,
				type : $.gQ.ANIMATION_HORIZONTAL | $.gQ.ANIMATION_CALLBACK
			}),
			width : 128,
			height: 128
		},
		{
			animation : new $.gQ.Animation({
				imageURL : EXPLOSION_BIG,
				offsety : 384,
				numberOfFrame : 8,
				delta : 128,
				rate : EXPLOSION_BIG_RATE,
				type : $.gQ.ANIMATION_HORIZONTAL | $.gQ.ANIMATION_CALLBACK
			}),
			width : 128,
			height: 128
		},
		{
			animation : new $.gQ.Animation({
				imageURL : EXPLOSION_BIG,
				offsety : 512,
				numberOfFrame : 8,
				delta : 128,
				rate : EXPLOSION_BIG_RATE,
				type : $.gQ.ANIMATION_HORIZONTAL | $.gQ.ANIMATION_CALLBACK
			}),
			width : 128,
			height: 128
		},
		{
			animation : new $.gQ.Animation({
				imageURL : EXPLOSION_BIG,
				offsety : 640,
				numberOfFrame : 8,
				delta : 128,
				rate : EXPLOSION_BIG_RATE,
				type : $.gQ.ANIMATION_HORIZONTAL | $.gQ.ANIMATION_CALLBACK
			}),
			width : 128,
			height: 128
		},
		{
			animation : new $.gQ.Animation({
				imageURL : EXPLOSION_BIG,
				offsety : 768,
				numberOfFrame : 8,
				delta : 128,
				rate : EXPLOSION_BIG_RATE,
				type : $.gQ.ANIMATION_HORIZONTAL | $.gQ.ANIMATION_CALLBACK | $.gQ.ANIMATION_ONCE
			}),
			width : 128,
			height: 128
		},
		{
			animation : new $.gQ.Animation({
				imageURL : EXPLOSION_BIG,
				offsety : 896,
				numberOfFrame : 8,
				delta : 128,
				rate : EXPLOSION_BIG_RATE,
				type : $.gQ.ANIMATION_HORIZONTAL | $.gQ.ANIMATION_CALLBACK | $.gQ.ANIMATION_ONCE
			}),
			width : 128,
			height: 128
		}
	],
	SMALL : [
		{
			animation : new $.gQ.Animation({
				imageURL : EXPLOSION_SMALL,
				numberOfFrame : 10,
				delta : 64,
				rate : EXPLOSION_SMALL_RATE,
				type : $.gQ.ANIMATION_HORIZONTAL | $.gQ.ANIMATION_CALLBACK  | $.gQ.ANIMATION_ONCE
			}),
			width : 64,
			height: 64
		}
	]
}
