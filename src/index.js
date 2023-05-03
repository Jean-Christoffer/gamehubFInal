
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";

const api1 = `${import.meta.env.VITE_API_KEY}`
export  {api1}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//Loaders
const gltfLoader = new GLTFLoader()
const textureLoader = new THREE.TextureLoader()
const particleTexture = textureLoader.load('/textures/1.png')

//mesh

const geometry = new THREE.SphereGeometry(0.8, 64, 64);
const material = new THREE.MeshStandardMaterial({
    roughness:0,
    metalness:0.5,
    color:'#BE9C37',
});
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0,0.58,0)
mesh.scale.set(0.8,0.8,0.8)
scene.add(mesh)
/**
 * Particles
 */
const particlesCount = 2000
const positions = new Float32Array(particlesCount * 3)

for(let i = 0; i < particlesCount; i++){
    positions[i * 3 + 0] = (Math.random() - 0.5) * 10
    positions[i * 3 + 1] = 4 * 0.5 -  Math.random() * 4 * 2
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10
}
const particlesGeometry = new THREE.BufferGeometry()
particlesGeometry.setAttribute('position',  new THREE.BufferAttribute(positions,3))

//material
const particlesMaterial = new THREE.PointsMaterial({
    color:'#FFFFFF', //'#BE9C37' 
    sizeAttenuation:true,
    size: 0.05,
    alphaMap: particleTexture,
    transparent:true,
    alphaTest: 0.001,
    depthWrite:false
})

//Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial)

scene.add(particles)

/**
 * light
 */
const directionalLight = new THREE.DirectionalLight('#ffffff', 2)
directionalLight.position.set(1,1,1)
scene.add(directionalLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0,0,6)
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha:true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(2)


gltfLoader.load('/snes/scene.gltf', (gltf) =>{

    gltf.scene.scale.set(1,1,1)
    gltf.scene.rotation.set(0.2,0,0)
    gltf.scene.position.set(0,0.4,0.9)

    const tl = gsap.timeline({defaults:{duration:1}})
    tl.fromTo(gltf.scene.scale, {z:0, x:0, y:0}, {z:4,x:4,y:4})
   /* gsap.to(gltf.scene.position, {duration: 3, y: -0.0000001, yoyo: true, repeat: -1, ease: "sine.inOut"})*/
    scene.add(gltf.scene)

})

const controls = new OrbitControls( camera, renderer.domElement );
controls.autoRotate = false
controls.enableDamping = true
controls.enableZoom = false
controls.autoRotateSpeed =0.1

controls.minAzimuthAngle = -90 * (Math.PI/180);
controls.maxAzimuthAngle = 90 * (Math.PI/180);

controls.minPolarAngle = Math.PI / 4
controls.maxPolarAngle = Math.PI / 2

document.addEventListener("mouseup", function () {
    controls.reset();
    controls.update();
  });
  
  function render() {
    requestAnimationFrame( render );
    controls.update();
    renderer.render( scene, camera );

}
renderer.setClearColor(0x00000)






const gameSection = document.querySelector('.game-section')
const loader = document.querySelector('.spinner')



const getGames = async () => {
  try{
    const response = await fetch(`${api1}`)
    const data = await response.json()
    return data
  } catch(error){
    console.log(error)
  }
  
}


function storeRow(gameList){

  gameSection.textContent = ''

  gameList.map(game => {

    const priceHtml = game.price_html
    const parser = new DOMParser();
    const priceElement = parser.parseFromString(priceHtml, 'text/html').body.firstChild;
    const formattedPrice = priceElement.textContent;

      const gameCard = document.createElement('div')
      gameCard.className = 'game-card'
  
      const detailsAnchor = document.createElement('a')
      detailsAnchor.href= `./details/details.html?id=${game.id}`
  
      const gameImage = document.createElement('img')
      gameImage.src=`${game.images[0].thumbnail}`
      gameImage.className = 'game-cover-img'
      gameImage.alt = 'game-cover-image'
      detailsAnchor.appendChild(gameImage)
  
      const gameTitle = document.createElement('p')
      gameTitle.className = 'game-title'
      gameTitle.textContent = `${game.name}`
      detailsAnchor.appendChild(gameTitle)
  
      const priceAndPlatform = document.createElement('div')
      priceAndPlatform.className='price-platform-container'
      detailsAnchor.appendChild(priceAndPlatform)
  
      const price = document.createElement('p')
      price.className = 'price'
      price.textContent = `${formattedPrice}`
      priceAndPlatform.appendChild(price)
  
     const platform = document.createElement('p')
      platform.className = 'platform'
      platform.textContent = `${game.attributes[0].terms[0].name}`
      priceAndPlatform.appendChild(platform)
  
      gameCard.appendChild(detailsAnchor)

      gameSection.appendChild(gameCard)
    
    })

}


const renderPage = async () => {
  try{
    loader.classList.toggle('show')
    const data = await getGames()
    storeRow(data)
  } catch(error){
    console.log(error)
  } finally{
    loader.classList.toggle('show')
  }
}

renderPage()
render()
