(function(global) {

	"use strict";

	var pattern = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;


	var response = {
		valid: [],
		invalid: []
	};

	var is = {
		string: function(data) {
			return (data.constructor === String);
		},
		boolean: function(data) {
			return (data.constructor === Boolean);
		},
		array: function(data) {
			return (data.constructor === Array);
		},
		object: function(data) {
			return (data.constructor === Object);
		},
		empty: function(data) {
			if (this.object(data)) {
				return (Object.keys(data).length === 0) ? true : false;
			} else if (this.array(data)) {
				return (data.length === 0) ? true : false;
			}
			return true;
		},
		email: function(data) {
			if (pattern.test(data)) {
				response.valid.push(data);
			} else {
				response.invalid.push(data);
			}
		}
	};

	// Main process
	global.CheckEmail = function(email, debug) {

		if (is.string(email)) {

			response.code = 100;
			is.email(email);

		} else if (is.array(email)) {

			response.code = 200;

			if (!is.empty(email)) {
				for (var k in email) {
					if (is.string(email[k])) {
						is.email(email[k]);
					} else {
					}
				}
			}

		} else {

			response.code = 300;

		}

		// Debug or not
		var debug = debug ? is.boolean(debug) ? debug : false : false;
		if (debug) console.error("[parnissolle/check-email] https://github.com/parnissolle/check-email#error-codes");

		return response;
	};

})(window);