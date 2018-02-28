'use strict';

var WIDTH = 400;
var HEIGHT = 400;
var c_radian = 0;
var r_radian = 0;
var light = void 0;
var ambient = void 0;
var hsGeoGruoup = new THREE.Group();
var model_hs;
var model_pn;
var mesh;
var controls;
var plane = {};

var vp = {}; //グローバルなフェイズ管理

var colorConf = {
	'red': '#ff0000', 'yellow': '#f0f000', 'green': '#00e000', 'skyblue': '#00ffff',
	'blue': '#0000ff', 'black': '#000000', 'dark': '#335500', 'white': '#ffffff', 'pink': '#ff99ff'
};

// レンダラー
var renderer = new THREE.WebGLRenderer({
	preserveDrawingBuffer: true
});
// renderer.autoClearColor = false;
renderer.setSize(WIDTH, HEIGHT);
// renderer.setClearColor(0xffffff);


// canvasを配置
document.getElementById('stage').appendChild(renderer.domElement);

// メイン描画用のシーンとカメラ
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 1, 100);
//light
light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 200, 80);
scene.add(light);
ambient = new THREE.AmbientLight(0x404040);
scene.add(ambient);

//背景の定義
var scene_bg = new THREE.Scene();
var camera_bg = new THREE.OrthographicCamera(0, WIDTH, HEIGHT, 0, 0, 1000);
// メイン描画オブジェクト

//JSONをロード
var loader = new THREE.JSONLoader();
var modelPath = '../src/data/hs300k.json';
// modelPath = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1538236/hs300k.json";

////////////
//初期カラー
//////////
var termsTree = {
	term1: {
		ledNo: 1,
		oftenBunbo: 1,
		oftenBunshi: 1,
		ledColor: 'red'
	},
	term2: {
		ledNo: 2,
		oftenBunbo: 1,
		oftenBunshi: 1,
		ledColor: 'blue'
	},
	term3: {
		ledNo: 3,
		oftenBunbo: 2,
		oftenBunshi: 1,
		ledColor: 'red'
	},
	term4: {
		ledNo: 4,
		oftenBunbo: 1,
		oftenBunshi: 1,
		ledColor: 'blue'
	},
	term5: {
		ledNo: 5,
		oftenBunbo: 6,
		oftenBunshi: 3,
		ledColor: 'green'
	}
};

function initRender() {
	loader.load(modelPath, function (geo, mat) {
		var geometry = geo;
		var material = mat;
		var scale_hs = 1;
		//let BasicMat = new THREE.MeshBasicMaterial(mat);
		var BasicMat = new THREE.MeshBasicMaterial(mat);
		var PhongMat = new THREE.MeshPhongMaterial(mat);
		BasicMat.color = new THREE.Color("#ffffff");
		BasicMat.wireframe = true;

		model_hs = new THREE.Mesh(geo, BasicMat);
		model_pn = new THREE.Mesh(geo, PhongMat);

		model_hs.scale.set(scale_hs, scale_hs, scale_hs);
		model_pn.scale.set(scale_hs * 1.05, scale_hs * 1.05, scale_hs * 1.05);
		model_pn.material.color = new THREE.Color("#cccccc");
		model_hs.material.opacity = 0.01;
		model_hs.material.transparent = true;

		var p_geometry = new THREE.PlaneGeometry(0.2, 0.17);
		// p_geometry.rotation.y = (Math.PI) / 4  ;
		hsGeoGruoup.add(model_pn);

		// ハンドスピナーとLEDライト５個をグループに
		// let hsGeoGruoup = new THREE.Group();

		// renderer.preserveDrawingBuffer = "true";
		// renderer.autoClearColor = "false";
		hsGeoGruoup.add(model_hs);
		for (var i = 1; i <= 5; i++) {
			// let p_material = new THREE.MeshBasicMaterial( { side: THREE.DoubleSide} );
			var p_material = new THREE.MeshPhongMaterial();
			plane[i] = new THREE.Mesh(p_geometry, p_material);
			plane[i].rotation.x = -Math.PI / 2;

			//平面の位置を少しずつずらす。
			plane[i].position.z = 0.27 * i + 1.2;
			//画面に対する奥行き方向は変更なしで2
			plane[i].position.y = 0.39;

			plane[i].material.color = new THREE.Color(colorConf['dark']);
			plane[i].visible = 0;
			// 先ほどのboxをグループに追加
			hsGeoGruoup.add(plane[i]);
			//hsGeoGruoup.add(model_pn);
		}

		scene.add(hsGeoGruoup);

		var bg_geometry = new THREE.PlaneGeometry(WIDTH, HEIGHT, 10, 10);
		var bg_material = new THREE.MeshBasicMaterial({
			color: 0x000000,
			transparent: true,
			opacity: 0.015
		});

		var bg = new THREE.Mesh(bg_geometry, bg_material);
		bg.position.x = WIDTH / 2;
		bg.position.y = HEIGHT / 2;
		scene_bg.add(bg);
		//cameraの位置を設定
		camera.position.set(0, 6, 0);
		camera.lookAt({ x: 0, y: 0, z: 0 });

		// OrbitControls対応箇所
		controls = new THREE.OrbitControls(camera, renderer.domElement);

		main();
	});
}

var count = 0;
var render_count = 0;

