import $ from 'jquery';

$(document).ready(function () {

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