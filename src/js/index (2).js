// Main js file
// see more: https://github.com/vedees/webpack-template/blob/master/README.md#import-js-files
import jquery from 'jquery';
import $ from 'jquery';
// import ymaps from 'ymaps';

$(document).ready(function () {

	// $(document).on("click", function (e) {
	// 	let el = e.target;
	//
	// 	console.log($(el).attr("class"));
	// });

	//////////////////////////////////////////////
	////////           Calendar           ////////
	//////////////////////////////////////////////

	const dateArrays = {
		"prevMonth": [],
		"actualMonth": [],
		"nextMonth": []
	};

	function setDateArrays(year = new Date().getFullYear(), month = new Date().getMonth()) {

		let datePickArr;

		let lastDate = new Date(year, month + 1, 0);
		let firstDay = new Date(year, month, 1).getDay();
		let sumDate = lastDate.getDate();
		let numDay = 0;


		if (firstDay === 0) {
			numDay = 7 - firstDay - 1;
		} else if (firstDay > 1) {
			numDay = firstDay - 1;
		}

		for (let i = 0; i < numDay; i++) {
			dateArrays.prevMonth.unshift(new Date(year, month, 0 - i).getDate());
		}

		for (let i = 0; i < +sumDate; i++){
			dateArrays.actualMonth.push(i+1);
		}

		if (lastDate.getDay() > 0) {
			numDay = 7 - lastDate.getDay();
		}

		for (let i = 0; i < numDay; i++) {
			dateArrays.nextMonth.push(i + 1);
		}

	}

	function getDatePicker() {
		const weekDays = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Черверг", "Пятница", "Суббота"];
		const mounts = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
		let year = new Date().getFullYear();
		let month = new Date().getMonth();
		let getMount = mounts[month];
		let todayWeekDay = weekDays[new Date().getDay()];
		let getDay = new Date().getDate();

		$(".day").text(todayWeekDay + ", ");
		$(".date").text(getDay + " ");
		$(".month").text(getMount);


		setDateArrays(year, month);
	}

	function buildDatePicker(obj) {
		for (let key in obj) {
			for (let i = 0; i < obj[key].length; i++) {
				$(".days__list").append(`<li class=${key}>${obj[key][i]}</li>`);
				$(`.${key}`).addClass("days__item");
			}
		}
	}

	getDatePicker();
	buildDatePicker(dateArrays);

	$(".entry__picker-icon").on("click", function (event) {
		event.stopPropagation();

		$(".calendar-entry").toggleClass("active");
	});

	$(".entry__day").on("click", function (event) {
		event.stopPropagation();

		$(".calendar-entry").toggleClass("active");
	});

	$(".calendar-icon").on("click", function (event) {
		event.stopPropagation();

		$(".calendar-modal").toggleClass("active");
	});

	/////////////////////////////////////////////////////
	////////                MODAL                  //////
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
	////            YOUTUBE              /////
	//////////////////////////////////////////

	$(".fotoshoot__img").on("click", function () {

		$(".fotoshoot__img").removeClass("active");
		$(".fotoshoot__player").addClass("active");

		$('.fotoshoot__video').each(function(){
			this.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
		});
	});

	$(".fotoshoot__close").on("click", function () {

		$('.fotoshoot__video').each(function(){
			this.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
		});

		$(".fotoshoot__img").addClass("active");
		$(".fotoshoot__player").removeClass("active");
	});



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

	/////////////////////////////////////////
	///    COMMITS GENERATE             /////
	/////////////////////////////////////////


	function commitConstruct() {

		let data = DATA;
		let commits = data.Users;

		const starImg = '<svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.2168 5.79584L12.2598 5.32991C11.9473 5.30167 11.6774 5.10401 11.5496 4.80751L9.77417 0.529461C9.4901 -0.176487 8.48164 -0.176487 8.19757 0.529461L6.43632 4.80751C6.3227 5.10401 6.03862 5.30167 5.72615 5.32991L0.769095 5.79584C0.0305089 5.86643 -0.267766 6.78417 0.286173 7.27833L4.02172 10.5398C4.26318 10.7516 4.3626 11.0622 4.29158 11.3728L3.1695 15.9474C2.99906 16.6674 3.78025 17.2604 4.43362 16.8792L8.56686 14.4649C8.83673 14.3096 9.16341 14.3096 9.43328 14.4649L13.5665 16.8792C14.2199 17.2604 15.0011 16.6816 14.8306 15.9474L13.7228 11.3728C13.6517 11.0622 13.7512 10.7516 13.9926 10.5398L17.7282 7.27833C18.2679 6.78417 17.9554 5.86643 17.2168 5.79584Z" fill="#FC9B09"/></svg>';

		const like = '<svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 6.5L6.6 12.5L16 1" stroke="#6AAD4A" stroke-width="2.5"/></svg>';

		const dislike = '<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="100%" height="100%" version="1.1" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd" viewBox="0 0 500 500" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><style type="text/css"><![CDATA[.str0 {stroke:#FF3300;stroke-width:40;stroke-linecap:round}.fil0 {fill:none}]]></style></defs><g id="Layer_x0020_1"><metadata id="CorelCorpID_0Corel-Layer"/><path class="fil0 str0" d="M425 75l-350 350m350 0l-350 -350"/></g></svg>';

		const likeText = "Супер! Я бы заказала съемку снова!";

		const dislikeText = "Не понравилось! Никогда не вернусь";

		const blocksCommit = $(".cards__item")[0];
		const blockList = $(".cards__list-false");

		$(".more__text, .more__text-false").children("p").html(`Показать Все (${commits.length})`);

		for (let value of commits) {

			let blockCommit = $(blocksCommit).clone();
			let commitsObj = value.userData;

			$(blockCommit).find('img').attr("src", commitsObj.photo).attr("alt", commitsObj.name);
			$(blockCommit).find('h4').html(commitsObj.name);
			$(blockCommit).find(".job").html(commitsObj.job);
			$(blockCommit).find(".stars").html(function(){

					$(this).html('');

					for(let i = 0; i < commitsObj.rating; i++){
						$(this).append(starImg);
					}
			});
			$(blockCommit).find(".cards__rating-like").html(function () {

					if (commitsObj.recommended){

						return like;

					} else {

						return dislike;
					};
			});
			$(blockCommit).find(".cards__rating-text").html(function () {

					if (commitsObj.recommended) {
						return likeText;
					} else {
						return dislikeText;
					}
			});
			$(blockCommit).find(".review").html(commitsObj.commit);
			$(blockCommit).find(".cards__date").html(commitsObj.date);

			$(blockList).append(blockCommit);
		}


	}

	commitConstruct()

	$(".reviews__more").on("click", function () {

		$(".cards__list-false").addClass("active");

		$(this).css("display", "none");

		$(".reviews__hide").css("display", "flex");
	});

	$(".reviews__hide").on("click", function () {

		$(".cards__list-false").removeClass("active");

		$(this).css("display", "none");

		$(".reviews__more").css("display", "flex");
	});


	//////////////////////////////////////////
	/////           YANDEX MAPS          /////
	//////////////////////////////////////////

	let blockHint = ['<div class="hint">', '<div class="hint__content">', '<ul class="hint__list">', '<li class="hint__item">','<div class="hint__block">', '<div class="hint__numb">','1' ,'</div>' , '<div class="hint__title">', ,'Где встречаемся?' ,'</div>', '<div class="hint__title">', ,'Москва' ,'</div>','</div>','</li>',, '<li class="hint__item">','<div class="hint__block">', '<div class="hint__numb">','1' ,'</div>' , '<div class="hint__title">', ,'Где встречаемся?' ,'</div>', '<div class="hint__title">', ,'Москва' ,'</div>','</div>','</li>', '<li class="hint__item">','<div class="hint__block">', '<div class="hint__numb">','1' ,'</div>' , '<div class="hint__title">', ,'Где встречаемся?' ,'</div>', '<div class="hint__title">', ,'Москва' ,'</div>','</div>','</li>','</ul>','</div>','</div>' ]


	ymaps.ready(function () {
		let myMap = new ymaps.Map("map", {
			// Координаты центра карты.
			// Порядок по умолчанию: «широта, долгота».
			// Чтобы не определять координаты центра карты вручную,
			// воспользуйтесь инструментом Определение координат.
			center: [55.758792301352464, 37.61949521438022],
			// Уровень масштабирования. Допустимые значения:
			// от 0 (весь мир) до 19.
			zoom: 17
		});
		myMap.behaviors.disable('scrollZoom');

		let placemark = new ymaps.Placemark([55.758792301352464, 37.61949521438022], {
			hintContent: blockHint.join(''),
			balloonContent: "Встречаемся тут"
		},
		{
			preset: 'islands#redIcon'
		});
		myMap.geoObjects.add(placemark);

	});

});

