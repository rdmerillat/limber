import 'aframe';
import aframe_extras from 'aframe-extras'
import {Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';

aframe_extras.registerAll()

import floor_img from 'assets/floor.jpg';
import sky_img from 'assets/sky.jpg';
import head_model from 'assets/head.gltf';

import 'look_dist';
import 'vrGame'
// import 'voice';

class Human extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animation: props['animation'],
      position: props['position'],
      rotation: props['rotation'],
    };
  }

  render() {
    return (
      <Entity 
        gltf-model='#human'
        animation-mixer={{
          clip: this.state.animation
        }}
        position={this.state.position}
        rotation={this.state.rotation}
      />
    );
  }
}

class Sphere extends React.Component {
  constructor(props) {
    super(props);
    this.correct_color = props['color'] || 'green';
    this.mistake_color = props['mistake_color'] || 'red';
    this.state = {
      color: this.mistake_color,
    };
  }

  lookedAt = () => {
    this.setState({
      color: this.correct_color,
    })
  }

  lookedAway = () => {
    this.setState({
      color: this.mistake_color
    })
  }

  render() {
    return (
      <Entity
        geometry={{primitive: 'sphere', radius: this.props['radius']}}
        position={this.props['position']}
        pivot={this.props['pivot']}
        material={{color: this.state.color}}>
        {/* Angle specifies "if you are looking at it" */}
        <Entity
          look-dist={{radius: 15}}
          events={{
            lookAt: this.lookedAt,
            lookAway: this.lookedAway,
          }}
        />
        {this.props.children}
      </Entity>
    );
  }
}

class VRScene extends React.Component {
  render () {
    return (
      <Scene>
        <a-assets>
          <img id='ground_texture' src={floor_img}/>
          <img id='sky_texture' src={sky_img}/>
          <a-asset-item id='human' src={head_model}/>
        </a-assets>

        {/* Animate Side to side Sphere
            To Change Speed, chenge the value in "dur" (miliseconds)
            To change # of repetitions, change numeric value of "repeat" or set "indefinite" 
        */}

        <Sphere radius="0.5"> {/* src='texture filepath  <- texture */}
          <a-animation attribute="position"
            from="-3 2 -5"
            to="3 2 -5"
            dur="10000"
            direction="alternate"
            repeat="indefinite"></a-animation> 
        </Sphere>
        <Human animation='sidetoside' position='0 1 -6' rotation="0 180 0"/>

        {/* Animate up and down Sphere
            To Change Speed, chenge the value in "dur" (miliseconds)
            To change # of repetitions, change numeric value of "repeat" or set "indefinite" 
        */}

        <Sphere radius="0.25"> {/* src='texture filepath  <- texture */}
          <a-animation attribute="position"
            from="2.5 0.25 0"
            to="5 5 0"
            dur="10000"
            direction="alternate"
            repeat="indefinite"></a-animation>
        </Sphere>
        <Human animation='upanddown' position='6 1 0' rotation="0 90 0"/>

        <Sphere radius="0.5" position="-7 -4 0" pivot="0 4 0">
          <a-animation attribute="rotation"
            dur="5000"
            fill="forwards"
            from="90 0 0"
            to="270 0 0"
            direction="alternate"
            repeat="indefinite"></a-animation>
        </Sphere>
        <Human animation='shouldertoshoulder' position='-6 1 0' rotation="0 -90 0"/>
        
        <Entity look-dist={{radius: 15, target: '#text'}} events={{
          'lookAt': () => console.log('You looked at!'),
          'lookAway': () => console.log('You looked away!')
        }}/>

        <Entity raycaster='objects: .clickable' cursor />

        <Entity id="text" text={{value: 'Look forwards and track the ball through the air', align: 'center'}} position={{x: 0, y: 2, z: -1}}/>
        
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
