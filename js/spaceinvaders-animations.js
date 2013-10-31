/*
 * Copyright (c) 2013 Fabrice ECAILLE aka Febbweiss
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

var 	ALIENS_WIDTH = 24,
	ALIENS_HEIGHT = 17,
	IMAGES_PREFIX = "images/",
	EXPLOSION_BIG = IMAGES_PREFIX + "explosion_big.png",
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
var WORLD = {
	farm : {
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
			corn : {
				animation : new $.gameQuery.Animation({
					imageURL : IMAGES_PREFIX + "farm.png",
					offsetx : 19,
					offsety : 37
				}),
				width: 19,
				height: 19
			},
			carot : {
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
	}
};

