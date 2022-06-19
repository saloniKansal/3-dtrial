import './style.css'

import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight, 0.1,1000 )
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
camera.position.setZ(30);

renderer.render(scene,camera)
const  geometry = new THREE.TorusGeometry(10,3,16,100);
const material = new THREE.MeshStandardMaterial({color: 0xffb533});
const torus = new THREE.Mesh(geometry,material);

scene.add(torus)

function addstar(){
    const geometry = new THREE.TorusKnotGeometry(1,0.4,8,12);
    const material = new THREE.MeshStandardMaterial(0X33fff9);
    const star = new THREE.Mesh(geometry,material);

    const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(1000));
    star.position.set(x,y,z);
    scene.add(star);

}
Array(900).fill().forEach(addstar);

const pointLight = new THREE.PointLight(0Xfffff)
pointLight.position.set( 0,20,20)
scene.add(pointLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(1000,50)
scene.add(lightHelper,gridHelper)

const loader = new GLTFLoader();

loader.load( './untitled.gltf', function ( gltf ) {

    scene.add( gltf.scene);

}, undefined, function ( error ) {

    console.error( error );

} );

const controls = new OrbitControls(camera,renderer.domElement);

const spaceTexture = new THREE.TextureLoader().load('cityofdrones.png');
scene.background = spaceTexture;

const myTexture = new THREE.TextureLoader().load('billie.png');
const billieCube = new THREE.Mesh(
    new THREE.BoxGeometry(10,10,10),
    new THREE.MeshBasicMaterial({map: myTexture})
);
scene.add(billieCube);

function animate(){
    requestAnimationFrame(animate);

    torus.rotation.x +=0.01;
    torus.rotation.y +=0.01;
    torus.rotation.z +=0.01;
    spaceTexture.rotation +=0.01;
    billieCube.position.set(0,0,50);
    billieCube.rotation.z +=0.01;




    controls.update()

    renderer.render(scene,camera);

}

animate()