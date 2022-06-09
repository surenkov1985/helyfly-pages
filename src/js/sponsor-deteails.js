import $ from 'jquery'

$(document).ready(function () {

	//////////////////////////////////////////
////      Show Sponsor Details       /////
//////////////////////////////////////////

	$(".sponsor__button").on("click", function () {

		if ($(this).hasClass("about")) {

			$(".sponsor__about-details").addClass("active");
			$(this).parent().removeClass("active");
			$(".sponsor__about-close").addClass("active");
		};

		if ($(this).hasClass("represent")) {

			$(".sponsor__represent-details").addClass("active");
			$(this).parent().removeClass("active");
			$(".sponsor__represent-close").addClass("active");
		};
	});

	$(".sponsor__close-button").on("click", function () {

		if ($(this).hasClass("about")) {

			$(".sponsor__about-details").removeClass("active");
			$(this).parent().removeClass("active");
			$(".sponsor__button.about").parent().addClass("active");
		};

		if ($(this).hasClass("represent")) {

			$(".sponsor__represent-details").removeClass("active");
			$(this).parent().removeClass("active");
			$(".sponsor__button.represent").parent().addClass("active");
		};
	});
});