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
		.setAutoResize(true)
		.setWrapAround(true);

	// function for displaying recipe section
	var input = $('input#recipe');
	var recipe_container = $('div.recipe_wrapper');
	input.on('change', function() {
		if(this.checked) {
			recipe_container.addClass('visible');
		} else {
			recipe_container.removeClass('visible');
		}
	});
};


// connect document `load` event with handler function
$(Site.on_load);
