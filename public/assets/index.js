"use strict";

// let howManySpinners = 200;
// let scene = new THREE.Scene();
// let box;
// let controls;
// let renderer = [];
// let camera;
// let model = [];
// //let model = {};
// let model2 = {};
// let model3 = {};
// let rotate_speed = 0.05;
// let r_radian = 0;
// let c_radian = 0;
// let r_radian_speed =0.01;
// let c_radian_speed =0.007;
// let count = 0;
//
// let geometry;
// let material;
// let scroll_px = 0;
// let delta_scroll_px = 0;
// let sum_delta_scroll_px = 0.05;
// const $window = $(window);


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
// function initMovie() {
//
// 	// IFrame Player API JavaScript コードの読み込み
// 	var tag = document.createElement('script');
// 	tag.src = "https://www.YOUTUBE.com/player_api";
// 	var firstScriptTag = document.getElementsByTagName('script')[0];
// 	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
//
// }
//
// var ytPlayer;
// function onYouTubePlayerAPIReady() {
// 	ytPlayer = new YT.Player(
// 		'mv',// iframeに差し替えたいdivのID
// 		{
// 			width: '100%',// プレイヤーの高さ
// 			height: '100%',// プレイヤーの幅
// 			videoId: 'vpouubMXKlI',//動画のID
// 			// イベントの設定
// 			events: {
// 				'onReady': onPlayerReady, // プレーヤー準備完了後、onPlayerReady関数を実行
// 				'onStateChange': onPlayerStateChange // プレーヤー状態変更時、onPlayerStateChange関数を実行
// 			},
// 			// パラメータの設定
// 			playerVars: {
// 				autoplay: 1, // 自動再生(0:しない,1:する)
// 				controls: 0, // コントロールバー(0:非表示,1:表示,2:動画再生後に表示)
// 				//listType: playlist, // 再生リストを表示
// 				//listType: search list, // listパラメータで指定した文字列で検索した動画を再生リストに表示
// 				//listType: user_uploads, // YouTubeチャンネルを表示
// 				//list: ***, // listTypeパラメータがplaylistの時、再生リストIDを指定
// 				//list: ***, // istTypeパラメータがsearch listの時、検索する文字列を指定
// 				//list: ***, // istTypeパラメータがuser_uploadsの時、YouTubeチャンネルを指定
// 				loop: 0, // ループ再生(0:しない,1:する)※単一の動画の場合、同じ動画IDをplaylistパラメータの値に設定
// 				//playlist: ***,***,***, //最初の動画再生後、IDで指定した動画を順番に再生(値は動画ID)
// 				rel: 0, // 再生終了後、関連動画を表示(0:非表示,1:表示)
// 				showinfo: 0, // 動画再生前にタイトルを表示(0:非表示,1:表示)
// 				//start: **, //指定秒数から動画再生
// 				//end: **, // 指定秒数後、動画を停止
// 				wmode: 'transparent', // プレーヤーを背面に表示する
// 			}
// 		}
// 	);
// }
//
//
// function onPlayerReady(event) {
// 	// 動画再生(※自動再生ということ)
// 	event.target.playVideo();
// }

////////////////////
// SPECIALSの挙動 //
//////////////////


function animateInWindow() {

	// let path = $.bezierCurve(0, 0).addPoint(400, 200).addPoint(0, 370);
	// $("#animate_window").animate({
	//   bezierPath: path
	// }, 1, "easing");

	// let el = document.getElementById("test_anime");
	console.log('last');
	var el = document.getElementById("animate_window");
	el.className += " getin_anime";
}

//
//
// $(document).ready(function() {
// 	console.log("foo");
// 	$(window).fadeThis({speed: 600, distance: 4});
// 	setTimeout( animateInWindow(), 30000);
// 		console.log("yeah");
// 	// $(countScroll());
// 	// $(addHoverImgChange());
// 	// initMovie();
// });


window.onload = function () {
	// $(document).ready(function() {
	console.log("foo");
	// $(window).fadeThis({speed: 600, distance: 4});
	// setTimeout( animateInWindow(),300000);
	setTimeout(function () {
		console.log('waiting');
		animateInWindow();
	}, 3000);

	console.log("yeah yeah");
	// $(countScroll());
	// $(addHoverImgChange());
	// initMovie();
};
//# sourceMappingURL=index.js.map