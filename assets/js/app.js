$( document ).ready( function() {

	// Mobile Nav
	$( ".js--nav-icon" ).click( function() {
		
		var nav = $( ".js--main-nav" );
		var icon = $( ".js--nav-icon i" );

		// Open and close the box:
		nav.slideToggle( 200 );

		if ( icon.hasClass( "ion-navicon-round" )) {
			icon.addClass( "ion-close-round" );
			icon.removeClass( "ion-navicon-round" );
		} else {
			icon.addClass( "ion-navicon-round" );
			icon.removeClass( "ion-close-round" );
		}
		
	});

} );