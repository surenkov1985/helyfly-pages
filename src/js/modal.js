import $ from 'jquery'

$(document).ready(function () {

	/////////////////////////////////////////////////////
	////////             MODAL SCROLL              //////
	/////////////////////////////////////////////////////

	let scrollDocument = 0;

	$(".header__button").on("click", function (e) {
		$(".modal").css("display", "flex");

		scrollDocument = $(document).scrollTop();

		console.log(e, scrollDocument)

		$("body").css({"overflow": "hidden"});
		$(document).scrollTop(scrollDocument);

	});

	$(".modal__close-icon").on("click", function () {
		$(".modal").css("display", "none");

		$("body").css({"overflow": "inherit"});

		$(document).scrollTop(scrollDocument);



	});
	$(".modal__scroll").on("click", function (e) {

		if ($(e.target).hasClass("modal__scroll")) {

			$(".modal").css("display", "none");

			$("body").css({"overflow": "inherit"});
			$(document).scrollTop(scrollDocument);
		}
	});

	//////////////////////////////////////////
	/////         MODAL VALUES           /////
	//////////////////////////////////////////

	$(".header__button").on("click", function (e) {

		$(".modal__form").find(".input").each(function () {

			if (!$(this).html().length && !$(".check__box").prop("checked")) {

				$(".modal__button").attr("disabled", "true");

				console.log($(".check__box").prop("checked"))
			} else {

				$(".modal__button").attr("disabled", "false");
			}
		});
	});
});