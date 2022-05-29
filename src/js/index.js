// Main js file
// see more: https://github.com/vedees/webpack-template/blob/master/README.md#import-js-files
import jquery from 'jquery';
import $ from 'jquery';

$(document).ready(function () {

	$(".button-collection").on("click", function (event) {

		event.stopPropagation();

		$(".drop-menu").toggleClass("scale-drop");
	});

	$(window).on('click', () => {
		$(".drop-menu").removeClass("scale-drop");
	});

	//////////////////////////////////////////////////////

	function onCategory(elem) {

		$("#trendly-watch .showcase-item").each((index, categorie) => {

			if ($(categorie).data("watch-tab-id") === elem) {

				$(categorie).addClass("active");

			} else {

				$(categorie).removeClass("active");
			}
		});

		$("#trendly-watch .trend-content").each((index, categorie) => {

			if ($(categorie).attr("id") === elem) {

				$(categorie).removeClass("off").addClass("on");

			} else {

				$(categorie).removeClass("on").addClass("off");
			}
		});
	}

	onCategory("watches");

	$("#trendly-watch .showcase-item").each((index, elem) => {

		$(elem).on("click", function () {

			const tabId = $(this).data("watch-tab-id");

			onCategory(tabId);

		});
	});

/////////////////////////////////////////////////

	$(".burger-button").on("click", function () {

		$(".emerge-background").css("display", "block");
		$(".emerge-bg").addClass("show-menu");
		$(".emerge-menu").addClass("scale-right");

	});

	$(".closed-menu, .emerge-bg").on("click", function () {

		$(".emerge-bg").removeClass("show-menu");
		$(".emerge-background").css("display", "none");

		$(".emerge-menu").removeClass("scale-right");

	});

	//////////////////////////////////////////////////////

	function deleteActiveClass() {

		$(".category-item").each((index, category) => {
			$(category).removeClass("active")
		});
	}

	function activeLink() {

		const burgerHeigt = $(".burger-menu").height();
		const scrollDocument = $(document).scrollTop() + burgerHeigt;

		$(".category-item").each((index, category) => {

			const blockId = $(category).data("tab-block");
			const blockPosition = $(blockId).position().top;
			const categoryHeigth = $(blockId).height();
			const scrollCategoryBottom = blockPosition + categoryHeigth;

			if (blockPosition <= scrollDocument && scrollCategoryBottom >= scrollDocument) {

				deleteActiveClass();

				$(category).addClass("active");
			}
			;
		});
	};

	activeLink();

	$(document).on("scroll", function () {

		activeLink();
	});


	$(".category-item").each((index, category) => {

		$(category).on("click", function () {

			deleteActiveClass()

			const blockId = $(this).data("tab-block");

			$(this).addClass("active");

			$('html, body').animate({
				scrollTop: $(blockId).offset().top
			});
		});
	});

});

