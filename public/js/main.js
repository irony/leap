
(function() {

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  var handModel = App.getHand();

  var hands = [];

  camera.position.z = 5;

  scene.add(handModel);

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
      var count = 0;

      obj.hands.map(function(hand){
        count++;

        var handModel = hands.length < count ? null : hands[count];
        if (!handModel){
          handModel = new THREE.Mesh(geometry, material);
          scene.add(handModel);
          hands.push(handModel);
        }

        handModel.rotation.x = (handModel.rotation.x + hand.direction[0]) / 2;
        handModel.rotation.y = (handModel.rotation.y + hand.direction[1]) / 2;
        handModel.rotation.z = (handModel.rotation.z + hand.direction[2]) / 2;
        handModel.position.x = (handModel.position.x + hand.palmPosition[0] / 100) / 2;
        handModel.position.y = (handModel.position.y + hand.palmPosition[1] / 100) / 2;
        handModel.position.z = (handModel.position.z + hand.palmPosition[2] / 100) / 2;
      });
    
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