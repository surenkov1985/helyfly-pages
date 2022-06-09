import $ from 'jquery'

$(document).ready(function () {

	//////////////////////////////////////////
	////            YOUTUBE              /////
	//////////////////////////////////////////

	$(".fotoshoot__img").on("click", function () {

		$(".fotoshoot__img").removeClass("active");
		$(".fotoshoot__player iframe").addClass("active");
		$(".fotoshoot__close").addClass("active");


		$('.fotoshoot__video').each(function(){
			this.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
		});
	});

	$(".fotoshoot__close").on("click", function () {

		$('.fotoshoot__video').each(function(){
			this.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
		});

		$(".fotoshoot__img").addClass("active");
		$(".fotoshoot__player iframe").removeClass("active");
		$(".fotoshoot__close").removeClass("active");
	});
});