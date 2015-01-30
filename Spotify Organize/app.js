(function(){
	'use strict';

	var app = angular.module('SpotifyOrganizer', ['ui.bootstrap']);

	app.controller('organizeController', function() {
		$(".gridster ul").gridster({
			widget_margins: [10, 10],
			widget_base_dimensions: [390, 96],
		});
	});
}());