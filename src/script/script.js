let howManySpinners = 200;
let scene = new THREE.Scene();
let box;
let controls;
let renderer = [];
let camera;
let model = [];
//let model = {};
let model2 = {};
let model3 = {};
let rotate_speed = 0.05;
let r_radian = 0;
let c_radian = 0;
let r_radian_speed =0.01;
let c_radian_speed =0.007;
let count = 0;

let geometry;
let material;
let scroll_px = 0;
let delta_scroll_px = 0;
let sum_delta_scroll_px = 0.05;
const $window = $(window);

function renderHandSpinner () {
  'use strict';
  let light;
  let ambient;
  let gridHelper;
	let axisHelper;
  let lightHelp;
  let width = 960;
  let height = 160;
	let modelPath ;

   //light
  light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(0, 200, 80);
  scene.add(light);
  ambient = new THREE.AmbientLight(0x404040);
  scene.add(ambient);

	//camera
  camera = new THREE.PerspectiveCamera(45, 4, 1, 1000);
  camera.position.set(0, 400, 300);
  camera.lookAt(scene.position);

  // helper 現在は非表示
  //gridHelper = new THREE.GridHelper(200, 50);
  //scene.add(gridHelper);
  //axisHelper = new THREE.AxisHelper(1000);
  //scene.add(axisHelper);
  //lightHelper = new THREE.DirectionalLightHelper(light , 20)
  //scene.add(lightHelper);

  //controls
	//controls = new THREE.OrbitControls(camera);
  //cameraの自動回転
  //controls.autoRotate = true;
 // controls.autoRotateSpeed = 1.5;

  // renderer
  for (let i= 0 ; i < 4; i++ ) {
  	renderer[i] = new THREE.WebGLRenderer({ antialias: true });
  	renderer[i].setSize(width, height);
  	renderer[i].setClearColor(0xffffff);
  	renderer[i].setPixelRatio(window.devicePixelRatio);

		document.getElementsByClassName('stage')[i].appendChild(renderer[i].domElement);
	}

  //modelPath = '../src/data/handspiner_3d_geo.json';
  modelPath = './src/data/handspiner_3d_geo.json';
	//modelPath = '/Users/yoshimurahiroyuki/workspace/threejs/src/handspiner.json';

  let loader = new THREE.JSONLoader();　　
  loader.load(modelPath, function(geo, mat) {　　　

    geometry = geo;
    material = mat;

		for (let i=0; i < howManySpinners; i++ ) {
      let phongMat = new THREE.MeshPhongMaterial(mat);
      model[i] = new THREE.Mesh(geo, phongMat);

			let randX = 1800 * Math.random()-900;
			let randY = 700 * Math.random()-150;
			let randZ = 400 * Math.random()-200;

      if (i==0) {
				model[i].position.set(0, 20, 0);
			} else {
				model[i].position.set(randX, randY, randZ);
			}　　

    	model[i].scale.set(0.5, 0.5, 0.5);　
    	let randColor = Math.random() * 0xffffff ;　　　
    	model[i].material.color = new THREE.Color(randColor);
    	model[i].material.opacity = 0.4;
			model[i].material.transparent = true;
			scene.add(model[i]);　　　
		}
    render();
  });　
}

/*
function addSpinner () {
  let phongMat = new THREE.MeshPhongMaterial(material);
  model = new THREE.Mesh(geometry, phongMat);
	let randX = 800 * Math.random();
	let randY = 800 * Math.random();
	let randZ = 800 * Math.random();

  let size = Math.random();
	model.scale.set(size, size, size);　　　
  model.position.set(randX, randY, randZ);
	let randColor = Math.random() * 0xffffff;　　　
	model.material.color = new THREE.Color(randColor);
	scene.add(model);　
}
*/


function render () {

  requestAnimationFrame(render);
  r_radian += r_radian_speed;
  count++;

	for (let i=0; i < howManySpinners; i++ ) {
  	if( delta_scroll_px < 0 )  {
			rotate_speed = 0;
			sum_delta_scroll_px = 0;
			r_radian_speed=0;
			c_radian_speed=0;
		} else {
			rotate_speed =  sum_delta_scroll_px/6000 + 0.05;
			r_radian_speed=0.01;
			c_radian_speed=0.007;
		}

		model[i].rotation.y += rotate_speed;
    model[i].position.y += (Math.sin(r_radian) - Math.sin(r_radian-r_radian_speed))*150 ;


		if (rotate_speed == 0 ) {
			if (count%50 < 25 ) {
				model[i].rotation.y += 0.02;
			} else {
				model[i].rotation.y -= 0.02;
			}
		}
	}

	c_radian += c_radian_speed;
  let cameraZ = 150 * (Math.sin(c_radian)) +150;
	camera.position.set(0, 600, cameraZ);

	for (let i=0; i<4; i++) {
  	renderer[i].render(scene, camera);
  	//controls.update();
	}
}


function countScroll () {
	// スクロールしたら発動
	$window.scroll(function() {
		let before_scroll_px = scroll_px;
		console.log(sum_delta_scroll_px);
		// スクロール量を変数に格納
		scroll_px = $(this).scrollTop();
		delta_scroll_px = (scroll_px) - (before_scroll_px);
		sum_delta_scroll_px +=delta_scroll_px;

	});
}

function addHoverImgChange () {
	$( '.item_box' ).hover((e)=>{

			$(e.currentTarget).find("img").each((i, ev)=>{
				if ($(ev).attr("class") == "not_spin"  ){
					$(ev).animate({opacity: 0});//
				} else {
					$(ev).animate({opacity: 1});
				}
			});

	},(e)=>{

		$(e.currentTarget).find("img").each((i, ev)=>{
			if ($(ev).attr("class") == "not_spin"  ){
				$(ev).animate({opacity:1});
			} else {
				$(ev).animate({opacity:0});
			}
		});
	});
}

/*
function addHoverImgChange() {
	let notSpinImages = document.getElementsByClassName("not_spin")
	const ImageN = 6;
	for (i=0 ;i<6; i++ ){
		notSpinImages[i].addEve

	}
*/




$(document).ready(function() {
	$(countScroll());
	$(addHoverImgChange());
	renderHandSpinner();
});
