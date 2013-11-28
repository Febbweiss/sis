/*
 * Copyright (c) 2013 Fabrice ECAILLE aka Febbweiss
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

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


