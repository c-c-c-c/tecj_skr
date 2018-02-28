

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

// スマホのバイブ処理
function initVibration () {
		$('#rumble-element1').jrumble();
		$('#rumble-element2').jrumble();
		$('#rumble-element3').jrumble();


		$('#inview_trigger1').on('inview',function () {
			$('#rumble-element1').trigger('startRumble');
			setTimeout( ()=>{
			 	console.log('waiting');
				$('#rumble-element1').trigger('stopRumble');
			},500);
		});

		$('#inview_trigger2').on('inview',function () {
			$('#rumble-element2').trigger('startRumble');
			setTimeout( ()=>{
				$('#rumble-element2').trigger('stopRumble');
				setTimeout( ()=>{
					$('#rumble-element2').trigger('startRumble');
					setTimeout( ()=>{
						$('#rumble-element2').trigger('stopRumble');
					},150);
				},400);
			},150);


		});

		$('#inview_trigger3').on('inview',function () {
			$('#rumble-element3').trigger('startRumble');
			setTimeout( ()=>{
				console.log('waiting');
				$('#rumble-element3').trigger('stopRumble');
			},200);
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
