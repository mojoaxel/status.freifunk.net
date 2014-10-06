define(["Timeline"],
	function(Timeline) {

		Timeline.helper = {};

		/**
		 * {@link http://jsfiddle.net/jMeV3/6/}
		 */
		Timeline.helper.parseQueryString = function(queryString) {
			var params = {};
			if (queryString) {
				_.each(
					_.map(decodeURI(queryString).split(/&/g), function(el, i) {
						var aux = el.split('='),
							o = {};
						if (aux.length >= 1) {
							var val;
							if (aux.length === 2) {
								val = aux[1];
							}
							o[aux[0]] = val;
						}
						return o;
					}),
					function(o) {
						_.extend(params, o);
					}
				);
			}
			return params;
		};

		/**
		 * {@link https://api.jquery.com/jquery.param/}
		 */
		Timeline.helper.queryStringFromObject = function(obj) {
			var querytring = $.param(obj);
			return querytring;
		};

		return Timeline.helper;
	}
);
