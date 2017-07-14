$( document ).ready( function() {

	$( ".js--t1" ).waypoint( function( direction ) {
			$( ".js--t1" ).addClass( "animated-1 fadeIn" );
		}, {
			offset: "50%"
		});

	$( ".js--t2" ).waypoint( function( direction ) {
			$( ".js--t2" ).addClass( "animated-1-and-half fadeIn" );
		}, {
			offset: "50%"
		});

	$( ".js--t3" ).waypoint( function( direction ) {
			$( ".js--t3" ).addClass( "animated-2 fadeIn" );
		}, {
			offset: "50%"
		});

} );