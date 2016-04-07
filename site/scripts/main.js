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

	// create page control for video gallery
	Site.video_slider = new PageControl('div.video_container', 'div.video');
	Site.video_slider
		.attachPreviousControl($('a.previous_video'))
		.attachNextControl($('a.next_video'))
		.setWrapAround(true);

	// create page control for recipes 
	Site.recipe_slider = new PageControl('div.recipe_wrapper', 'article.recipe');
	Site.recipe_slider
		.attachPreviousControl($('a.previous_recipe'))
		.attachNextControl($('a.next_recipe'))
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
	    ['קריית חיים,האיצטדיון 25', 32.8225287,35.0555778,17]
	  ];

	var map = new google.maps.Map(document.getElementById('map'), {
	zoom: 8,
	center: new google.maps.LatLng(31.9743357,34.8072087),
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

};


// connect document `load` event with handler function
$(Site.on_load);
