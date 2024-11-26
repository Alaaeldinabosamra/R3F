import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas, events } from '@react-three/fiber'
import Experience from './Experience.jsx'
import * as THREE from 'three'


const root = ReactDOM.createRoot(document.querySelector('#root'))

const created = ({gl, scene,position}) => {
    // different ways to set background of scene
    // gl.setClearColor("#ff0000", 1)
    // console.log(gl)
    // scene.background = new THREE.Color('red')
    // console.log(scene)
    // to add to background in CSS
    // to add a component color and attach it to background
}


root.render(
    <>
        <Canvas
            shadows
            camera={ {
                fov: 45,
                near: 0.1,
                far: 200,
                position: [ - 4, 3, 6 ]
            } }
            onCreated = {created}
        >
            <color args={ ["ivory"] } attach="background" />
            <Experience  />
        </Canvas>
        
    </>
    
)