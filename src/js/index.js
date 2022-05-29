// Main js file
// see more: https://github.com/vedees/webpack-template/blob/master/README.md#import-js-files
import jquery from 'jquery';
import $ from 'jquery';

$(document).ready(function () {

	$(".header__button").on("click", function (e) {
		console.log(this)
	})

});

