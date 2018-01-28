import {Vector4, Matrix4} from 'three';

AFRAME.registerComponent('look-dist', {
  schema: {
    target: { type: 'selector' },
    radius: { type: 'number' }
  },

  init: function () {
    this.lastCond = false
  },

  tick: function () {
    var cameraEl = this.el.sceneEl.camera.el;
    var cam = cameraEl.getObject3D('camera');
    var view = cam.matrixWorldInverse;
    var tar = this.data.target || this.el.parentEl;
    var pos = tar.object3D.position;
    pos = new Vector4(pos.x, pos.y, pos.z, 1);

    var p = pos.applyMatrix4(view);
    var x = Math.atan2(p.x, -p.z);
    var y = Math.atan2(p.y, -p.z);
    var r = x * x + y * y;
    
    var rad = this.data.radius / 180 * Math.PI;
    rad = rad * rad;
    var cond = r < rad;
    if (cond != this.lastCond) {
      if (cond) {
        this.el.emit('lookAt', {}, false);
      } else {
        this.el.emit('lookAway', {}, false);
      }
    }
    this.lastCond = cond;
  }
});
