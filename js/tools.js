function heriter(destination, source) { 
    function initClassIfNecessary(obj) { 
        if( typeof obj["_super"] == "undefined" ) { 
            obj["_super"] = function() { 
                var methodName = arguments[0]; 
                var parameters = arguments[1]; 
                return this["__parent_methods"][methodName].apply(this, parameters); 
            } 
        } 
     
        if( typeof obj["__parent_methods"] == "undefined" ) { 
            obj["__parent_methods"] = {};
        } 
    } 
 
    for (var element in source) { 
        if( typeof destination[element] != "undefined" ) { 
            initClassIfNecessary(destination); 
            destination["__parent_methods"][element] = source[element]; 
        } else { 
            destination[element] = source[element]; 
        } 
    } 
}

function distance(point1, point2) {
	return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
}

function normalize(vector) {
	var norm = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
	if (norm == 0)
		return {
			x : 0,
			y : 0
		};

	var x = vector.x / norm;
	var y = vector.y / norm;
	return {
		x : x,
		y : y
	}
}

function angle(vector1, vector2) {
	if ((vector1.x == 0 && vector1.y == 0)
			&& (vector1.x == 0 && vector1.y == 0)) {
		return 0;
	}

	if (vector1.x == 0 && vector1.y == 0) {
		return Math.acos(vector2.x
				/ Math.sqrt(vector2.x * vector2.x + vector2.y * vector2.y));
	}
	
	if (vector2.x == 0 && vector2.y == 0) {
		return Math.acos(vector1.x
				/ Math.sqrt(vector1.x * vector1.x + vector1.y * vector1.y));
	}
	
	var 	product = vector1.x * vector2.x + vector1.y * vector2.y,
		alpha = Math.acos(product
			/ (Math.sqrt(vector1.x * vector1.x + vector1.y * vector1.y) * Math
					.sqrt(vector2.x * vector2.x + vector2.y * vector2.y))),
		sign = normalize(vector1).y > normalize(vector2).y ? -1 : 1;
		
	return sign * alpha;
}


function getAliensMidHeight() {
	var higherAlien = Math.max.apply( null, 
		$(".alien").map(function() {
			return $(this).y();
		}).get() ),
		lowerAlien = Math.min.apply( null, 
		$(".alien").map(function() {
			return $(this).y();
		}).get() );
		
	return (higherAlien + lowerAlien) / 2;
}