/*
 * Copyright (c) 2013 Fabrice ECAILLE aka Febbweiss
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

(function($) {
	function injector(t, splitter, forceSmallParam) {
		var a = t.text().split(splitter);
		var html = "",
		clazz = "clock",
		letterSize = 32,
		count = 0,
		width = 0,
		height = 0,
		lineSize,
		letter, iLetter,
		i, x, y
		forceSmall = false;//forceSmallParam ? forceSmallParam : false;
		if( typeof customClazz != "undefined" ) {
			clazz = " clock " + customClazz;
		}
		if (a.length) {
			$(a).each(
				function(i, letter) {
					iLetter = (letter.charCodeAt(0) - 97);
					if( letter === " " ) {
						html += "<span class='blank'></span>";
						width += 16;
						count = count + 1;
					} else {
						if( letter.charCodeAt(0) > 47 && letter.charCodeAt(0) < 58 ) { // Numbers
							letterSize = 32;
							if( forceSmall ) {
								letterSize = 16;
							}
							html += "<span class='" + clazz + (forceSmall ? "small" : "") + "' style='top: -50%;background-position: -" + ( parseInt( letter, null ) * letterSize) + "px -" + (forceSmall ? 128 : 0) +"px'></span>";
							count = count + 1;
						} else { // Letters
							if( ( letter.charCodeAt(0) >= 'a'.charCodeAt(0) && letter.charCodeAt(0) <= 'z'.charCodeAt(0)) ) {
								if( height < 16 ) {
									height = 16;
								}
								width += 16;
								lineSize = 20;
								x = (iLetter % lineSize) * 16;
								y = Math.floor(iLetter / lineSize) * 16 + 144;
								html += "<span class='" + clazz + " small' style='background-position: -" + x + "px -" + y + "px'></span>";
								count = count + 1;
							} else {
								if( letter.charCodeAt(0) >= 'A'.charCodeAt(0) && letter.charCodeAt(0) <= 'Z'.charCodeAt(0)) {
									iLetter = letter.charCodeAt(0) - 'A'.charCodeAt(0);
									if( height < 32 ) {
										height = 32;
									}
									width += 32;
									lineSize = 10;
									x = (iLetter % lineSize) * 32;
									y = Math.floor(iLetter / lineSize) * 32 + 32;
									html += "<span class='" + clazz + "' style='background-position: -" + x + "px -" + y + "px'></span>";
									count = count + 1;
								}
							}
						}
					}
				});
			t.empty().append(html);
		}
	}
	
	$.fn.lettering = function() {
		return injector( $(this), '', 'char', '' ); // always pass an array
	};
})(jQuery);
