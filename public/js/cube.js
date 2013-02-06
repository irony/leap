
(function() {

  function getColorMaterial(color) {
    return new THREE.MeshBasicMaterial({color: color});
  }

  window.App = window.App || {};

  App.getCube = function() {
    var geometry = new THREE.CubeGeometry(1,1,1);
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