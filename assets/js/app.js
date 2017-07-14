$( document ).ready( function() {

	$( ".js--t1" ).waypoint( function( direction ) {
			$( ".js--wp-1" ).addClass( "animated-1 fadeIn" );
		}, {
			offset: "50%"
		});

	$( ".js--t2" ).waypoint( function( direction ) {
			$( ".js--wp-1" ).addClass( "animated-1-and-half fadeIn" );
		}, {
			offset: "50%"
		});

	$( ".js--t1" ).waypoint( function( direction ) {
			$( ".js--wp-1" ).addClass( "animated-2 fadeIn" );
		}, {
			offset: "50%"
		});

} );