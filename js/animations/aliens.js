var 	ALIENS_WIDTH = 25,
	ALIENS_WIDTH_2 = 18,
	ALIENS_HEIGHT = 17,
	ALIENS_SPRITE = IMAGES_PREFIX + "invader.png",
	ALIENS_RATE = 400;

var ALIENS_TYPE = [
	{
		animation : new $.gQ.Animation({
			imageURL : ALIENS_SPRITE,
			numberOfFrame : 2,
			delta : 24,
			rate : ALIENS_RATE,
			type : $.gQ.ANIMATION_HORIZONTAL
		}),
		width : 24,
		height: 18
	},
	{
		animation : new $.gQ.Animation({
			imageURL : ALIENS_SPRITE,
			numberOfFrame : 2,
			delta : ALIENS_WIDTH_2,
			offsety : 20,
			rate : ALIENS_RATE,
			type : $.gQ.ANIMATION_HORIZONTAL
		}),
		width : ALIENS_WIDTH_2,
		height: 17
	},
	{
		animation : new $.gQ.Animation({
			imageURL : ALIENS_SPRITE,
			numberOfFrame : 2,
			delta : ALIENS_WIDTH,
			offsety : 40,
			rate : ALIENS_RATE,
			type : $.gQ.ANIMATION_HORIZONTAL
		}),
		width : ALIENS_WIDTH,
		height: 18
	}
]


