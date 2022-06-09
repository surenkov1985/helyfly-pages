
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
});