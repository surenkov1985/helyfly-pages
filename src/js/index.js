// Main js file
// see more: https://github.com/vedees/webpack-template/blob/master/README.md#import-js-files
import jquery from 'jquery';
import $ from 'jquery';
// import ymaps from 'ymaps';

$(document).ready(function () {

	$(document).on("click", function (e) {
		let el = e.target

		console.log($(el).attr("class"));
	});

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
	console.log(dateArrays);
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

	// $(document).on("click", function (event) {
	// 	// event.stopPropagation();
	// 	console.log($(".calendar-modal"))
	// 	if (event.target !== $(".calendar-modal")) {
	// 		$(".calendar-modal").removeClass("active");
	// 	};
	// });

	/////////////////////////////////////////////////////

	let scrollDocument = 0;

	$(".header__button").on("click", function () {
		$(".modal").css("display", "flex");

		scrollDocument = $(document).scrollTop();

		$("#wrapper").css({"position": "fixed", "top": -scrollDocument});
		$(document).scrollTop(scrollDocument);

	});

	$(".modal__close-icon").on("click", function () {
		$(".modal").css("display", "none");

		$("#wrapper").css({"position": "relative", "top": 0});

		$(document).scrollTop(scrollDocument);



	});
	$(".modal__scroll").on("click", function (e) {

		if ($(e.target).hasClass("modal__scroll")) {

			$(".modal").css("display", "none");

			$("#wrapper").css({"position": "relative", "top": 0});
			$(document).scrollTop(scrollDocument);
		}
	});

	//////////////////////////////////////////
	let blockHint = ['<div class="hint">', '<div class="hint__content">', '<ul class="hint__list">', '<li class="hint__item">','<div class="hint__block">', '<div class="hint__numb">','1' ,'</div>' , '<div class="hint__title">', ,'Где встречаемся?' ,'</div>', '<div class="hint__title">', ,'Москва' ,'</div>','</div>','</li>',, '<li class="hint__item">','<div class="hint__block">', '<div class="hint__numb">','1' ,'</div>' , '<div class="hint__title">', ,'Где встречаемся?' ,'</div>', '<div class="hint__title">', ,'Москва' ,'</div>','</div>','</li>', '<li class="hint__item">','<div class="hint__block">', '<div class="hint__numb">','1' ,'</div>' , '<div class="hint__title">', ,'Где встречаемся?' ,'</div>', '<div class="hint__title">', ,'Москва' ,'</div>','</div>','</li>','</ul>','</div>','</div>' ]

	// ymaps
	// .load()
	// .then(maps => {
	// 	const map = new maps.Map('map', {
	// 	center: [55.758792301352464, 37.61949521438022],
	// 	zoom: 17
	// 	});
	// })
	// .catch(error => console.log('Failed to load Yandex Maps', error));

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
		// myMap.disableScrollZoom();

		let placemark = new ymaps.Placemark([55.758792301352464, 37.61949521438022], {
			hintContent: blockHint.join(''),
			balloonContent: "Встречаемся тут"
		},
		{
			preset: 'islands#redIcon'
		});
		myMap.geoObjects.add(placemark);

		// placemark.balloon.open();

	});

});

