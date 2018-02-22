var WIDTH = 400;
var HEIGHT = 400;
let c_radian = 0;
let r_radian = 0;
let light;
let ambient;
var hsGeoGruoup = new THREE.Group();;

const colorConf = {
	'red': '#ff0000',
	'yellow': '#f0f000',
	'green': '#00e000',
	'skyblue': '#00ffff',
	'blue': '#0000ff',
	'black': '#000000',
	'dark' : '#335500',
	'white': '#ffffff',
	'pink' : '#ff99ff'
};

// レンダラー
let renderer = new THREE.WebGLRenderer({
  preserveDrawingBuffer:true
});
renderer.setSize( WIDTH, HEIGHT );
renderer.setClearColor(0xffffff);
renderer.autoClearColor = false;

// canvasを配置
document.getElementById('stage').appendChild(renderer.domElement)

// メイン描画用のシーンとカメラ
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 70, WIDTH / HEIGHT, 1, 100 );

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
let loader = new THREE.JSONLoader();　　
let modelPath = '../src/data/hs300k.json'
// modelPath = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1538236/hs300k.json";
let model_hs;
let model_pn;
var mesh;
var plane = {};

////////////
//初期カラー
//////////
let termsTree = {
	term1 : {
		ledNo : 1,
		oftenBunbo : 1,
		oftenBunshi: 1,
		ledColor : 'red'
	},
	term2 : {
		ledNo : 2,
		oftenBunbo : 1,
		oftenBunshi: 1,
		ledColor : 'blue'
	},
	term3 : {
		ledNo : 3,
		oftenBunbo : 2,
		oftenBunshi: 1,
		ledColor : 'red'
	},
	term4 : {
		ledNo : 4,
		oftenBunbo : 1,
		oftenBunshi: 1,
		ledColor : 'blue'
	},
	term5 : {
		ledNo : 5,
		oftenBunbo : 6,
		oftenBunshi: 3,
		ledColor : 'green'
	}
}

function initRender () {
	loader.load(modelPath, (geo, mat) => {
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
		model_hs.material.opacity =0.01;
		model_hs.material.transparent = true;

		let p_geometry = new THREE.PlaneGeometry( 0.16, 0.1);
		// p_geometry.rotation.y = (Math.PI) / 4  ;


		// ハンドスピナーとLEDライト５個をグループに
		// let hsGeoGruoup = new THREE.Group();
		hsGeoGruoup.add(model_hs);

		for (let i=1;i <= 5; i++) {
			let p_material = new THREE.MeshBasicMaterial( { side: THREE.DoubleSide} );
			plane[i] = new THREE.Mesh( p_geometry, p_material );
		  plane[i].rotation.x = (Math.PI) / 2  ;

			//平面の位置を少しずつずらす。
			plane[i].position.z =0.14*i + 1.5;
			//画面に対する奥行き方向は変更なしで2
			plane[i].position.y =1.6;

			plane[i].material.color = new THREE.Color(colorConf['dark']);

		  // 先ほどのboxをグループに追加
		  hsGeoGruoup.add(plane[i]);
		  //hsGeoGruoup.add(model_pn);
		}

		scene.add( hsGeoGruoup );


	  let bg_geometry = new THREE.PlaneGeometry(WIDTH, HEIGHT, 10, 10);
	  let bg_material = new THREE.MeshBasicMaterial({
	    color: 0x000000,
	    transparent: true,
	    opacity: 0.01,
	  });


	  let bg = new THREE.Mesh(bg_geometry, bg_material);
	  bg.position.x = WIDTH/2;
	  bg.position.y = HEIGHT/2;
	  scene_bg.add(bg);

	  main();
	});
}


let count = 0;
let render_count = 0;

function main() {

	//cameraの位置を設定
	camera.position.set(0, 6, 0);
	camera.lookAt({x:0, y:0, z:0 });

  //hsGeoGruoup.rotation.y += 0.23 ;
  // hsGeoGruoup.rotation.y += (2*Math.PI /30)*19.001 ;
   hsGeoGruoup.rotation.y += (2*Math.PI /60)*41 ;

	// model_hs.position.y += (Math.sin(r_radian) - Math.sin(r_radian-0.01))*8;
	// model_pn.position.y += (Math.sin(r_radian) - Math.sin(r_radian-0.01))*8;
	//for (let termNo=1; termNo <=termnokazu; termNo++ ) {

	// LEDの色の表示
	for (let key in termsTree ) {
		let tmpTerm = termsTree[key];

		if (count % tmpTerm['oftenBunbo'] < tmpTerm['oftenBunshi']) {
			plane[tmpTerm['ledNo']].material.color
				= new THREE.Color(colorConf[tmpTerm['ledColor']]);
		} else {
			plane[tmpTerm['ledNo']].material.color
				= new THREE.Color(colorConf['black']);
		}
	}
	count ++;

  renderer.render( scene_bg, camera_bg );
  renderer.render( scene, camera );

	// 初期表示
	if (render_count < 60) {
		render_count++;
		main();
	} else {
		requestAnimationFrame(main);
	}


}

function initFormDefault () {
	// 初期のform 表示用
	for (let key in termsTree) {
		let tmpTerm = termsTree[key];
		// $("#tmpTerm .which_led[@vulue=" + tmpTerm["ledNo"] + "]").attr("checked","checked");
		// $('"#'+'term1'+' .which_led'+'"').val(tmpTerm["ledNo"]);
		$('#'+key+' .which_led').val(tmpTerm["ledNo"]);
		$('#'+key+' .how_often_bunbo').val(tmpTerm["oftenBunbo"]);
		$('#'+key+' .how_often_bunshi').val(tmpTerm["oftenBunshi"]);
		$('#'+key+' .which_color').val(tmpTerm["ledColor"]);
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

function initVue () {

	Vue.component('termComponent', {
		template: '#term-component',
		methods: {
			deleteTerm: function() {
				this.$emit('delete-term',(this._uid - 1));//なぜかindexがうまく取れない
			}
		}
	});

	let count = 5;//本当は、初期値は下のtermsの数にした方が良い
	var vm = new Vue({
		el: '#app',
		data: {
			terms:[
				{id:1, content:"term1" },{id:2, content:"term2"},{id:3, content:"term3"},
				{id:4, content:"term4"},{id:5, content:"term5"}
		 	]
	 	},
		methods: {
			addTerm: function() {
				count++;
				this.terms.push(
					{id:count, content:count}
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


$(document).ready(function() {
	// $(window).fadeThis({speed: 600, distance: 4});
	// $(countScroll());
	// $(addHoverImgChange());
	initVue();
	initFormDefault();
	initExecBtn();
	$(initRender());

});
