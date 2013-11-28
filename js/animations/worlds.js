/*
 * Copyright (c) 2013 Fabrice ECAILLE aka Febbweiss
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

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
