var WIDTH = 800;
var HEIGHT = 800;
let c_radian = 0;
let r_radian = 0;
let light;
let ambient;
var hsGeoGroupOn = new THREE.Group();
var hsGeoGroupOff = new THREE.Group();

var model_hs;
var model_pn;
var mesh;
var controls;
var plane = {};

var vp = {}; //グローバルなフェイズ管理


// 開発用
vp.v_phase = "5_teach_how_to";


const colorConf = {
	'red': '#ff0000', 'yellow': '#f0f000', 'green': '#00e000', 'skyblue': '#00ffff',
	'blue': '#0000ff', 'black': '#000000', 'dark' : '#335500', 'white': '#ffffff', 'pink' : '#ff99ff'
};

// レンダラー
let renderer = new THREE.WebGLRenderer({
  preserveDrawingBuffer:true
});
// renderer.autoClearColor = false;
renderer.setSize( WIDTH, HEIGHT );
// renderer.setClearColor(0xffffff);


// canvasを配置
document.getElementById('stage').appendChild(renderer.domElement)

// メイン描画用のシーンとカメラ
var sceneOn = new THREE.Scene();
var sceneOff = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 70, WIDTH / HEIGHT, 1, 100 );
//light
light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 200, 80);
sceneOff.add(light);
sceneOn.add(light);
ambient = new THREE.AmbientLight(0x404040);
sceneOff.add(ambient);
sceneOn.add(ambient);
//背景の定義
var scene_bg = new THREE.Scene();
var camera_bg = new THREE.OrthographicCamera(0, WIDTH, HEIGHT, 0, 0, 1000);
// メイン描画オブジェクト

//JSONをロード
let loader = new THREE.JSONLoader();　　
let modelPath = '../src/data/hs300k.json'
// modelPath = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1538236/hs300k.json";

////////////
//初期カラー
//////////
var termsTree = {
	term1 : {
		ledNo : 1,
		oftenBunbo : 3,
		oftenBunshi: 1,
		ledColor : 'red'
	},
	term2 : {
		ledNo : 2,
		oftenBunbo : 3,
		oftenBunshi : 1,
		ledColor : 'red'
	},
	term3 : {
		ledNo : 3,
		oftenBunbo : 3,
		oftenBunshi: 1,
		ledColor : 'red'
	},
	term4 : {
		ledNo : 4,
		oftenBunbo : 3,
		oftenBunshi: 1,
		ledColor : 'green'
	},
	term5 : {
		ledNo : 5,
		oftenBunbo : 3,
		oftenBunshi: 1,
		ledColor : 'green'
	}
}



function initRender () {
	loader.load(modelPath, (geo, mat) => {
		let hsGroupOn = new THREE.Group();
		let hsGroupOff = new THREE.Group();

		for (let hs_num=0 ; hs_num<3 ;hs_num++ ) {

			let geometry = geo;
			let material = mat;
			let scale_hs = 1;
		  //let BasicMat = new THREE.MeshBasicMaterial(mat);
		  let BasicMat = new THREE.MeshBasicMaterial(mat);
		  let PhongMat = new THREE.MeshPhongMaterial(mat);
		  BasicMat.color = new THREE.Color("#ffffff");
		  BasicMat.wireframe = true;

		  model_hs = new THREE.Mesh(geo, BasicMat);
		  model_pn = new THREE.Mesh(geo, PhongMat);

			model_hs.scale.set(scale_hs, scale_hs, scale_hs);
			model_pn.scale.set(scale_hs*1.05, scale_hs*1.05, scale_hs*1.05);
			model_pn.material.color = new THREE.Color("#cccccc");
			model_hs.material.opacity =0.13;
			model_hs.material.transparent = true;

			let p_geometry = new THREE.PlaneGeometry( 0.2, 0.17);
			// let p_geometry = new THREE.CircleGeometry( 0.13);
			// let p_geometry = new THREE.SphereGeometry(0.1,16,16, 0, Math.PI*2, 0, Math.PI/2);
			// p_geometry.rotation.y = (Math.PI) / 4  ;

			///////
			// 場所をずらす
			model_pn.position.y = hs_num * 10;
			model_hs.position.y = hs_num * 10;


			// ハンドスピナーとLEDライト５個をグループに
			// let hsGeoGruoup = new THREE.Group();

				// renderer.preserveDrawingBuffer = "true";
				// renderer.autoClearColor = "false";
			hsGroupOn.add(model_pn);
			hsGroupOff.add(model_hs);

			hsGeoGroupOn.add(hsGroupOn);
			hsGeoGroupOff.add(hsGroupOff);

			for (let shamFrame=1 ; shamFrame <=60 ; shamFrame++) {

				let planeGroup = new THREE.Group()
				for (let keyNo=1;keyNo <= 5; keyNo++) {
					let tmpTerm = termsTree['term'+keyNo];
					console.log(tmpTerm);
					// let p_material = new THREE.MeshBasicMaterial( { side: THREE.DoubleSide} );
					let p_material = new THREE.MeshPhongMaterial( );
					plane[keyNo] = new THREE.Mesh( p_geometry, p_material );
				  plane[keyNo].rotation.x = -(Math.PI) / 2  ;

					//平面の位置を少しずつずらす。
					plane[keyNo].position.z =0.27*keyNo + 1.2;
					//画面に対する奥行き方向は変更なしで2
					plane[keyNo].position.y =0.39;

					plane[keyNo].material.color = new THREE.Color(colorConf['dark']);
					plane[keyNo].visible = 1;

					let tmp_colored_led = {};
					if (shamFrame % tmpTerm['oftenBunbo'] < tmpTerm['oftenBunshi']) {
						plane[tmpTerm['ledNo']].material.color
							= new THREE.Color(tmpTerm['ledColor']);
						// tmp_colored_led[tmpTerm['ledNo']] = 1;
						console.log(tmpTerm['ledColor']);
					// } else if (tmp_colored_led[tmpTerm['ledNo']] !== 1) {
					} else {
						plane[tmpTerm['ledNo']].material.color
							// = new THREE.Color(colorConf['blue']);
							= new THREE.Color('#ff0000');

					}
				  // 先ほどのboxをグループに追加
					plane[keyNo].position.y = hs_num * 10 +0.45;
					// plane[keyNo].rotation.y = (2*Math.PI /60) * shamFrame;
				  planeGroup.add(plane[keyNo]);
					//hsGeoGruoup.add(model_pn);

				}
				planeGroup.rotation.y = (2*Math.PI /60) * shamFrame;
				hsGeoGroupOff.add( planeGroup);
			}


		}
		//cameraの位置を設定
		camera.position.set(0, 100, 0);
		camera.lookAt({x:0, y:0, z:0 });


		sceneOn.add(hsGeoGroupOn);
		sceneOff.add(hsGeoGroupOff);

		controls = new THREE.OrbitControls(camera, renderer.domElement);
	  main();
	});
}


