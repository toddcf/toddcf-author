$( document ).ready( function() {

	$( ".js--t1" ).waypoint( function( direction ) {
			$( ".js--t1" ).addClass( "fadeIn" );
		}, {
			offset: "75%"
		});

	$( ".js--t2" ).waypoint( function( direction ) {
			$( ".js--t2" ).addClass( "fadeIn" );
		}, {
			offset: "75%"
		});

	$( ".js--t3" ).waypoint( function( direction ) {
			$( ".js--t3" ).addClass( "fadeIn" );
		}, {
			offset: "75%"
		});

} );