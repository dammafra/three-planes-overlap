import GUI from 'lil-gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const debug = new GUI()

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

// Materials
const glassMaterial = new THREE.MeshPhysicalMaterial({
  color: 'yellow',
  metalness: 0.1,
  roughness: 0.15,
  transmission: 1,
  thickness: 0.01,
  ior: 1.5,
})
debug.add(glassMaterial, 'depthWrite').name('front plane depth write')

const transparentMaterial = new THREE.MeshBasicMaterial({
  color: 'blue',
  transparent: true,
  opacity: 0.5,
})
debug.add(transparentMaterial, 'depthWrite').name('middle plane depth write')
debug.add(transparentMaterial, 'opacity').min(0).max(1).step(0.1).name('middle plane opacity')

const opaqueMaterial = new THREE.MeshBasicMaterial({
  color: 'red',
})
debug.add(opaqueMaterial, 'visible').name('back plane visible')

// Planes
const planeGeometry = new THREE.PlaneGeometry()

const glassPlane = new THREE.Mesh(planeGeometry, glassMaterial)
glassPlane.position.z = 1
scene.add(glassPlane)

const transparentPlane = new THREE.Mesh(planeGeometry, transparentMaterial)
transparentPlane.position.z = 0.5
scene.add(transparentPlane)

const opaquePlane = new THREE.Mesh(planeGeometry, opaqueMaterial)
scene.add(opaquePlane)

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