function main() {

	// OrbitControls対応箇所
	controls.update();
	if (vp.v_phase === "1_lets_spin" || vp.v_phase === "0_start_anime") {} else if (vp.v_phase === "2_more_spin") {
		hsGeoGruoup.rotation.y += 2 * Math.PI / 60 * 2;
	} else if (vp.v_phase === "3_led_explain") {
		hsGeoGruoup.rotation.y += 2 * Math.PI / 60 * 11;
	} else if (vp.v_phase === "4_led_light_on") {
		if (model_pn.visible) {
			model_pn.visible = 0;
			render_count = 40;
		} else {
			renderer.autoClearColor = false;
			for (var ledNo = 1; ledNo <= 5; ledNo++) {
				if (ledNo % 3 === 1) {
					plane[ledNo].material.color = new THREE.Color(colorConf["red"]);
				}
				if (ledNo % 3 === 2) {
					plane[ledNo].material.color = new THREE.Color(colorConf["blue"]);
				}
				if (ledNo % 3 === 0) {
					plane[ledNo].material.color = new THREE.Color(colorConf["yellow"]);
				}
				plane[ledNo].visible = 1;
			}
			render_count = "step4_done";
		}

		hsGeoGruoup.rotation.y += 2 * Math.PI / 60 * 41;
	} else {
		if (render_count === "step4_done") {
			render_count = Number(30);
			initFormDefault();
		}

		for (var key in termsTree) {
			var tmpTerm = termsTree[key];

			if (count % tmpTerm['oftenBunbo'] < tmpTerm['oftenBunshi']) {
				plane[tmpTerm['ledNo']].material.color = new THREE.Color(colorConf[tmpTerm['ledColor']]);
			} else {
				plane[tmpTerm['ledNo']].material.color = new THREE.Color(colorConf['black']);
			}
		}
		hsGeoGruoup.rotation.y += 2 * Math.PI / 60 * 41;
	}

	// LEDの色の表示

	count++;

	renderer.render(scene_bg, camera_bg);
	renderer.render(scene, camera);

	// 初期表示
	if (render_count < 60) {
		render_count++;
		main();
	} else {
		requestAnimationFrame(main);
	}
}

function initFormDefault() {
	// 初期のform 表示用
	for (var keys in termsTree) {
		var tmpTerm = termsTree[keys];
		// $("#tmpTerm .which_led[@vulue=" + tmpTerm["ledNo"] + "]").attr("checked","checked");
		// $('"#'+'term1'+' .which_led'+'"').val(tmpTerm["ledNo"]);
		$('#' + keys + ' .which_led').val(tmpTerm["ledNo"]);
		$('#' + keys + ' .how_often_bunbo').val(tmpTerm["oftenBunbo"]);
		$('#' + keys + ' .how_often_bunshi').val(tmpTerm["oftenBunshi"]);
		$('#' + keys + ' .which_color').val(tmpTerm["ledColor"]);
		// $("#term1 .which_led").val(3);
	}
}

////////////////////////
//条件を反映ボタンを押すとき
////////////////////////
function initExecBtn() {
	$('#exe_btn').click(function () {
		// 分母
		//初期化
		for (var i = 1; i <= 5; i++) {
			plane[i].material.color = new THREE.Color(colorConf['black']);
		}

		termsTree = {};
		$('.form_container').each(function (index, element) {
			console.log("hoge");
			console.log(this);
			var term_id = $(this).attr("id");
			console.log(term_id);
			termsTree[term_id] = {
				'ledNo': Number($('#' + term_id + ' .which_led').val()),
				'oftenBunbo': Number($('#' + term_id + ' .how_often_bunbo').val()),
				'oftenBunshi': Number($('#' + term_id + ' .how_often_bunshi').val()),
				'ledColor': $('#' + term_id + ' .which_color').val()
			};
		});

		render_count = 0;
		console.log(termsTree);
	});
}

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
// }

////////////////////
// VueによるHTML処理
//////////////////

function initVueTerm() {

	Vue.component('termComponent', {
		template: '#term-component',
		props: ["index", "term_id"],
		methods: {
			deleteTerm: function deleteTerm() {
				console.log(this.index);
				this.$emit('delete-term', this.index); //なぜかindexがうまく取れない
			}
			// },
			// mounted: function () {
			// 	// console.log(this.$ref.foo);
			// }
		} });

	var count = 5; //本当は、初期値は下のtermsの数にした方が良い
	var vm = new Vue({
		el: '#app',
		data: {
			terms: [{ id: 1, content: "term1" }, { id: 2, content: "term2" }, { id: 3, content: "term3" }, { id: 4, content: "term4" }, { id: 5, content: "term5" }]
		},
		methods: {
			addTerm: function addTerm() {
				count++;
				this.terms.push({ id: count, content: count });
			},
			// deleteTermEmit: function(index) {
			deleteTermEmit: function deleteTermEmit(index) {
				// if(confirm("この条件をほんとうに消しますか")) {
				this.terms.splice(index, 1);
				// }
			}
		}
	});
}

function initVuePhase() {
	//vpはグローバル変数
	vp = new Vue({
		el: '.vue_phase',
		data: {
			v_phase: "0_start_anime"
			//フェイズは以下がある。
			//(0) : 0_start_anime
			//(1) : 1_lets_spin
			//(2) : 2_more_spin
			//(3) : 3_led_explain
			//(4) : 4_led_light_on

			//(5) : 5_teach_how_to
		},
		methods: {
			changePhase: function changePhase(nextPhase) {
				vp.v_phase = nextPhase;
				console.log("phase" + nextPhase);
			}
		}
	});
	// vp.v_phase = "2_more_spin";
}

function initAnimation() {

	var el = document.getElementById("spinyart_img");
	el.className += " getin_spin";
	setTimeout(function () {
		el.className += " getin_spin";
		vp.v_phase = "1_lets_spin";
		// animateInWindow();
	}, 4500);
}

$(document).ready(function () {
	// $(window).fadeThis({speed: 600, distance: 4});
	// $(countScroll());
	// $(addHoverImgChange());
	initVueTerm();
	initVuePhase();
	initFormDefault();
	initExecBtn();
	initAnimation();
	$(initRender());
});
//# sourceMappingURL=handspinner.js.map