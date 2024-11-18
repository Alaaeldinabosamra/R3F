import { useState } from "react";
import { OrbitControls } from "@react-three/drei";
import Cube from "./Cube";
import { button, useControls } from "leva";

import { Perf } from "r3f-perf";


export default function Experience() {

    const {perfVisible} = useControls({
        perfVisible: true
    })

    const {position, color, visible} =  useControls("cube",{
        position: {
            value: {x: -2, y: 0,z: 0},
            min: -4,
            max: 4,
            step: 0.1
        },
        color: 'orange',
        visible: true,
        clickMe: button(()=> {console.log("ok")}),
        choice: {options: ["a","b","c"]}
    })
    
    return (
      <>
      {perfVisible ? <Perf position="top-left" /> : null}
      
        {/* Camera controls */}
        <OrbitControls makeDefault />
  
        {/* Lights */}
        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 4.5 } />
        <ambientLight intensity={ 1.5 } />
  
        {/* Mesh (Sphere) */}
        <mesh position-x={-2} visible={visible}>
          <sphereGeometry args={[1, 32, 32]} />  {/* Added arguments for geometry */}
          <meshStandardMaterial color="orange" />
        </mesh>
        
        <Cube scale={2} position={[position.x,position.y,position.z]} color={color} />
        {/* Mesh (Sphere) */}
        <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 } >
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

     
      </>
    );
  }