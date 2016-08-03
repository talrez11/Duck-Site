/**
 * Main JavaScript
 * Site Name
 *
 * Copyright (c) 2015. by Way2CU, http://way2cu.com
 * Authors:
 */

// create or use existing site scope
var Site = Site || {};

// make sure variable cache exists
Site.variable_cache = Site.variable_cache || {};


/**
 * Check if site is being displayed on mobile.
 * @return boolean
 */
Site.is_mobile = function() {
	var result = false;

	// check for cached value
	if ('mobile_version' in Site.variable_cache) {
		result = Site.variable_cache['mobile_version'];

	} else {
		// detect if site is mobile
		var elements = document.getElementsByName('viewport');

		// check all tags and find `meta`
		for (var i=0, count=elements.length; i<count; i++) {
			var tag = elements[i];

			if (tag.tagName == 'META') {
				result = true;
				break;
			}
		}

		// cache value so next time we are faster
		Site.variable_cache['mobile_version'] = result;
	}

	return result;
};

/**
 * Function called when document and images have been completely loaded.
 */
Site.on_load = function() {
	if (Site.is_mobile())
		Site.mobile_menu = new Caracal.MobileMenu();

	//Scroll Function
	$('a[href*="#"]').bind('click', function(e) {
		e.preventDefault(); //prevent the "normal" behaviour which would be a "hard" jump

		var target = $(this).attr("href"); //Get the target

	// perform animated scrolling by getting top-position of target-element and set it as scroll target
		$('html, body').stop().animate({ scrollTop: $(target).offset().top - 170 }, 1000, function() {
		     // location.hash = target;  //attach the hash (#jumptarget) to the pageurl
		});

		return false;
	   });

	// create page control for video gallery
	Site.video_slider = new PageControl('div.video_container', 'div.video');
	Site.video_slider
		.attachPreviousControl($('a.previous_video'))
		.attachNextControl($('a.next_video'))
		.setWrapAround(true);

	if(Site.is_mobile()) {
		Site.video_mobile_slider = new PageControl('div.video_container', 'a.youtube.mobile');
		Site.video_mobile_slider
			.attachPreviousControl($('a.previous_video'))
			.attachNextControl($('a.next_video'))
			.setWrapAround(true);
	}

	// create page control for testimonials 
	Site.testimonial_slider = new PageControl('div.testimonial_container', 'article.testimonial');
	Site.testimonial_slider
		.attachPreviousControl($('a.previous_testimonial'))
		.attachNextControl($('a.next_testimonial'))
		.setInterval(8000)
		.setWrapAround(true);

	// function for displaying recipe section
	var input = $('input#recipe');
	var recipe_container = $('section#recipes');
	input.on('change', function() {
		if(this.checked) {
			recipe_container.addClass('visible');
		} else {
			recipe_container.removeClass('visible');
		}
	});

	if($('div#map').length > 0) {
	// Google maps
		var locations = [
		    ['ראשון לציון, ברשבסקי 33 א.ת. ישן', 31.9743357,34.8072087],
		    ['אשדוד,קניון עד הלום', 31.7931702,34.6536022],
		    ['קריית אליעזר,ת"א 11, חיפה', 32.8272847,34.9793037,17],
		    ['נתניה זנגביל,זנגביל 13', 31.9557133,34.9998731,11],
		    ['נתניה פולג,המלאכה 28 א.ת. פולג', 32.2790095,34.8393929,15],
		    ['חדרה,דוד אליעזר 27', 32.4403779,34.9081889,17],
		    ['נשר,הזית 1', 32.7734104,35.0366532,17],
		    ['יוקנעם,הירדן 64', 32.6553668,35.0708915,14],
		    ['חיפה,שבתאי לוי 21-23', 32.8143037,34.9912641,17],
		    ['כרמיאל,הכבאי 1', 32.9230328,35.3027093,17],
		    ['נהריה,סניף לוחמי הגטאות 9', 33.0010689,35.0948677,17],
		    ['נצרת עלית,עמל 1', 32.7033148,35.3206897,17],
		    ['קריית חיים,האיצטדיון 25', 32.8225287,35.0555778,17],
		    ['ישפרו סנטר, רמי לוי', 31.886859, 34.961173],
		    ['רעננה, רמי לוי', 32.194728, 34.881289],
		    ['נתניה-האיצטדיון 2, רמי לוי', 32.292698, 34.862507],
		    ['שילת ,רמי לוי', 31.915897, 35.024321],
		    ['ביג פרדס חנה רמי לוי', 32.488757, 34.970667],
		    ['חיפה רמי לוי', 32.818698, 35.053668],
		    ['ברווז הבית', 33.032694, 35.103468],
		    ['ברווז הבית', 32.896791, 35.091924],
		    ['ברווז הבית',31.818570, 34.661894],
		    ['ברווז הבית',31.245829, 34.800607],
		    ['ברווז הבית',31.221741, 34.803323],
		    ['ברווז הבית',32.017289, 34.807196],
		    ['ברווז הבית',31.922007, 34.793397],
		    ['ברווז הבית',32.284401, 34.860514],
		    ['ברווז הבית',32.100978, 34.894838],
		    ['ברווז הבית',31.667586, 34.569372],
		    ['ברווז הבית',31.669897, 34.599748],
		    ['ברווז הבית',31.865020, 35.176687],
		    ['ברווז הבית',32.007097, 34.803698],
		    ['ברווז הבית',32.198095, 34.890273],
		    ['ברווז הבית',32.176305, 34.934395],
		    ['ברווז הבית',31.797983, 34.648851],
		    ['ברווז הבית',31.888915, 34.962206],
		    ['ברווז הבית',31.604033, 34.774416],
		    ['ברווז הבית',31.892425, 34.788889],
		    ['ברווז הבית',31.817949, 35.194383],
		    ['ברווז הבית',32.501992, 34.926831],
		    ['ברווז הבית',32.102862, 34.836369],
		    ['ברווז הבית',32.103410, 35.172223],
		    ['ברווז הבית',31.675467, 34.605552],
		    ['ברווז הבית',31.861228, 34.817641],
		    ['ברווז הבית',31.756376, 34.989668],
		    ['ברווז הבית',32.253544, 34.917826],
		    ['ברווז הבית',31.687912, 34.579017],
		    ['ברווז הבית',32.028920, 34.745061],
		    ['ברווז הבית',32.008873, 34.746529],
		    ['ברווז הבית',32.012587, 34.779358],
		    ['ברווז הבית',32.146276, 34.804363],
		    ['ברווז הבית',31.731938, 35.187361],
		    ['ברווז הבית',32.789756, 35.007822],
		    ['ברווז הבית',32.323718, 34.872057],
		    ['ברווז הבית',31.793642, 34.640556],
		    ['ברווז הבית',32.160367, 34.808153],
		    ['ברווז הבית',32.074609, 34.791799],
		    ['ברווז הבית',32.569318, 34.955133],
		    ['ברווז הבית',31.887744, 34.731079]
		  ];

		var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 9,
		scrollwheel: false,
		center: new google.maps.LatLng(32.2790095,34.8393929,15),
		mapTypeId: google.maps.MapTypeId.ROADMAP
		});

		var infowindow = new google.maps.InfoWindow();
		var base_url = window.location.origin;
		var custom_icon = base_url + "/site/images/map-pin.png";
		var marker, i;

		for (i = 0; i < locations.length; i++) {  
			marker = new google.maps.Marker({
			position: new google.maps.LatLng(locations[i][1], locations[i][2]),
			map: map,
			icon:custom_icon
		});

		google.maps.event.addListener(marker, 'click', (function(marker, i) {
			return function() {
			infowindow.setContent(locations[i][0]);
			infowindow.open(map, marker);
		  }
		})(marker, i));
		}
	}

};


// connect document `load` event with handler function
$(Site.on_load);