let count = 0;
let render_count = 0;
let count_three = 0;

function main() {

	// OrbitControls対応箇所
	 controls.update()
	// if (vp.v_phase === "1_lets_spin" || vp.v_phase === "0_start_anime" ) {
	//
	// } else if (vp.v_phase === "2_more_spin") {
	// 	hsGeoGroup.rotation.y += (2*Math.PI /60);
	// } else if ( vp.v_phase === "3_led_explain") {
	// 	hsGeoGroup.rotation.y += (2*Math.PI /60)*7 ;
	// } else if (vp.v_phase === "4_led_light_on"){
	// 	if (model_pn.visible ) {
	// 		model_pn.visible = 0;
	// 		render_count = 40;
	// 	} else {
	// 		renderer.autoClearColor = false;
	// 		for (let ledNo = 1 ; ledNo<=5; ledNo++) {
	// 			if (ledNo %3 ===1) { plane[ledNo].material.color = new THREE.Color(colorConf["red"]);}
	// 			if (ledNo %3 ===2) { plane[ledNo].material.color = new THREE.Color(colorConf["blue"]);}
	// 			if (ledNo %3 ===0) { plane[ledNo].material.color = new THREE.Color(colorConf["yellow"]);}
	// 			plane[ledNo].visible = 1;
	// 		}
	// 		render_count = "step4_done";
	// 	}
	//
	// 	// hsGeoGruoup.rotation.y += (2*Math.PI /60)*41 ;
	// } else {
		// 追記
		// model_pn.visible = 0;
	renderer.autoClearColor = true;
		// for (let ledNo = 1 ; ledNo<=5; ledNo++) {
		// 	if (ledNo %3 ===1) { plane[ledNo].material.color = new THREE.Color(colorConf["red"]);}
		// 	if (ledNo %3 ===2) { plane[ledNo].material.color = new THREE.Color(colorConf["blue"]);}
		// 	if (ledNo %3 ===0) { plane[ledNo].material.color = new THREE.Color(colorConf["yellow"]);}
		// 	plane[ledNo].visible = 1;
		// }


		// if (render_count === "step4_done") {
		// 	render_count = Number(30);
		// 	initFormDefault();
		// }
		// //LED複数の条件を可能にするため、今回の描画で処理されたLEDを記録する。
		// let tmp_colored_led = {};
		//
		// for (let key in termsTree ) {
		// 	let tmpTerm = termsTree[key];
		// 	// console.log(key);
		// 	// メインの描画決定処理
		// 	if (count % tmpTerm['oftenBunbo'] < tmpTerm['oftenBunshi']) {
		// 		plane[tmpTerm['ledNo']].material.color
		// 			= new THREE.Color(tmpTerm['ledColor']);
		// 		tmp_colored_led[tmpTerm['ledNo']] = 1;
		// 	} else if (tmp_colored_led[tmpTerm['ledNo']] !== 1) {
		// 		plane[tmpTerm['ledNo']].material.color
		// 			= new THREE.Color(colorConf['black']);
		// 	}
		//
		//
		//
		// }
		// hsGeoGroup.rotation.y += (2*Math.PI/60)*41 ;

	// }

	// LEDの色の表示

	count ++;

	// 開発ライト切り替え
  // renderer.render( sceneOn, camera );
  renderer.render( sceneOff, camera );

	// 初期表示
	if (render_count < 60) {
		render_count++;
		main();
	} else {

		count_three ++ ;
		if (count_three === 2) {
			requestAnimationFrame(main);
			count_three = 0;
		} else {
			main();
		}

	}

}

