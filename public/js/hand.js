
(function() {

  function getColorMaterial(color) {
    return new THREE.MeshBasicMaterial({color: color});
  }

  window.App = window.App || {};

  App.getHand = function(size) {
    size = size || 1;
    var geometry = new THREE.CubeGeometry(size,size,size);
    var material = new THREE.MeshFaceMaterial([
      getColorMaterial(0xff0000),
      getColorMaterial(0x00ff00),
      getColorMaterial(0x0000ff),
      getColorMaterial(0xffff00),
      getColorMaterial(0xff00ff),
      getColorMaterial(0x00ffff)]);
    var cube = new THREE.Mesh(geometry, material);
    return cube;
  }
  

}());