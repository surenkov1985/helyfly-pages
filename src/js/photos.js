import $ from 'jquery'

//////////////////////////////////////
////     PHOTOS CONSTRUCTOR       ////
//////////////////////////////////////

const URL = "./photos.json";

function photosConstruct(arr) {

	const photosList = $(".fotos__list");
	const photoItem = $(photosList).children(".fotos__item")[0];

	for (let i = 0; i < arr.length; i++) {

		let newPhoto = $(photoItem).clone();

		$(newPhoto).find("a").attr("href", arr[i].link);
		$(newPhoto).find('img').attr("src", arr[i].photo).attr("alt", arr[i].name);

		$(photosList).append(newPhoto);
	};
};

$(document).ready(function () {

	let photosNumb = $(".fotos__list").children().length;

	$(".fotos__button").on("click", function () {

		let newPhotosNumb = $(".fotos__list").children().length;
		if (photosNumb >= newPhotosNumb) {

			fetch(URL).then(function(response) {

					return response.json();

				}).then(function (data) {

					photosConstruct(data);
			});

		} else {

			$(".fotos__item").css("display", "flex");

		};

		$(".fotos__show-button").removeClass("active");
		$(".fotos__hide-button").addClass("active");
	});

	$(".fotos__hide-button").on("click", function () {

		$(".fotos__item").each(function (index) {

			if (index < photosNumb) {

				$(this).css("display", "flex");

			} else {

				$(this).css("display", "none");
			};

		});

		$(".fotos__show-button").addClass("active");
		$(".fotos__hide-button").removeClass("active");
	});

	let count = 0;
	let step = 3;

	$(".fotos__collection").on("scroll", function () {

		let blockWidth = $(this).width();
		let blockPosition = $(this).offset().left;
		let width = $(".fotos__list").outerWidth();
		let scroll = $(".fotos__list").offset().left;

		let scrollBlock = width - blockPosition - blockWidth * 2;

		if ( scroll * -1 >= scrollBlock) {

			let photosData = [];
			fetch(URL).then(function(response) {

				return response.json();

			}).then(function (data) {

				if (count <= data.length) {

					photosData = data.splice(count, step);
					photosConstruct(photosData);

					count += step;
				};
			});
		};
	});
});