function initFormDefault () {
	// 初期のform 表示用
	for (let keys in termsTree) {
		let tmpTerm = termsTree[keys];
		// $("#tmpTerm .which_led[@vulue=" + tmpTerm["ledNo"] + "]").attr("checked","checked");
		// $('"#'+'term1'+' .which_led'+'"').val(tmpTerm["ledNo"]);
		$('#'+keys+' .which_led').val(tmpTerm["ledNo"]);
		$('#'+keys+' .how_often_bunbo').val(tmpTerm["oftenBunbo"]);
		$('#'+keys+' .how_often_bunshi').val(tmpTerm["oftenBunshi"]);
		$('#'+keys+' .which_color').val(tmpTerm["ledColor"]);
		// $("#term1 .which_led").val(3);
	}

}

////////////////////////
//条件を反映ボタンを押すとき
////////////////////////
function initExecBtn() {
  $('#exe_btn').click(function() {
    // 分母
		//初期化
		for (let i=1 ; i <= 5; i++) {
			plane[i].material.color = new THREE.Color(colorConf['black']);
		}

		termsTree={};
		$('.form_container').each(function(index, element){

			let term_id = $(this).attr("id");
			// let term_name ="term" + term_id;
			// console.log(term_name);
			termsTree[term_id] = {
				'ledNo'
					: Number($('#'+term_id+' .which_led').val()),
				'oftenBunbo'
					: Number($('#'+ term_id+' .how_often_bunbo').val()),
				'oftenBunshi'
					: Number($('#'+ term_id+' .how_often_bunshi').val()),
				'ledColor'
					: $('#'+ term_id+' .which_color').val()
			};

		});

		render_count = 0;

  })
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

function initVueTerm () {

	Vue.component('termComponent', {
		template: '#term-component',
		props: ["index", "term_id","term"],
		methods: {
			deleteTerm: function() {
				console.log(this.index);
				this.$emit('delete-term',(this.index));//なぜかindexがうまく取れない
			}
		}
		// },
		// mounted: function () {
		// 	// console.log(this.$ref.foo);
		// }
	});

	let count = 5;//本当は、初期値は下のtermsの数にした方が良い
	var vm = new Vue({
		el: '#app',
		data: {
			terms:[
				{id:1, content:"term1"},
				{id:2, content:"term2"},
				{id:3, content:"term3"},
				{id:4, content:"term4"},
				{id:5, content:"term5"}
		 	]
	 	},

		methods: {
			addTerm: function() {
				count++;
				let term_id= "term"+count;
				this.terms.push(
					{id:count, content:term_id}
				);
			},
			// deleteTermEmit: function(index) {
			deleteTermEmit: function(index) {
				// if(confirm("この条件をほんとうに消しますか")) {
					this.terms.splice(index,1)
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
			v_phase : "0_start_anime"
			//フェイズは以下がある。
			//(0) : 0_start_anime
			//(1) : 1_lets_spin
			//(2) : 2_more_spin
			//(3) : 3_led_explain
			//(4) : 4_led_light_on

			//(5) : 5_teach_how_to
		},
		methods: {
			changePhase (nextPhase) {
				vp.v_phase = nextPhase;
				console.log("phase"+nextPhase);
			}
		}
	});
	// vp.v_phase = "2_more_spin";
}

function initAnimation() {

	let el = document.getElementById("spinyart_img");
	el.className += " getin_spin";
	setTimeout( ()=>{
		el.className += " getin_spin";
		vp.v_phase = "1_lets_spin";
		// animateInWindow();
	},4500);


}

function initColorPicker() {
	for (let picker_cnt=1; picker_cnt <= 5; picker_cnt++ ) {
		makeColorPicker(picker_cnt);
	}
}

function makeColorPicker(num) {
	let picker_id = "picker"+ num;
	$('#' + picker_id ).spectrum({
		color: "#ffffff",
		showPaletteOnly: true,
		palette: [
			["#ffffff",  "#000000","#f44336", "#ff9800", "#ffeb3b", "#8bc34a", "#4caf50", "#03a9f4", "#2196f3"]
		]
	});
	// $('#' + picker_id ).spectrum({
	// 	replacerClassName: 'picker_style'
	// });
}


$(document).ready(function() {
	// $(window).fadeThis({speed: 600, distance: 4});
	// $(countScroll());
	// $(addHoverImgChange());
	// initVueTerm();
	// initColorPicker();
	// initVuePhase();
	// initFormDefault();
	// initExecBtn();
	// initAnimation();
	$(initRender());

});
