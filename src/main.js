import 'aframe';
import {Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';

import floor_img from 'assets/floor.jpg';
import sky_img from 'assets/sky.jpg';
import head_model from 'assets/head.gltf';

class VRScene extends React.Component {
  render () {
    return (
      <Scene>
        <a-assets>
          <img id='ground_texture' src={floor_img}/>
          <img id='sky_texture' src={sky_img}/>
          <a-asset-item id='human' src={head_model}/>
        </a-assets>

        <Entity text={{value: 'Hello, A-Frame React!', align: 'center'}} position={{x: 0, y: 2, z: -1}}/>
        <Entity gltf-model='#human' material={{color: 'red'}}/>
        
        <Entity primitive='a-plane' src='#ground_texture' rotation='-90 0 0' height='100' width='100'/>
        <Entity primitive='a-light' type='ambient' color='#445451'/>
        <Entity primitive='a-light' type='point' intensity='2' position='2 4 4'/>
        <Entity primitive='a-sky' height='2048' radius='30' src='#sky_texture' theta-length='90' width='2048'/>
      </Scene>
    );
  }
}

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(<VRScene/>, document.querySelector('#scene_container'));
}, false);
