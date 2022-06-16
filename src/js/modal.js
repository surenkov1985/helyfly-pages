import $ from 'jquery';

function testValue(elem, reg, string) {
	if ($(elem).attr("data-reg") === "true") {

		let str = $(elem).val();
		let errClass = ".err-" + $(elem).attr("Id");

		if (!str.length) {

			$(errClass).text("Заполните это поле");
			$(elem).addClass("error");
			$(elem).attr("data-test", "false");

		} else if (!reg.test(str)) {

			$(errClass).text(string);
			$(elem).addClass("error");
			$(elem).attr("data-test", "false");

		} else {

			$(elem).removeClass("error");
			$(elem).attr("data-test", "true");
			$(errClass).text("");
		};
	};
};

function testCardValue(elem, reg) {

	if ($(elem).attr("data-reg") === "true") {

		let str = $(elem).val();

		if (!str.length) {

			$(".err-card").text("Заполните это поле");
			$(elem).addClass("error");
			$(elem).attr("data-test", "false");

		} else if (!reg.test(str)) {

			$(".err-card").text("Введите валидные данные");
			$(elem).addClass("error");
			$(elem).attr("data-test", "false");

		} else {

			$(elem).removeClass("error");
			$(elem).attr("data-test", "true");
			$(".err-card").text("");
		};
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

	$(".header__button").on("click", function () {
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
		};
	});

	$(".modal__button").on("click", function (e) {

		e.preventDefault();

		$(".modal__block").removeClass("active");
		$(".modal__block-alert").addClass("active");
	});

	$(".modal__button-alert").on("click", function () {

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

				if ($(this).attr("data-test") === "true") {

					$(".modal__button").attr("disabled", false);

				} else {

					$(".modal__button").attr("disabled", true);
				}
			});

		} else {

			$(".modal__button").attr("disabled", true);
		};
	});

	$("#date").on("focus input keydown blur", function (e) {

		$(".calendar-modal").addClass("active");

		let valReg = /\D/g;
		let key = e.originalEvent.key;
		let str = formatValueInput(".date", valReg);
		let regexp = /\d{2}\.\d{2}\.\d{4}/;
		let testString = "Введите валидную дату";
		let mask = "__.__.____";
		let maskArr = "";



		if (str.length > 0) {

			maskArr += str.slice(0, 2);
		};

		if (str.length >= 2) {

			maskArr += "." + str.slice(2, 4);
		};

		if (str.length >= 4) {

			maskArr +=  "." + str.slice(4, 8);
		};

		$(this).val(maskArr + mask.slice(maskArr.length));

		testValue(".date", regexp, testString);

		e.target.selectionStart = maskArr.length;
		e.target.selectionEnd = maskArr.length;

		if (e.target.selectionEnd !== maskArr.length) {

			if (e.originalEvent.data && valReg.test(e.originalEvent.data)) {

				$(this).val(str);
			};
			return;

		} else {

			e.target.selectionStart = maskArr.length;
		};


		if (key === "Enter" || e.type === "blur") {
			e.preventDefault();

			$(this).attr("data-reg", "true");

			testValue(".date", regexp, testString);

			if (+maskArr.slice(0,2) > 31 || +maskArr.slice(3, 5) > 12 || +maskArr.slice(6) > 2030) {

				$(".err-date").text(testString);
				$(this).addClass("error");
				$(this).attr("data-test", "false");
			};

			if ($(this).attr("data-test") === "true") {

				$(".input")[$(".input").index(this) + 1].focus();
				$(".calendar-modal").removeClass("active");
			};
		};
	});

	$(".email").on("input keydown blur", function (e) {

		let key = e.originalEvent.key;
		let str = $(this).val();
		let regexp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		let testString = "Введите валидный email";

		$(this).val(str);

		testValue(".email", regexp, testString);

		if (key === "Enter" || e.type === "blur") {
			e.preventDefault();
			console.log(e)
			$(this).attr("data-reg", "true");

			testValue(".email", regexp, testString);

			if ($(this).attr("data-test") === "true") {

				$(".input")[$(".input").index(this) + 1].focus();
			};
		};
	});


	$(".name").on("input keydown blur", function (e) {

		let key = e.originalEvent.key;
		let str = formatValueInput(this, /^[\d\s.]+$/g);
		let regexp = /^[a-zа-яё]+$/i;
		let testString = "Введите валидное имя";

		$(this).val(str);
		testValue(".name", regexp, testString);

		if (key === "Enter" || e.type === "blur") {
			e.preventDefault();

			$(this).attr("data-reg", "true");

			testValue(".name", regexp, testString);

			if ($(this).attr("data-test") === "true") {

				$(".input")[$(".input").index(this) + 1].focus();
			};
		};
	});

	$(".surname").on("input keydown blur", function (e) {

		let key = e.originalEvent.key;
		let str = formatValueInput(this, /^[\d\s.]+$/g);
		let regexp = /[a-zа-яё]+/i;
		let testString = "Введите валидную фамилию";

		$(this).val(str);
		testValue(".surname", regexp, testString);

		if (key === "Enter" || e.type === "blur") {
			e.preventDefault();

			$(this).attr("data-reg", "true");

			testValue(".surname", regexp, testString);

			if ($(this).attr("data-test") === "true") {

				$(".input")[$(".input").index(this) + 1].focus();
			};
		};
	});

	$(".phone").on("input keydown blur", function (e) {

		let key = e.originalEvent.key;
		let testReg = /[(\+\d\s\(\d\d\d\)\s\d\d\d-\d\d-\d\d)(\d\s\(\d\d\d\)\s\d\d\d-\d\d-\d\d)]/gi;
		let valRegRu = /\D/gi;
		let valRegEur = /\+\d{15}/;
		let testString = "Введите валидный номер";

		let cursorPosition = e.target.selectionStart;
		let str = formatValueInput(".phone", valRegRu);
		let formatStr = "";

		let rusTel = ["7", "8", "9"];

		if (cursorPosition !== $(this).val().length) {

			if (e.originalEvent.data && valRegRu.test(e.originalEvent.data)) {

				$(this).val(str);
			};

			return;
		};

		if (rusTel.indexOf(str[0]) > -1) {

			if (str[0] === "7") formatStr = "+" + str[0];

			if (str[0] === "8") formatStr = str[0];

			if (str[0] === "9") formatStr = "+7" + str[0];

			if (str.length > 1) {

				formatStr += " (" + str.slice(1,4);
			};

			if (str.length >= 5) {

				formatStr += ") " + str.slice(4,7);
			};

			if (str.length >= 8) {

				formatStr += "-" + str.slice(7,9);
			};

			if (str.length >= 10) {

				formatStr += "-" + str.slice(9,11);
			};

			testValue(".phone", testReg, testString);

		} else {

			if (str.length >= 1) formatStr = "+" + str;

			testValue(".phone", valRegEur, testString);
		};

		$(this).val(formatStr);

		if (key === "Enter" || e.type === "blur") {
			e.preventDefault();

			$(this).attr("data-reg", "true");

			if (str[0] === 0 || str[0] < 7) testValue(".phone", valRegEur, testString);

			if (str[0] <= 9 && str[0] >= 7) testValue(".phone", testReg, testString);

			if (str.length < 10) {

				$(".err-phone").text(testString);
				$(this).addClass("error");
				$(this).attr("data-test", "false");
			};

			if ($(this).attr("data-test") === "true") {

				$(".input")[$(".input").index(this) + 1].focus();
			};
		};
	});

	$(".form__card-number").on("input keydown blur", function (e) {

		let key = e.originalEvent.key;
		let testReg = /\d{4}\s\d{4}\s\d{4}\s\d{4}/;
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
		};

		if (str.length >= 1) formatStr += str.slice(0, 4);
		if (str.length > 4) formatStr += " " + str.slice(4, 8);
		if (str.length > 8) formatStr += " " + str.slice(8, 12);
		if (str.length > 12) formatStr += " " + str.slice(12, 16);


		$(this).val(formatStr);

		testCardValue(".form__card-number", testReg);

		if (key === "Enter" || e.type === "blur") {
			e.preventDefault();

			$(this).attr("data-reg", "true");

			testCardValue(".form__card-number", testReg);

			if ($(this).attr("data-test") === "true") {

				$(".input")[$(".input").index(this) + 1].focus();
			};
		};
	});

	$(".form__card-date").on("input keydown blur", function (e) {

		let key = e.originalEvent.key;
		let valReg = /\D/gi;
		let testReg = /[01]\d\/\d\d/;

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

		testCardValue(".form__card-date", testReg);

		if (key === "Enter" || e.type === "blur") {
			e.preventDefault();

			$(this).attr("data-reg", "true");

			if (Number(formatStr.slice(0, 2)) > 12) {

				$(".err-card").text("Введите валидные данные");
				$(this).addClass("error");
				$(this).attr("data-test", "false");
			};

			testCardValue(".form__card-date", testReg);

			if ($(this).attr("data-test") === "true") {

				$(".input")[$(".input").index(this) + 1].focus();
			};
		};
	});

	$(".form__card-code").on("input keydown blur", function (e) {

		let key = e.originalEvent.key;
		let valReg = /\D/gi;
		let testReg = /\d{3}/;

		let str = formatValueInput(".form__card-code", valReg);
		$(this).val(str);

		testCardValue(".form__card-code", testReg);

		if (key === "Enter" || e.type === "blur") {
			e.preventDefault();

			$(this).attr("data-reg", "true");

			testCardValue(".form__card-code", testReg);

		};
	});

});