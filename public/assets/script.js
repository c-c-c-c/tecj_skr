'use strict';

var vm = new Vue({
  el: '#mycounter',
  data: {
    count: 0
  },
  methods: {
    countUp: function countUp() {
      this.count++;
      changeRotateSpeed();
    }
  }
});

var vm_stop = new Vue({
  el: '#mystop',
  methods: {
    hsStop: function hsStop() {
      Speed_0();
    }
  }
});

var howManySpinners = 200;
var scene = new THREE.Scene();
var box = void 0;
var controls = void 0;
var renderer = [];
var camera = void 0;
var model = [];
//let model = {};
var model2 = {};
var model3 = {};
var rotate_speed = 0.05;
var r_radian = 0;
var c_radian = 0;
var geometry = void 0;
var material = void 0;
var scroll_px = 0;
var delta_scroll_px = 0;
var sum_delta_scroll_px = 0.05;
var $window = $(window);

function renderHandSpinner() {
  'use strict';

  var light = void 0;
  var ambient = void 0;
  var gridHelper = void 0;
  var axisHelper = void 0;
  var lightHelp = void 0;
  var width = 960;
  var height = 160;
  var modelPath = void 0;

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
  for (var i = 0; i < 2; i++) {
    renderer[i] = new THREE.WebGLRenderer({ antialias: true });
    renderer[i].setSize(width, height);
    //renderer.setClearColor(0xefefef);
    renderer[i].setClearColor(0xffffff);
    renderer[i].setPixelRatio(window.devicePixelRatio);

    document.getElementsByClassName('stage')[i].appendChild(renderer[i].domElement);
  }
  //modelPath = 'src/bear.json';
  //modelPath = 'src/handspiner_3d.json';
  //modelPath = '../src/data/handspiner_3d_geo.json';
  modelPath = './src/data/handspiner_3d_geo.json';
  //modelPath = '/Users/yoshimurahiroyuki/workspace/threejs/src/handspiner.json';

  var loader = new THREE.JSONLoader();
  loader.load(modelPath, function (geo, mat) {
    //let phongMat = new THREE.MeshPhongMaterial(mat);
    //let phongMat2 = new THREE.MeshPhongMaterial(mat);
    //let phongMat3 = new canvasE.MeshPhongMaterial(mat);
    //for (let mt of faceMat.materials) {
    //  mt.color = new THREE.Color(0xffcc88);
    //}
    geometry = geo;
    material = mat;

    for (var _i = 0; _i < howManySpinners; _i++) {
      var phongMat = new THREE.MeshPhongMaterial(mat);
      model[_i] = new THREE.Mesh(geo, phongMat);

      var randX = 1800 * Math.random() - 900;
      var randY = 700 * Math.random() - 150;
      var randZ = 400 * Math.random() - 200;

      if (_i == 0) {
        model[_i].position.set(0, 20, 0);
      } else {
        model[_i].position.set(randX, randY, randZ);
      }

      model[_i].scale.set(0.5, 0.5, 0.5);
      var randColor = Math.random() * 0xffffff;
      model[_i].material.color = new THREE.Color(randColor);
      scene.add(model[_i]);
    }
    render();
  });
}

function addSpinner() {
  var phongMat = new THREE.MeshPhongMaterial(material);
  model = new THREE.Mesh(geometry, phongMat);
  var randX = 800 * Math.random();
  var randY = 800 * Math.random();
  var randZ = 800 * Math.random();

  var size = Math.random();
  model.scale.set(size, size, size);
  model.position.set(randX, randY, randZ);
  var randColor = Math.random() * 0xffffff;
  model.material.color = new THREE.Color(randColor);
  scene.add(model);
}

function render() {

  requestAnimationFrame(render);
  r_radian += 0.01;

  for (var i = 0; i < howManySpinners; i++) {
    if (delta_scroll_px < 0) {
      rotate_speed = 0;
      sum_delta_scroll_px = 0;
    } else {
      rotate_speed = sum_delta_scroll_px / 1500 + 0.05;
    }

    model[i].rotation.y += rotate_speed;
    model[i].position.y += (Math.sin(r_radian) - Math.sin(r_radian - 0.01)) * 150;
  }

  c_radian += 0.007;
  var cameraZ = 150 * Math.sin(c_radian) + 150;
  // let cameraZ = 0; 
  camera.position.set(0, 600, cameraZ);

  //controls.update();
  renderer[0].render(scene, camera);
  renderer[1].render(scene, camera);
}

function changeRotateSpeed() {
  //controls.autoRotateSpeed = vm.count*10;
  rotate_speed += vm.count * 0.01;
  for (var i = 0; i < howManySpinners; i++) {

    model[i].rotation.y = 1.8 * vm.count;
  }
}

function Speed_0() {
  vm.count = 0;
  rotate_speed = 0;
  //addSpinner();
}

function countScroll() {
  // スクロールしたら発動
  $window.scroll(function () {
    var before_scroll_px = scroll_px;
    console.log(sum_delta_scroll_px);
    // スクロール量を変数に格納
    scroll_px = $(this).scrollTop();
    delta_scroll_px = scroll_px - before_scroll_px;
    sum_delta_scroll_px += delta_scroll_px;
    //		console.log("scroll:"+scroll_px);													 
    //		console.log("before" + before_scroll_px);													 
    //		console.log("delta" + delta_scroll_px);													 
    // HTMLにスクロール量を表示
    $('#sc').text(sum_delta_scroll_px);
    $('#dsc').text(delta_scroll_px);
  });
}

$(document).ready(function () {
  $(countScroll());
  renderHandSpinner();
});
//# sourceMappingURL=script.js.map