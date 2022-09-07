;(function($){
	"use strict";

	$(document).ready(function() {

		/*
		Find the Latitude and Longitude of your address:
			- http://itouchmap.com/latlong.html
			- http://universimmedia.pagesperso-orange.fr/geo/loc.htm
			- http://www.findlatitudeandlongitude.com/find-address-from-latitude-and-longitude/

		Find settings explained:
			- https://github.com/marioestrada/jQuery-gMap

		*/

		// Map Markers
		var mapMarkers = [{
			address: "735 Plaza Blvd, Suite 210, Coppell, TX 75019, USA",
			latitude: 32.9873244,
			longitude: -96.9924894,
			icon: {
				image: "https://cdn.jsdelivr.net/gh/BoodskapPlatform/cdn/web/images/map-marker.png",
				iconsize: [32, 39], // w, h
				iconanchor: [13,39] // x, y
			},
			// html: '<h4>Boodskap Inc.,</span></h4>',
		},{
			address: "#6 Sri Ramulu Street, Saligramam, Chennai 600093, India",
			latitude: 13.0493625,
			longitude: 80.201923,
			icon: {
				image: "https://cdn.jsdelivr.net/gh/BoodskapPlatform/cdn/web/images/map-marker.png",
				iconsize: [32, 39], // w, h
				iconanchor: [13, 39] // x, y
			},
			// html: '<h4>Boodskap Labs Pvt Ltd.,</span></h4>',
		}];

		var mapStyles = [
			{
				"featureType": "all",
				"elementType": "geometry.fill",
				"stylers": [
					{
						"weight": "2.00"
					}
				]
			},
			{
				"featureType": "all",
				"elementType": "geometry.stroke",
				"stylers": [
					{
						"color": "#9c9c9c"
					}
				]
			},
			{
				"featureType": "all",
				"elementType": "labels.text",
				"stylers": [
					{
						"visibility": "on"
					}
				]
			},
			{
				"featureType": "landscape",
				"elementType": "all",
				"stylers": [
					{
						"color": "#f2f2f2"
					}
				]
			},
			{
				"featureType": "landscape",
				"elementType": "geometry.fill",
				"stylers": [
					{
						"color": "#ffffff"
					}
				]
			},
			{
				"featureType": "landscape.man_made",
				"elementType": "geometry.fill",
				"stylers": [
					{
						"color": "#ffffff"
					}
				]
			},
			{
				"featureType": "poi",
				"elementType": "all",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "road",
				"elementType": "all",
				"stylers": [
					{
						"saturation": -100
					},
					{
						"lightness": 45
					}
				]
			},
			{
				"featureType": "road",
				"elementType": "geometry.fill",
				"stylers": [
					{
						"color": "#eeeeee"
					}
				]
			},
			{
				"featureType": "road",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#7b7b7b"
					}
				]
			},
			{
				"featureType": "road",
				"elementType": "labels.text.stroke",
				"stylers": [
					{
						"color": "#ffffff"
					}
				]
			},
			{
				"featureType": "road.highway",
				"elementType": "all",
				"stylers": [
					{
						"visibility": "simplified"
					}
				]
			},
			{
				"featureType": "road.arterial",
				"elementType": "labels.icon",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "transit",
				"elementType": "all",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "water",
				"elementType": "all",
				"stylers": [
					{
						"color": "#46bcec"
					},
					{
						"visibility": "on"
					}
				]
			},
			{
				"featureType": "water",
				"elementType": "geometry.fill",
				"stylers": [
					{
						"color": "#c8d7d4"
					}
				]
			},
			{
				"featureType": "water",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#070707"
					}
				]
			},
			{
				"featureType": "water",
				"elementType": "labels.text.stroke",
				"stylers": [
					{
						"color": "#ffffff"
					}
				]
			}
		]

		// Map Initial Location
		var initLatitude = 0;
		var initLongitude = 0;

		// Map Extended Settings
		var map = jQuery(".th-google_map").gMap({
			controls: {
				panControl: false,
				zoomControl: false,
				zoomControlOptions: {
					position: google.maps.ControlPosition.RIGHT_CENTER
				},
				mapTypeControl: false,
				scaleControl: false,
				streetViewControl: true,
				streetViewControlOptions: {
					position: google.maps.ControlPosition.RIGHT_CENTER
				},
				overviewMapControl: true
			},
			scrollwheel: false,
			markers: mapMarkers,
			latitude: initLatitude,
			longitude: initLongitude,
			zoom: 2,
			style: mapStyles,
			draggable: Modernizr.touch ? false : true

		});
	});// end of document ready

})(jQuery);


