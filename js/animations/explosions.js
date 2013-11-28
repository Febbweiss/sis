/*
 * Copyright (c) 2013 Fabrice ECAILLE aka Febbweiss
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

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
