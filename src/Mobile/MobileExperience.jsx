import { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Preload,Environment,OrbitControls } from "@react-three/drei"
import { LinearEncoding,NoToneMapping } from 'three'
import MobileDecors from './MobileDecors.js'
import MobileInterface from './MobileInterface.js'
import MobileLoader from './MobileLoader.js'
import '../styles/mobileExperience.css'

export default function MobileExperience({
    midwifery,scene3D,boat,bike,
    github,mail,twitter,linkedin,
}){
    const orbitC = useRef()

    return(
        <>
            <Canvas gl ={{powerPreference : 'high-performance', toneMapping :NoToneMapping,outputEncoding : LinearEncoding}} camera={{position : [9.88,12.76,0.6], far : 43, fov: 90}}>
                                                                                                                
                <Environment files="./textures/envMap.hdr"/>        
                
                <MobileDecors
                    midwifery = {midwifery}
                    scene3D = {scene3D}
                    boat = {boat}
                    bike = {bike}
                    github = {github}
                    mail = {mail}
                    twitter = {twitter}
                    linkedin = {linkedin}
                /> 
                
                <color args={['#555555']} attach='background'/>
                <ambientLight color={0xffeedd} intensity={6}/> 
                
                <OrbitControls ref={orbitC} 
                    target={[0,4.7,0]} 
                    maxPolarAngle = {Math.PI * 0.4}
                    minPolarAngle = {Math.PI * 0.1}
                    maxAzimuthAngle = {-Math.PI * 1.1}
                    minAzimuthAngle = {Math.PI * 0.1}
                    enablePan = {false}
                />
                <Preload all/>   

            </Canvas>

            <MobileLoader/>
            <MobileInterface orbitC={orbitC}/>             

            <div className="titleMobile">
                <span>PORTFOLIO</span>
                <span>2023</span>
            </div>         
        </>        
    )
}