/////////////////////////////////////////////
/////          Commits JSON             /////
/////////////////////////////////////////////

const DATA = {
	Date: "2022-04-14T11:30:00+03:00",
	Users: [
		{
			userId: 1,
			Id: 1,
			userData: {
				photo: "assets/img/review-photo2.png",
				name: "Василий Семенов",
				job: "Дизайнер",
				rating: 4,
				recommended: false,
				commit: "Отлично покатались на вертолёте по подарочному сертификату. Красивый обзорный полёт в районе между Шоссе Энтузиастов (Горьковское) и Щёлковским шоссе. Перед полётом краткий инструктаж и заполнение стандартных документов. Всё! Итого - море позитива и необычные ощущения, потому что вертолёт очень маленький и лёгкий.",
				date: "10 Апреля, 2019г."
			}
		},
		{
			userId: 2,
			Id: 2,
			userData: {
				photo: "assets/img/review-photo2.png",
				name: "Сергей В.",
				// job: "Юрист",
				rating: 5,
				recommended: true,
				commit: "Все понравилось! Все профессионально организовано. Пилот очень опытный, плавно управлял вертолетом. Хост персонал сработал четко, подарил хорошие эмоции как и полет! Рекомендовано",
				date: "09  Апреля, 2019г."
			}
		},
		{
			userId:3,
			Id:3,
			userData: {
				photo: "assets/img/review-photo1.png",
				name: "Василий Семенов",
				job: "Дизайнер",
				rating: 5,
				recommended: true,
				commit: "Отлично покатались на вертолёте по подарочному сертификату. Красивый обзорный полёт в районе между Шоссе Энтузиастов (Горьковское) и Щёлковским шоссе. Перед полётом краткий инструктаж и заполнение стандартных документов. Всё! Итого - море позитива и необычные ощущения, потому что вертолёт очень маленький и лёгкий.",
				date: "09 Апреля, 2019г."
			}
		},
		{
			userId: 4,
			Id: 4,
			userData: {
				photo: "assets/img/review-photo3.png",
				name: "Аноним",
				job: "",
				rating:5,
				recommended: true,
				commit: "Хорошие впечатления от непродолжительного, но увлекательного полета. Повезло с погодой, хотя до этого дня мероприятие несколько раз откладывалось. Спасибо персоналу, вежливые, терпеливые, спокойные. Опытный и уверенный пилот, уютная кабина с панорамным обзором, живописная местность. Всем рекомендуем. Спасибо!",
				date: "08 Апреля, 2019г."
			}
		},
		{
			userId: 5,
			Id: 5,
			userData: {
				photo: "assets/img/review-photo1.png",
				name: "Василий Семенов",
				job: "Дизайнер",
				rating: 5,
				recommended: true,
				commit: "Отлично покатались на вертолёте по подарочному сертификату. Красивый обзорный полёт в районе между Шоссе Энтузиастов (Горьковское) и Щёлковским шоссе. Перед полётом краткий инструктаж и заполнение стандартных документов. Всё! Итого - море позитива и необычные ощущения, потому что вертолёт очень маленький и лёгкий.",
				date: "07 Апреля, 2019г."
			}
		},
		{
			userId: 6,
			Id: 6,
			userData: {
				photo: "assets/img/review-photo3.png",
				name: "Аноним",
				rating: 5,
				recommended: true,
				commit: "Хорошие впечатления от непродолжительного, но увлекательного полета. Повезло с погодой, хотя до этого дня мероприятие несколько раз откладывалось. Спасибо персоналу, вежливые, терпеливые, спокойные. Опытный и уверенный пилот, уютная кабина с панорамным обзором, живописная местность. Всем рекомендуем. Спасибо!",
				date: "07 Апреля, 2019г."
			}
		},
		{
			userId: 7,
			Id: 7,
			userData: {
				photo: "assets/img/review-photo1.png",
				name: "Семен Васильев",
				job: "менеджер",
				rating: 5,
				recommended: true,
				commit: "Все понравилось! Все профессионально организовано. Пилот очень опытный, плавно управлял вертолетом. Хост персонал сработал четко, подарил хорошие эмоции как и полет! Рекомендовано",
				date: "06 Апреля, 2019г."
			}
		},
		{
			userId: 8,
			Id: 8,
			userData: {
				photo: "assets/img/review-photo2.png",
				name: "Василий Семенов",
				job: "дизайне",
				rating: 5,
				recommended: true,
				commit: "Отлично покатались на вертолёте по подарочному сертификату. Красивый обзорный полёт в районе между Шоссе Энтузиастов (Горьковское) и Щёлковским шоссе. Перед полётом краткий инструктаж и заполнение стандартных документов. Всё! Итого - море позитива и необычные ощущения, потому что вертолёт очень маленький и лёгкий.",
				date: "06 Апреля, 2019г."
			}
		},
		{
			userId: 9,
			Id: 9,
			userData: {
				photo: "assets/img/review-photo1.png",
				name: "Василий Семенов",
				job: "дизайне",
				rating: 5,
				recommended: true,
				commit: "Хорошие впечатления от непродолжительного, но увлекательного полета. Повезло с погодой, хотя до этого дня мероприятие несколько раз откладывалось. Спасибо персоналу, вежливые, терпеливые, спокойные. Опытный и уверенный пилот, уютная кабина с панорамным обзором, живописная местность. Всем рекомендуем. Спасибо!",
				date: "05 Апреля, 2019г."
			}
		},
		{
			userId: 10,
			Id: 10,
			userData: {
				photo: "assets/img/review-photo2.png",
				name: "Василий Семенов",
				job: "Дизайнер",
				rating: 5,
				recommended: true,
				commit: "Отлично покатались на вертолёте по подарочному сертификату. Красивый обзорный полёт в районе между Шоссе Энтузиастов (Горьковское) и Щёлковским шоссе. Перед полётом краткий инструктаж и заполнение стандартных документов. Всё! Итого - море позитива и необычные ощущения, потому что вертолёт очень маленький и лёгкий.",
				date: "05 Апреля, 2019г."
			}
		},
		{
			userId: 11,
			Id: 11,
			userData:{
				photo: "assets/img/review-photo3.png",
				name: "Василий С.",
				job: "",
				rating: 5,
				recommended: true,
				commit: "Отлично покатались на вертолёте по подарочному сертификату. Красивый обзорный полёт в районе между Шоссе Энтузиастов (Горьковское) и Щёлковским шоссе. Перед полётом краткий инструктаж и заполнение стандартных документов. Всё! Итого - море позитива и необычные ощущения, потому что вертолёт очень маленький и лёгкий.",
				date: "05 Апреля, 2019г."
			}
		},
		{
			userId: 12,
			Id: 12,
			userData: {
				photo: "assets/img/review-photo2.png",
				name: "Василий Семенов",
				job: "водитель",
				rating: 5,
				recommended: true,
				commit: "Хорошие впечатления от непродолжительного, но увлекательного полета. Повезло с погодой, хотя до этого дня мероприятие несколько раз откладывалось. Спасибо персоналу, вежливые, терпеливые, спокойные. Опытный и уверенный пилот, уютная кабина с панорамным обзором, живописная местность. Всем рекомендуем. Спасибо!",
				date: "03 Апреля, 2019г."
			}
		},
		{
			userId: 13,
			Id: 13,
			userData: {
				photo: "assets/img/review-photo2.png",
				name: "Сергей",
				job: "",
				rating: 5,
				recommended: true,
				commit: "Отлично покатались на вертолёте по подарочному сертификату. Красивый обзорный полёт в районе между Шоссе Энтузиастов (Горьковское) и Щёлковским шоссе. Перед полётом краткий инструктаж и заполнение стандартных документов. Всё! Итого - море позитива и необычные ощущения, потому что вертолёт очень маленький и лёгкий.",
				date: "03 Апреля, 2019г."
			}
		},
		{
			userId: 14,
			Id: 14,
			userData: {
				photo: "assets/img/review-photo1.png",
				name: "Василий Семенов",
				job: "Фотограф",
				rating: 5,
				recommended: true,
				commit: "Отлично покатались на вертолёте по подарочному сертификату. Красивый обзорный полёт в районе между Шоссе Энтузиастов (Горьковское) и Щёлковским шоссе. Перед полётом краткий инструктаж и заполнение стандартных документов. Всё! Итого - море позитива и необычные ощущения, потому что вертолёт очень маленький и лёгкий.",
				date: "01 Апреля, 2019г."
			}
		},
		{
			userId: 15,
			Id: 15,
			userData: {
				photo: "assets/img/review-photo3.png",
				name: "Василий В.",
				job: "Дизайнер",
				rating: 5,
				recommended: true,
				commit: "Отлично покатались на вертолёте по подарочному сертификату. Красивый обзорный полёт в районе между Шоссе Энтузиастов (Горьковское) и Щёлковским шоссе. Перед полётом краткий инструктаж и заполнение стандартных документов. Всё! Итого - море позитива и необычные ощущения, потому что вертолёт очень маленький и лёгкий.",
				date: "30 марта, 2019г."
			}
		},
		{
			userId: 16,
			Id: 16,
			userData: {
				photo: "assets/img/review-photo2.png",
				name: "Василий Семенов",
				job: "дизайне",
				rating: 5,
				recommended: true,
				commit: "Отлично покатались на вертолёте по подарочному сертификату. Красивый обзорный полёт в районе между Шоссе Энтузиастов (Горьковское) и Щёлковским шоссе. Перед полётом краткий инструктаж и заполнение стандартных документов. Всё! Итого - море позитива и необычные ощущения, потому что вертолёт очень маленький и лёгкий.",
				date: "29 марта, 2019г."
			}
		},
		{
			userId: 17,
			Id: 17,
			userData: {
				photo: "assets/img/review-photo3.png",
				name: "Василий Семенов",
				job: "дизайне",
				rating: 5,
				recommended: true,
				commit: "Отлично покатались на вертолёте по подарочному сертификату. Красивый обзорный полёт в районе между Шоссе Энтузиастов (Горьковское) и Щёлковским шоссе. Перед полётом краткий инструктаж и заполнение стандартных документов. Всё! Итого - море позитива и необычные ощущения, потому что вертолёт очень маленький и лёгкий.",
				date: "27 марта, 2019г."
			}
		},
		{
			userId: 18,
			Id: 18,
			userData: {
				photo: "assets/img/review-photo2.png",
				name: "Василий Семенов",
				job: "дизайне",
				rating: 5,
				recommended: true,
				commit: "Отлично покатались на вертолёте по подарочному сертификату. Красивый обзорный полёт в районе между Шоссе Энтузиастов (Горьковское) и Щёлковским шоссе. Перед полётом краткий инструктаж и заполнение стандартных документов. Всё! Итого - море позитива и необычные ощущения, потому что вертолёт очень маленький и лёгкий.",
				date: "25 марта, 2019г."
			}
		},
		{
			userId: 19,
			Id: 19,
			userData: {
				photo: "assets/img/review-photo1.png",
				name: "Василий Семенов",
				job: "дизайне",
				rating: 5,
				recommended: true,
				commit: "Отлично покатались на вертолёте по подарочному сертификату. Красивый обзорный полёт в районе между Шоссе Энтузиастов (Горьковское) и Щёлковским шоссе. Перед полётом краткий инструктаж и заполнение стандартных документов. Всё! Итого - море позитива и необычные ощущения, потому что вертолёт очень маленький и лёгкий.",
				date: "24 марта, 2019г."
			}
		},
		{
			userId: 20,
			Id: 20,
			userData: {
				photo: "assets/img/review-photo3.png",
				name: "Василий Семенов",
				job: "дизайне",
				rating: 5,
				recommended: true,
				commit: "Отлично покатались на вертолёте по подарочному сертификату. Красивый обзорный полёт в районе между Шоссе Энтузиастов (Горьковское) и Щёлковским шоссе. Перед полётом краткий инструктаж и заполнение стандартных документов. Всё! Итого - море позитива и необычные ощущения, потому что вертолёт очень маленький и лёгкий.",
				date: "23 марта, 2019г."
			}
		},
		{
			userId: 21,
			Id: 21,
			userData: {
				photo: "assets/img/review-photo1.png",
				name: "Василий Семенов",
				job: "дизайне",
				rating: 5,
				recommended: true,
				commit: "Отлично покатались на вертолёте по подарочному сертификату. Красивый обзорный полёт в районе между Шоссе Энтузиастов (Горьковское) и Щёлковским шоссе. Перед полётом краткий инструктаж и заполнение стандартных документов. Всё! Итого - море позитива и необычные ощущения, потому что вертолёт очень маленький и лёгкий.",
				date: "20 марта, 2019г."
			}
		},
		{
			userId: 22,
			Id: 22,
			userData: {
				photo: "assets/img/review-photo2.png",
				name: "Василий Семенов",
				job: "дизайне",
				rating: 5,
				recommended: true,
				commit: "Отлично покатались на вертолёте по подарочному сертификату. Красивый обзорный полёт в районе между Шоссе Энтузиастов (Горьковское) и Щёлковским шоссе. Перед полётом краткий инструктаж и заполнение стандартных документов. Всё! Итого - море позитива и необычные ощущения, потому что вертолёт очень маленький и лёгкий.",
				date: "19 марта, 2019г."
			}
		},
		{
			userId: 23,
			Id: 23,
			userData: {
				photo: "assets/img/review-photo3.png",
				name: "Василий Семенов",
				job: "дизайне",
				rating: 5,
				recommended: true,
				commit: "Отлично покатались на вертолёте по подарочному сертификату. Красивый обзорный полёт в районе между Шоссе Энтузиастов (Горьковское) и Щёлковским шоссе. Перед полётом краткий инструктаж и заполнение стандартных документов. Всё! Итого - море позитива и необычные ощущения, потому что вертолёт очень маленький и лёгкий.",
				date: "19 марта, 2019г."
			}
		},
		{
			userId: 24,
			Id: 24,
			userData: {
				photo: "assets/img/review-photo2.png",
				name: "Василий Семенов",
				job: "дизайне",
				rating: 5,
				recommended: true,
				commit: "Отлично покатались на вертолёте по подарочному сертификату. Красивый обзорный полёт в районе между Шоссе Энтузиастов (Горьковское) и Щёлковским шоссе. Перед полётом краткий инструктаж и заполнение стандартных документов. Всё! Итого - море позитива и необычные ощущения, потому что вертолёт очень маленький и лёгкий.",
				date: "18 марта, 2019г."
			}
		},
		{
			userId: 25,
			Id: 25,
			userData: {
				photo: "assets/img/review-photo2.png",
				name: "Василий Семенов",
				job: "дизайне",
				rating: 5,
				recommended: true,
				commit: "Отлично покатались на вертолёте по подарочному сертификату. Красивый обзорный полёт в районе между Шоссе Энтузиастов (Горьковское) и Щёлковским шоссе. Перед полётом краткий инструктаж и заполнение стандартных документов. Всё! Итого - море позитива и необычные ощущения, потому что вертолёт очень маленький и лёгкий.",
				date:
					"16 марта, 2019г."
			}
		},
		{
			userId: 26,
			Id: 26,
			userData: {
				photo: "assets/img/review-photo2.png",
				name: "Василий Семенов",
				job: "дизайне",
				rating: 5,
				recommended: true,
				commit: "Отлично покатались на вертолёте по подарочному сертификату. Красивый обзорный полёт в районе между Шоссе Энтузиастов (Горьковское) и Щёлковским шоссе. Перед полётом краткий инструктаж и заполнение стандартных документов. Всё! Итого - море позитива и необычные ощущения, потому что вертолёт очень маленький и лёгкий.",
				date: "15 марта, 2019г."
			}
		},
		{
			userId: 27,
			Id: 27,
			userData: {
				photo: "assets/img/review-photo2.png",
				name: "Василий Семенов",
				job: "дизайне",
				rating: 5,
				recommended: true,
				commit: "Отлично покатались на вертолёте по подарочному сертификату. Красивый обзорный полёт в районе между Шоссе Энтузиастов (Горьковское) и Щёлковским шоссе. Перед полётом краткий инструктаж и заполнение стандартных документов. Всё! Итого - море позитива и необычные ощущения, потому что вертолёт очень маленький и лёгкий.",
				date: "10 марта, 2019г."
			}
		},
		{
			userId: 28,
			Id: 28,
			userData: {
				photo: "assets/img/review-photo2.png",
				name: "Василий Семенов",
				job: "дизайне",
				rating: 5,
				recommended: true,
				commit: "Отлично покатались на вертолёте по подарочному сертификату. Красивый обзорный полёт в районе между Шоссе Энтузиастов (Горьковское) и Щёлковским шоссе. Перед полётом краткий инструктаж и заполнение стандартных документов. Всё! Итого - море позитива и необычные ощущения, потому что вертолёт очень маленький и лёгкий.",
				date: "09 марта, 2019г."
			}
		}
	]
};


