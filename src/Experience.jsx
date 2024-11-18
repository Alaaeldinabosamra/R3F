import { useFrame } from '@react-three/fiber'
import { BakeShadows,useHelper,OrbitControls, SoftShadows } from '@react-three/drei'
import { useRef, useState } from 'react'
import { Perf } from 'r3f-perf'
import * as THREE from 'three'
import Moving from './Moving'
import MovingPer from './MovingPer'
import MovingCam from './MovingCam'
import MovingCamPer from './MovingCamPer'
import MovingMob from './MovingMob'



export default function Experience()
{
    SoftShadows({
        frustum: 3.75,
        size: 0.005,
        near: 9.5,
        samples: 17,
        rings: 11
    })
    const directionalLight = useRef()
    useHelper(directionalLight, THREE.DirectionalLightHelper,1)
    const cube = useRef()
    
    useFrame((state, delta) =>
    {
        cube.current.rotation.y += delta * 0.2
    })

    ////////////////
    const [targetPosition, setTargetPosition] = useState([0, 0, 0]); // Track the position of the object

    // Update position based on joystick input (from MobileControlPanel)
    const handleMove = (direction) => {
      const [x, y] = direction;
      // Adjust the movement logic as needed (e.g., convert joystick direction to position change)
      setTargetPosition([targetPosition[0] + x * 0.1, targetPosition[1] + y * 0.1, targetPosition[2]]);
    };

    return <>

        {/* <BakeShadows /> */}

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        {/* 
            Lights all default three js lights are supoorted in R3F
            <ambientLight />
            <hamisphereLight />
            <directionalLight />
            <pointLight />
            <reactAreaLight />
            <spotLight />
        */}

        <directionalLight 
            ref={directionalLight} 
            castShadow position={ [ 1, 2, 3 ] } 
            intensity={ 1.5 } 
            shadow-mapSize = {[1024,1024]}
            shadow-camera-near={1}
            shadow-camera-far={10}
            shadow-camera-top={5}
            shadow-camera-right={5}
            shadow-camera-bottom={-5}
            shadow-camera-left={-5}
        />
        <ambientLight intensity={ 1.5 } />

        <mesh castShadow position-x={ - 2 }>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>

        <mesh castShadow ref={ cube } position-x={ 2 } scale={ 1.5 }>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>

        <mesh receiveShadow position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

        {/* <Moving /> */}
        {/* <MovingPer /> */}
        {/* <MovingCam /> */}
        {/* <MovingCamPer /> */}
        <MovingMob />
    
        
         {/* 
            shadows in R3F
            add argument shadows to Canva component
            assign lights  to castShadow
            assign object (meshes) to  castShadow
            assign floor (plane) to receiveShadow
        */}

    </>
}