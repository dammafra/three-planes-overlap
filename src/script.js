import GUI from 'lil-gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const debug = new GUI({
  width: 300,
  title: 'Debug Options'
})
debug.close();

var axisHelper
var gridHelper

// Grid Floor
function loadGrid() {
  let size = 16
  let divisions = 16
  gridHelper = new THREE.GridHelper(size, divisions)
  gridHelper.position.y = -0.5
  scene.add(gridHelper)
}

// Axis helper
function loadAxisHelper() {
  axisHelper = new THREE.AxesHelper()
  axisHelper.scale.set(1.5,1.5,1.5)
  axisHelper.position.set(-1.0,-0.48,-1.0)
  scene.add(axisHelper)
}

// Scene, renderer and camera
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 1.5, 2)

const renderer = new THREE.WebGLRenderer()
renderer.setClearColor(0xcccccc)
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// Controls
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

// Lights
const light = new THREE.DirectionalLight('white', 2)
light.position.set(2, 2, 2)
scene.add(light)

const ambientLight = new THREE.AmbientLight('white', 0.5)
scene.add(ambientLight)

// Material Yellow Glass
const glassMaterial_Yellow = new THREE.MeshPhysicalMaterial({
  color: 'yellow',
  metalness: 0.1,
  opacity: 0.5,
  roughness: 0.8, // 0.15
  thickness: 0.01,
  transmission: 0.9, // 1.0
  ior: 1.5,
  side: THREE.DoubleSide,
  depthWrite: false, // Prevent incorrect occlusion
  transparent: true // Required true 
})
debug.add(glassMaterial_Yellow, 'depthWrite').name('Yellow plane depth write')
debug.add(glassMaterial_Yellow, 'opacity').min(0).max(1).step(0.1).name('Yellow plane opacity')

// Material Blue Glass
const glassMaterial_Blue = new THREE.MeshPhysicalMaterial({
  color: 'blue',
  opacity: 0.5,
  roughness: 0.8,
  transmission: 0.95,
  ior: 1.5,
  side: THREE.DoubleSide,
  depthWrite: false, // Prevent incorrect occlusion
  transparent: true // Required true
})
debug.add(glassMaterial_Blue, 'depthWrite').name('Blue plane depth write')
debug.add(glassMaterial_Blue, 'opacity').min(0).max(1).step(0.1).name('Blue plane opacity')

// Material Red Opaque 
const opaqueMaterial_Red = new THREE.MeshPhysicalMaterial({
  color: 'red',
  opacity: 1.0,
  roughness: 1.0,
  side: THREE.DoubleSide,
  depthWrite: true, // Prevent incorrect occlusion
  transparent: false // Required false
})
debug.add(opaqueMaterial_Red, 'depthWrite').name('Red plane depth write')
debug.add(opaqueMaterial_Red, 'transparent').name('Red plane transparent')
debug.add(opaqueMaterial_Red, 'visible').name('Red plane visible')

// Planes
const planeGeometry = new THREE.PlaneGeometry()

//
const glassPlane_Yellow = new THREE.Mesh(planeGeometry, glassMaterial_Yellow)
glassPlane_Yellow.position.z = 1
scene.add(glassPlane_Yellow)

const glassPlane_Blue = new THREE.Mesh(planeGeometry, glassMaterial_Blue)
glassPlane_Blue.position.z = 0.5
glassPlane_Blue.position.y = -0.25
scene.add(glassPlane_Blue)

const opaquePlane_Red = new THREE.Mesh(planeGeometry, opaqueMaterial_Red)
scene.add(opaquePlane_Red)

// Setup helpers
loadGrid();
loadAxisHelper();

// Animate
function animate() {
  requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}

animate()

// Adatta il rendering al resize della finestra
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
})
