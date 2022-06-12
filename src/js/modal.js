import $ from 'jquery';

function testValue(elem, reg) {

	let str = $(elem).val();
	if (reg.test(str)) {

		$(elem).css("color", "green");
		$(elem).attr("data-test", true);
	} else {

		$(elem).css("color", "red");
		$(elem).attr("data-test", false);
	};
};

function formatValueInput(elem, regexp) {

	let str = $(elem).val().replace(regexp, "");

	return str;
};

$(document).ready(function () {

	/////////////////////////////////////////////////////
	////////             MODAL SCROLL              //////
	/////////////////////////////////////////////////////

	let scrollDocument = 0;

	$(".header__button").on("click", function (e) {
		$(".modal").addClass("active");

		scrollDocument = $(document).scrollTop();

		$("body").css({"overflow": "hidden"});
		$(document).scrollTop(scrollDocument);
		$(".modal__button").attr("disabled", "true");

	});

	$(".modal__close-icon").on("click", function () {
		$(".modal").removeClass("active");
		$(".calendar-modal").removeClass("active");

		$("body").css({"overflow": "inherit"});

		$(document).scrollTop(scrollDocument);

		$(".modal__form").find(".input").each(function () {

			$(this).val("");
			$(".check__box").prop("checked", false);
		});
	});
	$(".modal__scroll").on("click", function (e) {

		if ($(e.target).hasClass("modal__scroll")) {

			$(".modal").removeClass("active");
			$(".modal__block").addClass("active");
			$(".modal__block-alert").removeClass("active");
			$(".calendar-modal").removeClass("active");

			$("body").css({"overflow": "inherit"});
			$(document).scrollTop(scrollDocument);

			$(".modal__form").find(".input").each(function () {

				$(this).val("");
				$(".check__box").prop("checked", false);
			});
		}
	});

	$(".modal__button").on("click", function (e) {

		e.preventDefault();

		$(".modal__block").removeClass("active");
		$(".modal__block-alert").addClass("active");
	});

	$(".modal__button-alert").on("click", function (e) {

		$(".modal").removeClass("active");

		$("body").css({"overflow": "inherit"});

		$(document).scrollTop(scrollDocument);
		$(".modal__block").addClass("active");
		$(".modal__block-alert").removeClass("active");

		$(".modal__form").find(".input").each(function () {

			$(this).val("");
			$(".check__box").prop("checked", false);
		});

	});

	//////////////////////////////////////////
	/////         MODAL VALUES           /////
	//////////////////////////////////////////

	$(".check__box").on("click", function () {

		if ($(".check__box").prop("checked")) {

			$(".modal__form").find(".input").each(function () {

				if ($(this).attr("data-test")) {

					$(".modal__button").attr("disabled", false);
				} else {

					$(".modal__button").attr("disabled", true);
				}
			});
		} else {

			$(".modal__button").attr("disabled", true);
		}
	});

	$(".email").on("input", function () {

		let regexp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		testValue(".email", regexp);
	});


	$(".name").on("input", function () {

		let str = formatValueInput(this, /[\d\W\s[^а-я]]+/gi);
		let regexp = /([a-z]+)|([а-я]+)/i;

		$(this).val(str);
		testValue(".name", regexp);
	});

	$(".surname").on("input", function () {

		let str = formatValueInput(this, /[\d\W\s[^а-я]]+/gi);
		let regexp = /[a-z]+||[а-я]+/i;

		$(this).val(str);
		testValue(".surname", regexp);
	});



	$(".phone").on("input focus blur", function (e) {

		let testReg = /(\+\d\s\(\d{3}\)\s\d{3}\-\d{2}\-\d{2})|(\d\s\(\d{3}\)\s\d{3}\-\d{2}\-\d{2})/gi;
		let valRegRu = /\D/gi;
		let valRegEur = /\+\d{15}/;

		let cursorPosition = e.target.selectionStart;
		let str = formatValueInput(".phone", valRegRu);
		let formatStr = "";

		let rusTel = ["7", "8", "9"];

		if (!str.length) $(this).val("");

		if (cursorPosition !== $(this).val().length) {

			if (e.originalEvent.data && valRegRu.test(e.originalEvent.data)) {

				$(this).val(str);
			}
			return;
		}

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
			testValue(".phone", testReg);

		} else {

			if (str.length >= 1) formatStr = "+" + str;

			testValue(".phone", valRegEur);
		}

		$(this).val(formatStr);
	});

	$(".form__card-number").on("input blur", function (e) {

		let testReg = /\d{4}\s\d{4}\s\d{4}\s\d{4}/g;
		let valReg = /\D/gi;

		let cursorPosition = e.target.selectionStart;
		let str =  formatValueInput(".form__card-number", valReg);
		let formatStr = "";

		if (!str.length) $(this).val("");

		if (cursorPosition !== $(this).val().length) {

			if (e.originalEvent.data && valReg.test(e.originalEvent.data)) {

				$(this).val(str);
			}
			return;
		}

		if (str.length >= 1) formatStr += str.slice(0, 4);
		if (str.length > 4) formatStr += " " + str.slice(4, 8);
		if (str.length > 8) formatStr += " " + str.slice(8, 12);
		if (str.length > 12) formatStr += " " + str.slice(12, 16);


		$(this).val(formatStr);

		testValue(".form__card-number", testReg);
	});

	$(".form__card-date").on("input blur", function (e) {

		let valReg = /\D/gi;
		let testReg = /[01][0-2]\/\d\d/g;

		let cursorPosition = e.target.selectionStart;
		let str = formatValueInput(".form__card-date", valReg);
		let formatStr = "";


		if (!str.length) $(this).val("");

		if (cursorPosition !== $(this).val().length) {

			if (e.originalEvent.data && valReg.test(e.originalEvent.data)) {

				$(this).val(str);
			}
			return;
		}

		if (str.length >= 1) formatStr += str.slice(0, 2);
		if (str.length > 2) formatStr += "/" + str.slice(2, 4);

		$(this).val(formatStr);

		testValue(".form__card-date", testReg);
	});

	$(".form__card-code").on("input", function (e) {

		let valReg = /\D/gi;
		let testReg = /\d{3}/gi;

		let str = formatValueInput(".form__card-code", valReg);
		$(this).val(str);

		testValue(".form__card-code", testReg);
	})

});