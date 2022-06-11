import $ from 'jquery';

function testValue(elem, reg) {

	let str = $(elem).val();
	let test = reg.test(str);
	let textColor = test ? "green" : "red";

	$(elem).css("color", textColor);
}

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

	$(".email").on("input", function () {

		let regexp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		testValue(".email", regexp);
	});


	$(".name").on("input", function () {

		let regexp = /[a-z]+||[а-я]+/i

		testValue(".name", regexp);
	});

	$(".surname").on("input", function () {

		let regexp = /[a-z]+||[а-я]+/i

		testValue(".surname", regexp);
	});

	// let str = "+7 (XXX) XXX-XX-XX";
	// let arr = ["-", "-", ") "];
	// let num = 0;

	$(".phone").on("input focus blur", function (e) {

		let letter = e.originalEvent.data;
		let regexp = /\D/gi;
		let str = $(this).val().replace(regexp, "");
		let formatStr = "";

		let rusTel = ["7", "8", "9"];

		if (e.type === "blur"){

			str = "";
			$(this).val(str);
		};

		if (!str.length) $(this).val("");

		// $(this).val(str);

		if (rusTel.indexOf(str[0]) > -1) {

			if (str[0] === "7") formatStr = "+" + str[0];

			if (str[0] === "8") formatStr = str[0];

			if (str[0] === "9") formatStr = "+7" + str[0];

			if (str.length > 1) {

				formatStr += " (" + str.slice(1,4);
			}

			if (str.length >= 5) {

				formatStr += ") " + str.slice(4,7);
			}

			if (str.length >= 8) {

				formatStr += "-" + str.slice(7,9);
			}

			if (str.length >= 10) {

				formatStr += "-" + str.slice(9,11);
			}

		} else {

			if (str.length >= 1) formatStr = "+" + str;
		}

		$(this).val(formatStr);

		console.log(e.target.selectionStart)
	});



});