import $ from 'jquery'
// import json from '../data/comments.json'

/////////////////////////////////////////
///    COMMITS GENERATE             /////
/////////////////////////////////////////

let usersArray = [];

fetch("./comments.json").then(function (response) {

	return response.json();

}).then(function(_data) {

	if (_data && _data.Users) usersArray = _data.Users;

	setCommitsNumb(usersArray);
	commitConstruct(usersArray);
});

function setCommitsNumb(arr) {

	if (!jQuery.isReady) return;

	let commits = arr.length ? ' (' + arr.length + ')' : "";

	$(".more__text, .more__text-false").find("span").html(`Показать Все${commits}`);
};

function commitConstruct(arr) {

	if (!jQuery.isReady) return;

	const blocksCommit = $(".cards__item")[0];
	const blockList = $(".cards__list-false");

	if ($(blockList).find(".cards__item").length) return;

	for (let value of arr) {

		let blockCommit = $(blocksCommit).clone();
		let commitsObj = value.userData;

		$(blockCommit).find('img').attr("src", commitsObj.photo).attr("alt", commitsObj.name);
		$(blockCommit).find('h4').html(commitsObj.name);
		$(blockCommit).find(".job").html(commitsObj.job);

		$(blockCommit).find(".stars").children().each(function(index) {
			if (index >= commitsObj.rating) {
				$(this).addClass("gray");
			};
		});

		$(blockCommit).find(".cards__rating").each(function () {

			if (commitsObj.recommended) {

				$(blockCommit).find(".cards__rating").addClass("like");
				$(blockCommit).find(".cards__rating-false").removeClass("like");

			} else {

				$(blockCommit).find(".cards__rating").removeClass("like");
				$(blockCommit).find(".cards__rating-false").addClass("like");
			};
		});

		$(blockCommit).find(".review").html(commitsObj.commit);
		$(blockCommit).find(".cards__date").html(commitsObj.date);

		$(blockList).append(blockCommit);
	}
};

$(document).ready(function () {

	setCommitsNumb(usersArray);
	commitConstruct(usersArray);

	$(".more__text, .more__text-false").on("click", function () {

		$(".cards__list-false").addClass("active");

		$(".reviews__more").css("display", "none");

		$(".reviews__hide").css("display", "flex");
	});

	$(".hide__text, .hide__text-false").on("click", function () {

		$(".cards__list-false").removeClass("active");

		$(".reviews__hide").css("display", "none");

		$(".reviews__more").css("display", "flex");
	});

});
