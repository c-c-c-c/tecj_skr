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
// 桜用


var vm = {};

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
var modelPath = './data/hs300k.json';
// modelPath = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1538236/hs300k.json";

////////////
//初期カラー
//////////
var termsTree = {
	// term1 : {
	// 	ledNo : 1,
	// 	oftenBunbo : 12,
	// 	oftenBunshi: 11,
	// 	ledColor : '#ff99ff'
	// },
	// term2 : {
	// 	ledNo : 2,
	// 	oftenBunbo : 12,
	// 	oftenBunshi :10,
	// 	ledColor : '#ff99ff'
	// },
	// term3 : {
	// 	ledNo : 3,
	// 	oftenBunbo : 12,
	// 	oftenBunshi: 9,
	// 	ledColor : '#ff99ff'
	// },
	// term4 : {
	// 	ledNo : 4,
	// 	oftenBunbo : 12,
	// 	oftenBunshi: 8,
	// 	ledColor : '#ff99ff'
	// },
	// term5 : {
	// 	ledNo : 5,
	// 	oftenBunbo : 12,
	// 	oftenBunshi: 7,
	// 	ledColor : '#ff99ff'
	// },
	// term6 : {
	// 	ledNo : 1,
	// 	oftenBunbo : 12,
	// 	oftenBunshi: 1,
	// 	ledColor : '#000000'
	// },
	// term7 : {
	// 	ledNo : 2,
	// 	oftenBunbo : 12,
	// 	oftenBunshi: 2,
	// 	ledColor : '#000000'
	// },
	// term8 : {
	// 	ledNo : 3,
	// 	oftenBunbo : 12,
	// 	oftenBunshi: 3,
	// 	ledColor : '#000000'
	// },
	// term9 : {
	// 	ledNo : 4,
	// 	oftenBunbo : 12,
	// 	oftenBunshi: 4,
	// 	ledColor : '#000000'
	// },
	// term10 : {
	// 	ledNo : 5,
	// 	oftenBunbo : 12,
	// 	oftenBunshi: 5,
	// 	ledColor : '#000000'
	// },
	term1: {
		ledNo: 1,
		oftenBunbo: 1,
		oftenBunshi: 1,
		ledColor: '#ff78ff'
	},
	term2: {
		ledNo: 2,
		oftenBunbo: 12,
		oftenBunshi: 11,
		ledColor: '#ff99ff'
	},
	term3: {
		ledNo: 3,
		oftenBunbo: 12,
		oftenBunshi: 10,
		ledColor: '#ff99ff'
	},
	term4: {
		ledNo: 4,
		oftenBunbo: 12,
		oftenBunshi: 9,
		ledColor: '#ff99ff'
	},
	term5: {
		ledNo: 5,
		oftenBunbo: 12,
		oftenBunshi: 8,
		ledColor: '#ffaaff'
	},
	term6: {
		ledNo: 2,
		oftenBunbo: 12,
		oftenBunshi: 1,
		ledColor: '#000000'
	},
	term7: {
		ledNo: 3,
		oftenBunbo: 12,
		oftenBunshi: 2,
		ledColor: '#000000'
	},
	term8: {
		ledNo: 4,
		oftenBunbo: 12,
		oftenBunshi: 3,
		ledColor: '#000000'
	},

	term9: {
		ledNo: 5,
		oftenBunbo: 12,
		oftenBunshi: 7,
		ledColor: '#000000'
	},
	term10: {
		ledNo: 5,
		oftenBunbo: 12,
		oftenBunshi: 5,
		ledColor: '#ffaaff'
	},
	term11: {
		ledNo: 5,
		oftenBunbo: 12,
		oftenBunshi: 4,
		ledColor: '#000000'
	},
	term12: {
		ledNo: 1,
		oftenBunbo: 12,
		oftenBunshi: 7,
		ledColor: '#ffc700'
	},
	term13: {
		ledNo: 1,
		oftenBunbo: 12,
		oftenBunshi: 4,
		ledColor: '#ff78ff'
	}
	////////////
	//レンダリング初期表示
	//////////

};function initRender() {
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
		model_hs.material.opacity = 0.003;
		model_hs.material.transparent = true;

		var p_geometry = new THREE.PlaneGeometry(0.2, 0.17);
		// let p_geometry = new THREE.CircleGeometry( 0.13);
		// let p_geometry = new THREE.SphereGeometry(0.1,16,16, 0, Math.PI*2, 0, Math.PI/2);
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

			plane[i].material.color = new THREE.Color("#335500");
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
			opacity: 0.012
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

////////////
//再帰処理
//////////

var count = 0;
var render_count = 0;
var count_three = 0;

function main() {
	// OrbitControls対応箇所
	controls.update();
	if (vp.v_phase === "1_lets_spin" || vp.v_phase === "0_start_anime") {} else if (vp.v_phase === "2_more_spin") {
		hsGeoGruoup.rotation.y += 2 * Math.PI / 60;
	} else if (vp.v_phase === "3_led_explain") {
		hsGeoGruoup.rotation.y += 2 * Math.PI / 60 * 7;
	} else if (vp.v_phase === "4_led_light_on") {
		if (model_pn.visible) {
			model_pn.visible = 0;
			render_count = 40;
		} else {
			renderer.autoClearColor = false;
			for (var ledNo = 1; ledNo <= 5; ledNo++) {
				if (ledNo % 3 === 1) {
					plane[ledNo].material.color = new THREE.Color('#ff0000');
				}
				if (ledNo % 3 === 2) {
					plane[ledNo].material.color = new THREE.Color('#0000ff');
				}
				if (ledNo % 3 === 0) {
					plane[ledNo].material.color = new THREE.Color('#00e000');
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
		//LED複数の条件を可能にするため、今回の描画で処理されたLEDを記録する。
		var tmp_colored_led = {};

		for (var key in termsTree) {
			var tmpTerm = termsTree[key];
			// console.log(key);
			// メインの描画決定処理
			if (count % tmpTerm['oftenBunbo'] < tmpTerm['oftenBunshi']) {
				plane[tmpTerm['ledNo']].material.color = new THREE.Color(tmpTerm['ledColor']);
				tmp_colored_led[tmpTerm['ledNo']] = 1;
			} else if (tmp_colored_led[tmpTerm['ledNo']] !== 1) {
				plane[tmpTerm['ledNo']].material.color = new THREE.Color('#000000');
			}
		}
		hsGeoGruoup.rotation.y += 2 * Math.PI / 60 * 13;
		// hsGeoGruoup.rotation.y += (2*Math.PI/60)*41 ;
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
		count_three++;
		if (count_three === 2) {
			requestAnimationFrame(main);
			count_three = 0;
		} else {
			main();
		}
	}

	var cameraZ = 1 * Math.cos(count / 200) + 1.1;
	camera.position.set(0, 6, cameraZ);
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
		var led_id = keys.slice(4);
		makeColorPicker(led_id, tmpTerm["ledColor"]);
		// $("#term1 .which_led").val(3);
	}
}
////////////////////////
//formの分子分母をウォッチ
////////////////////////

function initFormWatch(newTermId) {
	$('.how_often_bunbo').change(function () {
		console.log('foo');
		// let test_val = $(this).val();
		var termId = $(this).parent().parent().attr("id");
		// attr("id");
		console.log($(this).val());
		var bunboVal = Number($(this).val());
		// 一度全て削除する
		$('#' + termId + ' .how_often_bunshi').children().remove();

		for (var i = 1; i < bunboVal; i++) {
			// $('#'+termId+' .how_often_bunshi').append($('<option value='i'>'回'</option>'));
			$('#' + termId + ' .how_often_bunshi').append($('<option>').attr({ value: i }).text(i + '回'));
		}
		// ずっとのとき
		console.log(bunboVal === 1);

		if (bunboVal === 1) {
			console.log('came');
			$('#' + termId + ' .how_often_bunshi').append($('<option>').attr({ value: 1 }).text('- '));
		}

		// let how_often = $("#fruits option:selected").val();
		// console.log($('.how_often_bunbo').val());
		// console.log($('.how_often_bunbo').parent().val());
		// console.log($('.how_often_bunbo').parent());
		// let tmp_val = $('.how_often_bunbo').parent().parent();
		//
		// console.log(JSON.stringify(tmp_val));
		// console.log(tmp_val[0]);
		// console.log(this);
		// console.log(this.val());
	});

	if (newTermId) {
		$('#' + newTermId + ' .how_often_bunshi').children().remove();
		$('#' + newTermId + ' .how_often_bunshi').append($('<option>').attr({ value: 1 }).text('- '));
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
			plane[i].material.color = new THREE.Color('#000000');
		}

		termsTree = {};
		$('.form_container').each(function (index, element) {

			var term_id = $(this).attr("id");
			// let term_name ="term" + term_id;
			// console.log(term_name);
			termsTree[term_id] = {
				'ledNo': Number($('#' + term_id + ' .which_led').val()),
				'oftenBunbo': Number($('#' + term_id + ' .how_often_bunbo').val()),
				'oftenBunshi': Number($('#' + term_id + ' .how_often_bunshi').val()),
				'ledColor': $('#' + term_id + ' .which_color').val()
			};
			console.log($('#' + term_id + ' .which_color').val());
			console.log();
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
		props: ["index", "term_id", "term"],
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

	var count = 11; //本当は、初期値は下のtermsの数にした方が良い
	vm = new Vue({
		el: '.app',
		data: {
			terms: [{ id: 1, content: "term1" }, { id: 2, content: "term2" }, { id: 3, content: "term3" }, { id: 4, content: "term4" }, { id: 5, content: "term5" }, { id: 6, content: "term6" }, { id: 7, content: "term7" }, { id: 8, content: "term8" }, { id: 9, content: "term9" }, { id: 10, content: "term10" }, { id: 11, content: "term11" }, { id: 12, content: "term12" }, { id: 13, content: "term13" }],
			term_phase: "not_show"
		},
		methods: {
			addTerm: function addTerm(index) {
				count++;
				var term_id = "term" + count;
				this.terms.push({ id: count, content: term_id });
				setTimeout(function () {
					makeColorPicker(count);
					initFormWatch(term_id);
				}, 100);
				console.log(count);
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
				if (nextPhase === "5_teach_how_to") {
					vm.term_phase = "term_show";
				}
			}
		}
	});
}

function initAnimation() {

	var el = document.getElementById("spinyart_img");
	el.className += " getin_spin";
	setTimeout(function () {
		el.className += " getin_spin";
		vp.v_phase = "4_led_light_on";
		// 桜用

		// animateInWindow();
	}, 4500);
}

function makeColorPicker(num, defaultColor) {
	var picker_id = "picker" + num;
	console.log(picker_id);
	defaultColor = defaultColor ? defaultColor : "#FFFFFF";

	$('#' + picker_id).spectrum({
		color: defaultColor,
		showPalette: true,
		preferredFormat: "hex",
		showInput: true,
		palette: [["#ffffff", "#000000", "#ff0000", '#ff99ff', "#a422ff", "#0000ff", "#00ffff", "#22ff85", "#00e000", "#ff9800", "#f0f000"]]
	});
	// $('#' + picker_id ).spectrum({
	// 	replacerClassName: 'picker_style'
	// });
}

function initSakura() {
	setTimeout(function () {

		vp.v_phase = "5_teach_how_to";
		// 桜用

		// animat
	}, 4550);
}

function initModal() {
	$('#modal-default').iziModal();
	$(document).on('click', '.open-default', function (event) {
		event.preventDefault();
		$('#modal-default').iziModal('open');
		console.log("click");
	});
}

$(document).ready(function () {
	// $(window).fadeThis({speed: 600, distance: 4});
	// $(countScroll());
	// $(addHoverImgChange());
	initVueTerm();
	// initColorPicker();
	initAnimation();
	initSakura();
	initFormDefault();
	initVuePhase();
	initExecBtn();
	initFormWatch();
	initModal();
	$(initRender());
});
//# sourceMappingURL=handspinner.js.map