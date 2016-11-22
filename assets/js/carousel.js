// alert("Carousel.js is linked!");

$(document).ready(function(){

	$('.single-item').slick();

	$('.autoplay').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 5000,
	});

	// $('.wallpaper').slick({
	// 	setting-name: setting-value
	// 	infinite: true,
	// 	slidesToShow: 1,
	// 	slidesToScroll: 2
	// });

	// $('.multiple-items').slick({
	// 	infinite: true,
	// 	slidesToShow: 3,
	// 	slidesToScroll: 3
	// });

});

// autoplay
// boolean
// false
// Enables Autoplay

// --

// autoplaySpeed
// int(ms)
// 3000
// Autoplay Speed in milliseconds

// --

// arrows
// boolean
// true
// Prev/Next Arrows