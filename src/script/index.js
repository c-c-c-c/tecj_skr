

/////////////////////
//スクロールアクション//
////////////////////
// function countScroll () {
// 	// スクロールしたら発動
// 	$window.scroll(function() {
// 		let before_scroll_px = scroll_px;
// 		// スクロール量を変数に格納
// 		scroll_px = $(this).scrollTop();
// 		delta_scroll_px = (scroll_px) - (before_scroll_px);
// 		sum_delta_scroll_px +=delta_scroll_px;
//
// 		//specialsをとめる
// 		if ( delta_scroll_px < 0 ) {
// 			$("#clover_main").css("animation-duration", "0s");
// 			$("#husha_main").css("animation-duration", "0s");
// 			$("#kanransha_main").css("animation-duration", "0s");
//
// 		}
//
// 	});
// }
////////////////
//ホバー時の挙動//
///////////////
// function addHoverImgChange () {
// 	$( '.item_box' ).hover((e)=>{
//
// 			$(e.currentTarget).find("img").each((i, ev)=>{
// 				if ($(ev).attr("class") == "not_spin"  ){
// 					$(ev).animate({opacity: 0});//
// 				} else {
// 					$(ev).animate({opacity: 1});
// 				}
// 			});
//
// 	},(e)=>{
//
// 		$(e.currentTarget).find("img").each((i, ev)=>{
// 			if ($(ev).attr("class") == "not_spin"  ){
// 				$(ev).animate({opacity:1});
// 			} else {
// 				$(ev).animate({opacity:0});
// 			}
// 		});
// 	});
// // }


////////////////////
// SPECIALSの挙動 //
//////////////////


function animateInWindow () {

	let el = document.getElementById("animate_window");
	el.className += " getin_anime";
	let ec = document.getElementById("top_explain_delay");
	ec.className += " delay_show_anime";
}

function initVibration() {
	$('#rumble-element1').jrumble();
	$('#rumble-element2').jrumble();
	$('#rumble-element3').jrumble();

	$('#inview_trigger1').on('inview', function () {
		// $('.white_screen1').css();
		console.log("1");
		$('.container').animate({ "margin-top": "-386px" }, { duration: 1000, easing: 'swing' });
		// $('.white_screen1').animate( { "margin-top" : "-400px"}, { duration: 1000, easing: 'swing', } );
		// $('.white_screen1').animate( { "opacity" : "0"}, { duration: 1000, easing: 'swing', } );


		// $('.white_screen1').css( "margin-top" , "-400px");
		// $("#clover_main").css("animation-duration", "0s");
	});

	$('#inview_trigger2').on('inview', function () {
		$('.black_screen2').hide();

		setTimeout(function () {
			console.log('waiting');
			// $('#rumble-element2').trigger('stopRumble');
			$('.white_screen2').animate({ "opacity": "0" }, { duration: 1000, easing: 'swing' });
			setTimeout(function () {
				$('.white_screen2').hide();
			}, 1700);
		}, 1200);
		// $('#rumble-element2').trigger('startRumble');
	});

	let vibr_cnt = 0;
	$('#inview_trigger3').on('inview', function () {
		if ( vibr_cnt === 0 ) {

			$('#rumble-element3').trigger('startRumble');
			setTimeout(function () {
				$('#rumble-element3').trigger('stopRumble');
				setTimeout(function () {
					$('#rumble-element3').trigger('startRumble');
					setTimeout(function () {
						$('#rumble-element3').trigger('stopRumble');
					}, 250);
				}, 500);
			}, 280);

		}
		vibr_cnt = 1;
	});
}



window.onload = ()=> {
	// $(window).fadeThis({speed: 600, distance: 4});
	// setTimeout( animateInWindow(),300000);
	initVibration();
	animateInWindow();
	// setTimeout( ()=>{
	// 	console.log('waiting');
	//
	// },0);



}
