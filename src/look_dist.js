import { Vector4 } from 'three';

AFRAME.registerComponent('look-dist', {
  schema: {
    target: { type: 'selector' },
    radius: { type: 'number' }
  },

  tick: function () {
    var cameraEl = this.el.sceneEl.camera.el;
    var view = cameraEl.object3D.matrixWorldInverse;
    var pos = this.data.target.object3D.position;
    //pos = Vector4(pos.x, pos.y, pos.z, 1);

    var projed = view * pos;

    //cameraEl.getAttribute('position');
    //cameraEl.getAttribute('rotation');

    // Do something.
  }
});
