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
