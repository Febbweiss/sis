/*
 * Copyright (c) 2013 Fabrice ECAILLE aka Febbweiss
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/*** Move ***/

var MOVE = {
	translation : {
		init : function (x, y) {
			return {directionX : 1, directionY : 0};
		},
		move : function() {
			var offset = (PLAYGROUND_WIDTH - 16 * this.width) / 2;
			if (Math.abs((this.getOriginX() - this.getX())) >= offset) {
				this.directionX *= -1;
				this.y = (this.y + this.height / 4);
			}
		},
	},
	mirror : {
		init : function(x, y) {
			if( x < PLAYGROUND_WIDTH / 2 ) {
				return {directionX: -1, directionY: 0};
			}
			return {directionX: 1, directionY: 0};
		},
		move : function() {
			var offset =  this.width / 2;
			if (Math.abs((this.getOriginX() - this.getX())) >= offset) {
				this.directionX *= -1;
				this.y = (this.y + this.height / 4);
			}
		},
	},
	half_part_rotation : {
		init : function (x, y) {
			return {directionX:0, directionY:0};
		},
		move : function () {
			var 	_this = $(this)[0],
				mid = PLAYGROUND_WIDTH / 2,
				center = _this.center, 
				width = _this.width;

			if( this.directionX == 0 && this.directionY == 0 ) {
				center = {x: ( this.getOriginX() < mid ? PLAYGROUND_WIDTH / 4 : 3 * PLAYGROUND_WIDTH / 4), y: getAliensMidHeight() };
				width = distance(center, {x: this.x, y: this.y});
				var	xAxis = {x: width, y: 0}, 
					current = {x: center.x - this.getOriginX(), y: center.y - this.getOriginY()},
					alpha = angle( xAxis, current );
				this.directionX = 0.01;
				this.directionY = alpha;
				$(this)[0].center = center;
				$(this)[0].width = width;
			}
				
			if( this.getOriginX() < mid ) {
				this.directionY = this.directionY + this.directionX;
			} else {
				this.directionY = this.directionY - this.directionX;
			}
			if( Math.abs(this.directionY) > 2 * Math.PI ) {
				this.directionY = 0;
			}
			center.y = center.y + 0.1;
			_this.center = center;
			this.x = center.x + width * Math.cos(this.directionY);
			this.y = center.y + width * Math.sin(this.directionY);
		}
	},

	rotation : {
		init : function (x, y) {
			return {directionX:0, directionY:0};
		},
		move : function () {
			var 	_this = $(this)[0],
				mid = PLAYGROUND_WIDTH / 2,
				center = _this.center, 
				width = _this.width;

			if( this.directionX == 0 && this.directionY == 0 ) {
				center = {x: mid, y: getAliensMidHeight() };
				width = distance(center, {x: this.x, y: this.y});
				var	xAxis = {x: width, y: 0}, 
					current = {x: center.x - this.getOriginX(), y: center.y - this.getOriginY()},
					alpha = angle( xAxis, current );
				this.directionX = 0.01;
				this.directionY = alpha;
				$(this)[0].center = center;
				$(this)[0].width = width;
			}
				
			this.directionY = this.directionY - this.directionX;
			if( Math.abs(this.directionY) > 2 * Math.PI ) {
				this.directionY = 0;
			}
			center.y = center.y + 0.1;
			_this.center = center;
			this.x = center.x + width * Math.cos(this.directionY);
			this.y = center.y + width * Math.sin(this.directionY);
		}
	},
	
	sinusoid : {
		init : function (x, y) {
			return {directionX : 1, directionY : 1};
		},
		move : function () {
			var offset = this.width / 2;
			if (Math.abs((this.getOriginX() - this.getX())) >= offset) {
				this.directionX *= -1;
			}
			
			if( Math.abs(this.getOriginY() - this.getY()) >= 3 * this.height ) {
				this.directionY *= -1;
			}
		}
	}
};

/*** Move - end ***/


/*** Waves ***/

var WAVES = [
		{
			wave : [ 
				 [ ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1 ],
				 [ ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1 ],
				 [ ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1 ],
				 [ ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1 ],
				 [ ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1 ]
			],
			move : MOVE.translation,
			bonus : [40, 20]
		},
		{
			wave : [ [ ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, undefined, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1 ], 
				 [ ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, undefined, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1 ],
				 [ ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, undefined, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1 ],
				 [ ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, undefined, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1 ],
				 [ ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, undefined, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1 ] 
			],
			move : MOVE.mirror,
			bonus : [30, 15]
		}, 
		{
			wave : [ [ undefined, undefined, ALIENS.alien1, undefined, undefined, undefined, undefined, undefined, ALIENS.alien1, undefined, undefined ],
				 [ undefined, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, undefined, undefined, undefined, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, undefined ],
				 [ ALIENS.alien1, ALIENS.alien1, undefined, ALIENS.alien1, ALIENS.alien1, undefined, ALIENS.alien1, ALIENS.alien1, undefined, ALIENS.alien1, ALIENS.alien1 ],
				 [ undefined, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, undefined, undefined, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, undefined ],
				 [ undefined, undefined, ALIENS.alien1, undefined, undefined, undefined, undefined, undefined, ALIENS.alien1, undefined, undefined ]
			],
			move : MOVE.half_part_rotation,
			bonus : [20, 10]
		},
		{
			wave : [ 
				[ undefined, undefined, undefined, undefined, ALIENS.alien1, undefined, undefined, undefined, undefined ],
				[ undefined, undefined, undefined, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, undefined, undefined, undefined ],
				[ undefined, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, undefined, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, undefined ],
				[ undefined, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, undefined, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, undefined ],
				[ ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, undefined, undefined, undefined, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1 ],
				[ undefined, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, undefined, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, undefined ],
				[ undefined, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, undefined, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, undefined ],
				[ undefined, undefined, undefined, ALIENS.alien1, ALIENS.alien1, ALIENS.alien1, undefined, undefined, undefined ],
				[ undefined, undefined, undefined, undefined, ALIENS.alien1, undefined, undefined, undefined, undefined ]
			],
			move : MOVE.rotation,
			bonus : [25, 12]
		}
	];


/*** Waves - end ***/
