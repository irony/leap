
(function() {

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  var geometry = new THREE.CubeGeometry(1, 1 ,1);
  var material = new THREE.MeshBasicMaterial({ color: 0x000000 });
  var handModel = new THREE.Mesh(geometry, material);

  var hands = [];

  camera.position.z = 5;

  function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
   // cube.rotation.x += 0.1;
   // cube.rotation.y += 0.1;
  }
  render();



  var ws;

  // Support both the WebSocket and MozWebSocket objects
  if ((typeof(WebSocket) == 'undefined') &&
      (typeof(MozWebSocket) != 'undefined')) {
    WebSocket = MozWebSocket;
  }

  // Create the socket with event handlers
  function init() {
    //Create and open the socket
    ws = new WebSocket("ws://localhost:6437/");
    
    // On successful connection
    ws.onopen = function(event) {
      // document.getElementById("connection").innerHTML = "WebSocket connection open!";
    };
    
    // On message received
    ws.onmessage = function(event) {
      var obj = JSON.parse(event.data);
      var str = JSON.stringify(obj, undefined, 2);
      
      if (hands.length !== obj.hands.length)
      {
        scene.add(hand2);
      }

      var hand = obj && obj.hands && obj.hands.length && obj.hands.pop();


      document.getElementById("output").innerHTML = '<pre>' + hand.palmPosition[1] + '</pre>';
      cube.rotation.x = hand.direction[0];
      cube.rotation.y = hand.direction[1];
      cube.rotation.z = hand.direction[2];
      cube.position.x = hand.palmPosition[0] / 200;
      cube.position.y = hand.palmPosition[1] / 200;
      cube.position.z = hand.palmPosition[2] / 200;
      
    };
    
    // On socket close
    ws.onclose = function(event) {
      ws = null;
      //document.getElementById("main").style.visibility = "hidden";
      //document.getElementById("connection").innerHTML = "WebSocket connection closed";
    }
    
    //On socket error
    ws.onerror = function(event) {
      alert("Received error");
    };
  }
  init();

}());