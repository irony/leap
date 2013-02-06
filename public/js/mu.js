
// Stage
// =========
//
var Stage = function(options) {
  _.bindAll(this);
  this.cubes = [];
  this.scene = new THREE.Scene();
  this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  this.renderer = new THREE.WebGLRenderer();

  var socket = typeof(MozWebSocket) !== 'undefined' ? MozWebSocket : WebSocket;
  this.ws = new socket(options.ws);
  this.ws.onmessage = this.socketMessage;
  this.render();
};

Stage.prototype = {

  // callback for when the socket recieves
  // messages
  socketMessage: function(evt) {
    var msg = JSON.parse(event.data);

    // add cube
    if (msg.hands.length > this.cubes.length) {
      var cube = new Cube();
      this.cubes.push(cube);
      this.scene.add(cube.model);
    }

    // remove cube
    if (msg.hands.length < this.cubes.length) {
      var cube = this.cubes.pop();
      this.scene.remove(cube.model);
    }

    // update the cubes positions.
    this.handleCubes(msg);
  },

  // enumerates all the cubes
  // and update their position
  handleCubes: function(msg) {
    var i, cube, hand;
    for(i = 0; i < msg.hands.length; i++) {
      cube = this.cubes[i];
      hand = msg.hands[i];
      cube.model.position = {
        x: hand.palmPosition[0] / 2,
        y: hand.palmPosition[1] / 2,
        z: 1
      };

      cube.model.scale = {
        x: hand.palmPosition[2],
        y: hand.palmPosition[2],
        z: 1
      };
    }
  },

  // render
  render: function() {
    requestAnimationFrame(this.render);
    this.renderer.render(this.scene, this.camera);
  }

};

// Cube
// ===========
//
var Cube = function() {
  var m = THREE.MeshBasicMaterial;
  var geometry = new THREE.CubeGeometry(1,1,1);
  var material = new THREE.MeshFaceMaterial([
      new m({ color: 0xff0000}),
      new m({ color: 0x00ff00}),
      new m({ color: 0x0000ff}),
      new m({ color: 0xffff00}),
      new m({ color: 0xff00ff}),
      new m({ color: 0x00ffff})
  ]);
  this.model = new THREE.Mesh(geometry, material);
};

// Initialize
window.stage = new Stage({ ws: 'ws://localhost:6437/' });
