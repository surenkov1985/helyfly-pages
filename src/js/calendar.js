
import $ from 'jquery'

$(document).ready(function () {

	//////////////////////////////////////////////
	////////           Calendar           ////////
	//////////////////////////////////////////////

	const dateArrays = {
		"prevMonth": [],
		"actualMonth": [],
		"nextMonth": []
	};

	let year = new Date().getFullYear();
	let month = new Date().getMonth();
	let day = new Date().getDate();

	function setDateArrays(year = new Date().getFullYear(), month = new Date().getMonth()) {

		let lastDate = new Date(year, month + 1, 0);
		let firstDay = new Date(year, month, 1).getDay();
		let sumDate = lastDate.getDate();
		let numDay = 0;


		if (firstDay === 0) {

			numDay = 7 - firstDay - 1;
		} else if (firstDay > 1) {

			numDay = firstDay - 1;
		};

		for (let i = 0; i < numDay; i++) {
			dateArrays.prevMonth.unshift(new Date(year, month, 0 - i).getDate());
		};

		for (let i = 0; i < +sumDate; i++){
			dateArrays.actualMonth.push(i+1);
		};

		if (lastDate.getDay() > 0) {
			numDay = 7 - lastDate.getDay();
		};

		for (let i = 0; i < numDay; i++) {
			dateArrays.nextMonth.push(i + 1);
		};
	};

	function setModalDate(day, month, year) {

		month = Number(month) + 1;
		if (day < 10) day = "0" + day;
		if (month < 10) month = "0" + month;

		$("#date").val(year + "-" + month + "-" + day);
	};

	function setEntryDate(month, day) {

		const weekDays = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Черверг", "Пятница", "Суббота"];
		const mounts = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];

		let getMount = mounts[month];
		let todayWeekDay = weekDays[new Date().getDay()];

		$(".day").text(todayWeekDay + ", ");
		$(".date").text(day + " ");
		$(".mont").text(getMount);
	};

	setEntryDate(month, day);

	function getDatePicker(year, month) {
		const monthsTitle = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

		let monthTitle = monthsTitle[month];

		$(".mount__text").text(monthTitle + ", " + year + "г");

		setDateArrays(year, month);
	};

	function buildDatePicker(obj) {

		$(".days__list").each(function () {

			if (!$(this).children().length) {

				for (let key in obj) {

					for (let i = 0; i < obj[key].length; i++) {

						$(this).append(`<li class=${key}>${obj[key][i]}</li>`);
						$(`.${key}`).addClass("days__item");
					};
				};

			} else {

				$(this).find(".days__item").removeClass("prevMonth");
				$(this).find(".days__item").removeClass("actualMonth");
				$(this).find(".days__item").removeClass("nextMonth");

				let index = 0;
				let daysArr = Array.from($(this).find(".days__item"));

				for (let key in obj) {

					for (let i = 0; i < obj[key].length; i++) {

						$(daysArr[index]).text(obj[key][i]);
						$(daysArr[index]).addClass(key);

						index ++;
					};
				};
			};
		});
	};

	function removeArrInObj(obj) {

		for (let key in obj) {

			let arr = obj[key];
			arr.length = 0;
			obj[key] = arr;
		}
	};

	getDatePicker(year, month);
	buildDatePicker(dateArrays);

	$(".mount__after").each(function () {

		$(this).on("click", function () {

			month -= 1;

			if (month < 0) {

				month = 11;
				year -= 1;
			};

			removeArrInObj(dateArrays);
			$(".days__item").empty();

			getDatePicker(year, month);
			buildDatePicker(dateArrays);
		});
	});

	$(".mount__before").each(function () {

		$(this).on("click", function () {

			month += 1;

			if (month > 11) {

				month = 0;
				year++
			};

			removeArrInObj(dateArrays);
			$(".days__item").empty();

			getDatePicker(year, month);
			buildDatePicker(dateArrays);
		});
	});

	$(".calendar-entry").find(".days__item").each(function() {

		$(this).on("click", function () {

			let day = $(this).text();

			setEntryDate(month, day);
			$(".calendar-entry").removeClass("active");
		});


	});

	$(".calendar-modal").find(".days__item").each(function () {

		$(this).on("click", function () {

			let day = $(this).text();

			if ($(this).hasClass("prevMonth")) setModalDate(day, month - 1, year);
			if ($(this).hasClass("actualMonth")) setModalDate(day, month, year);
			if ($(this).hasClass("nextMonth")) setModalDate(day, month + 1, year);

			$(".calendar-modal").removeClass("active");
		});

	});

	$(".entry__picker-icon").on("click", function (event) {
		event.stopPropagation();
		if (year !== new Date().getFullYear() || month !== new Date().getMonth()) {

			year = new Date().getFullYear();
			month = new Date().getMonth();

			removeArrInObj(dateArrays);
			$(".days__item").empty();

			getDatePicker(year, month);
			buildDatePicker(dateArrays);
		};

		$(".calendar-entry").toggleClass("active");
	});

	$(".entry__day").on("click", function (event) {
		event.stopPropagation();

		if (year !== new Date().getFullYear() || month !== new Date().getMonth()) {

			year = new Date().getFullYear();
			month = new Date().getMonth();

			removeArrInObj(dateArrays);
			$(".days__item").empty();

			getDatePicker(year, month);
			buildDatePicker(dateArrays);
		};

		$(".calendar-entry").toggleClass("active");
	});

	$(".calendar-icon").on("click", function (event) {
		event.stopPropagation();

		if (year !== new Date().getFullYear() || month !== new Date().getMonth()) {

			year = new Date().getFullYear();
			month = new Date().getMonth();

			removeArrInObj(dateArrays);
			$(".days__item").empty();

			getDatePicker(year, month);
			buildDatePicker(dateArrays);
		};

		$(".calendar-modal").toggleClass("active");
	});


});