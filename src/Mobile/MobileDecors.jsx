import { useGLTF, useAnimations, MeshTransmissionMaterial} from "@react-three/drei"
import { useRef, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import Projects from "../HybridComponents/Projects.js"
import MobileTexts from "./MobileTexts.js"
import PathIncubator from "../HybridComponents/PathIncubator.js"
import CodeRow from "./CodeRow.js"
import StickComputer from "../HybridComponents/StickComputer.js"
import Decals from "../HybridComponents/Decals.js"
import { baseMaterial,whiteMaterial,blackMaterial,
  bloomBlueMaterial,whiteBloomMaterial
 } from "../HybridComponents/Materials.js"

export default function MobileDecors({
    midwifery,scene3D,boat,bike,    
    github,mail,twitter,linkedin      
}){

    const {nodes,material,animations} = useGLTF("./models/mobileModel.glb")

    const sphere1 = useRef(),sphere2 = useRef(),sphere3 = useRef()
    const actions1 = useAnimations(animations, sphere1)
    const actions2 = useAnimations(animations, sphere2)
    const actions3 = useAnimations(animations, sphere3)
    
    const circle1KeyBoard = useRef(), circle2KeyBoard = useRef(), circle3KeyBoard=useRef()
    const circleHand = useRef(), circleLogoComputer = useRef(),circleScreenAbout=useRef()

    useEffect(() => {
        const action1 = actions1.actions.SphereAction1,
        action2 = actions2.actions.SphereAction2,
        action3 = actions3.actions.SphereAction3
        action1.play()
        action2.play()
        action3.play()        
  
        return () => {
            action1.stop()
            action2.stop()
            action3.stop()
        }
    }, [])
   
    useFrame((state, delta)=>{
        circle1KeyBoard.current.rotateY(Math.sin(state.clock.elapsedTime * 1.5) * 0.1)  
        circle2KeyBoard.current.rotateY(-Math.sin(state.clock.elapsedTime * 2) * 0.01)
        circle3KeyBoard.current.rotateY(Math.sin(state.clock.elapsedTime) * 0.15)

        circleHand.current.rotation.y -= delta * 2
        circleLogoComputer.current.rotateY(Math.sin(state.clock.elapsedTime * 0.15) * 0.05)
        circleScreenAbout.current.rotateY(-delta * 2)
    })

    const path1InitPosition = {x :-0.5052, y :6.0394, z :-70.5473, xOffset:-0.77, yOffset : 6.3098}
    const path2InitPosition = {x :-0.7333, y :6.2723, z :-70.5997, zOffset:-72.619}
    const path3InitPosition = {x :-0.504,  y :6.0382, z :-72.2153, xOffset: -0.6966, yOffset :6.2348}
    const path4InitPosition = {x :-0.77,   y :6.3098, z :-72.5665, xOffset: -1.5685, yOffset :7.1252}
    const path5InitPosition = {x :-1.5318, y :7.0877, z :-72.514,  zOffset: -72.3874}
        
    const stick1Position = { x : -4.0924, y: 2.7112, z: -0.7421}
    const stick2Position = {x : -4.0364, y : 2.4833, z : -0.7422}
    const stick3Position = {x : -3.9804,y :  2.2555, z : -0.7422}

    const incubatorReact = {x : -0.5,   y : -0.8, z : -4.3,    rot : Math.PI * 0.5,  scale : 3},
          incubatorThree = {x : -0.5,   y : -0.8, z : -22.2,   rot : Math.PI * 0.5,  scale : 3.8},
          project1Gsap =   {x : 54,     y : -3.3, z : -5.7,    rot : -Math.PI * 0.24,scale : 1.6},
          project1Three =  {x : 51.5,   y : -3.3, z : -8,      rot : -Math.PI * 0.24,scale : 2},
          project2Three =  {x : 60.25,  y : -3.3, z : -5.3,    rot : Math.PI * 0.16, scale : 2},
          project2Blender ={x : 63.4,   y : -3.2, z : -6.6,    rot : Math.PI * 0.16, scale : 1.6},
          project3Three =  {x : 65.8,   y : -3.2, z : -11.5,   rot : Math.PI * 0.56, scale : 2},
          project3Rapier = {x : 66.1,   y : -3.2, z : -14.2,   rot : Math.PI * 0.56, scale : [1.5,0.4,1.2]},
          project3Blender ={x : 65.3,   y : -3.2, z : -16.65,  rot : Math.PI * 0.56, scale : 1.6},
          project4Three =  {x : 63.2,   y : -3.2, z : -20,     rot : -Math.PI * 0.96,scale : 2},
          project4React =  {x : 60.5,   y : -3.2, z : -20,     rot : -Math.PI * 0.96,scale : 1.5},
          project4Gsap =   {x : 57.8,   y : -3.2, z : -20.7,   rot : -Math.PI * 0.96,scale : 1.6},
          project4Blender ={x : 55.1,   y : -3.2, z : -21.3,   rot : -Math.PI * 0.96,scale : 1.6},
          project5Three =  {x : 52.465, y : -3.2, z : -19.649, rot : -Math.PI * 0.64,scale : 2},
          project5React =  {x : 51.353, y : -3.2, z : -17.287, rot : -Math.PI * 0.64,scale : 1.5},
          project5Gsap =   {x : 50.241, y : -3.2, z : -14.923, rot : -Math.PI * 0.64,scale : 1.6},
          project5Blender ={x : 49.129, y : -3.2, z : -12.561, rot : -Math.PI * 0.64,scale : 1.6}

    return (
        <>
          <mesh geometry={nodes.glass.geometry} position={[-0.6862129, 6.16898012, -73.30280304]}> 
            <MeshTransmissionMaterial roughness={0.1 }/>
          </mesh>
          <mesh geometry={nodes.whiteFixed.geometry} material = {whiteMaterial} />
          <mesh geometry={nodes.blackFixed.geometry} material={blackMaterial}           
            position={[17.79388809, 5.300951, -75.26644897]} 
          />
          <mesh ref={circleLogoComputer}
            geometry={nodes.circleLogoComputer.geometry} material={bloomBlueMaterial}
            position={[-4.63500118, 5.02217102, -2.65287805]} rotation={[0, 0, -1.33133477]}
          />

          <group position={[-2.65195131, 1.30537391, 3.01199007]} rotation={[0, 0, -0.37778207]}>          
            <mesh ref={circle1KeyBoard} geometry={nodes.circle1KeyBoard.geometry} material={bloomBlueMaterial}/>
            <mesh ref={circle2KeyBoard} geometry={nodes.circle2KeyBoard.geometry} material={whiteBloomMaterial}/>
            <mesh ref={circle3KeyBoard} geometry={nodes.circle3KeyBoard.geometry} material={bloomBlueMaterial}/>
          </group>

          <mesh ref={circleHand}
            geometry={nodes.circleHand.geometry} material={bloomBlueMaterial}
            position={[1.23888779, 0.04292631, -5.73289871]}
          />
          <mesh ref={circleScreenAbout}           
            geometry={nodes.circleScreenAbout.geometry} material={bloomBlueMaterial}           
            position={[0.33171272, 5.20456505, -77.8644104]} rotation={[0, 0, -0.77359661]}
          />
          <mesh geometry={nodes.boxGithub.geometry} material={baseMaterial} 
            position={[55.52846527, 0.20319295, -2.00357223]}
            onClick={github}
          />
          <mesh geometry={nodes.boxLinkedin.geometry} material={baseMaterial}
            position={[62.30400085, 0.20319295, -4.93395281]} 
            onClick={linkedin}
          />
          <mesh geometry={nodes.boxMail.geometry} material={baseMaterial}
            position={[59.00727081, 0.20319295, 1.42118549]} 
            onClick={mail}
          />
          <mesh geometry={nodes.boxTwitter.geometry} material={baseMaterial}
            position={[57.74357605, 0.20319295, -6.77699184]} 
            onClick={twitter}
          />
          <mesh geometry={nodes.github.geometry} material={whiteMaterial}
            position={[55.55995178, 0.6872111, -1.89860559]} 
            onClick={github}
          />
          <mesh geometry={nodes.linkedin.geometry} material={whiteMaterial} 
            position={[62.05627823, 0.68721038, -4.93395233]} 
            onClick={linkedin} 
          />
          <mesh geometry={nodes.mail.geometry} material={whiteMaterial}           
            position={[58.95687485, 0.6872105, 1.42118502]} 
            onClick={mail}
          />
          <mesh geometry={nodes.twitter.geometry} material={whiteMaterial}
            position={[57.64785004, 0.68721098, -6.72157097]} 
            onClick={twitter}
          />
          <mesh ref={sphere1} 
            geometry={nodes.Sphere1.geometry} material={bloomBlueMaterial}
            position={[57.743576, 0.203193, -5.604492]}
          />  
          <mesh ref={sphere2} 
            geometry={nodes.Sphere3.geometry} material={bloomBlueMaterial}
            position={[57.74333191, 0.20319295, -9.3986702]}
          />
          <mesh ref={sphere3} 
            geometry={nodes.Sphere2.geometry} material={bloomBlueMaterial}
            position={[55.52757645, 0.20319295, -2.42010975]}
          />  
          <group position={[2.25549078, 1.85027146, -12.96791077]} >
            <mesh geometry={nodes.bloomFixed.geometry} material={bloomBlueMaterial}/>
            <mesh geometry={nodes.bloomFixed2.geometry} material={whiteBloomMaterial}/>              
          </group>
          
          <mesh geometry={nodes.baseStructure.geometry} material={baseMaterial}
            position={[2.68405151, 5.11852837, -60.03951645]} 
          >
            <Decals
              incubatorReact={incubatorReact} incubatorThree={incubatorThree}              
              project1Gsap = {project1Gsap} project1Three = {project1Three}             
              project2Three = {project2Three} project2Blender = {project2Blender}             
              project3Three = {project3Three} project3Rapier = {project3Rapier} project3Blender = {project3Blender}          
              project4Three = {project4Three} project4React = {project4React} project4Gsap = {project4Gsap} project4Blender = {project4Blender}
              project5Three = {project5Three} project5React = {project5React} project5Gsap = {project5Gsap} project5Blender = {project5Blender}             
            />
          </mesh>

          <StickComputer
            material={bloomBlueMaterial}
            stick1={nodes.stickComputer1.geometry}
            stick2={nodes.stickComputer2.geometry}
            stick3={nodes.stickComputer3.geometry}
            stick1Position={stick1Position} stick2Position={stick2Position} stick3Position={stick3Position}
          />

          <CodeRow material = {bloomBlueMaterial}
            codeRow1 = {nodes.codeRow1.geometry}  codeRow2 = {nodes.codeRow2.geometry}
            codeRow3 = {nodes.codeRow3.geometry}  codeRow4 = {nodes.codeRow4.geometry}
            codeRow5 = {nodes.codeRow5.geometry}  codeRow6 = {nodes.codeRow6.geometry}
            codeRow7 = {nodes.codeRow7.geometry}  codeRow8 = {nodes.codeRow8.geometry}
            codeRow9 = {nodes.codeRow9.geometry}  codeRow10 = {nodes.codeRow10.geometry}
          />

          <PathIncubator
            path1 = {nodes.path1.geometry}
            path1Position = {path1InitPosition}
            path2 = {nodes.path2.geometry}
            path2Position = {path2InitPosition}
            path3 = {nodes.path3.geometry}
            path3Position = {path3InitPosition}
            path4 = {nodes.path4.geometry}
            path4Position = {path4InitPosition}
            path5 = {nodes.path5.geometry}
            path5Position = {path5InitPosition}
          />

          <Projects
            project1={nodes.videoProject1}
            project2={nodes.videoProject2}
            project3={nodes.videoProject3}
            project4={nodes.videoProject4}
            project5={nodes.videoProject5}
           />
           
          <MobileTexts
            midwifery = {midwifery}
            scene3D = {scene3D}
            boat = {boat}
            bike = {bike}
            bloomBlueMaterial={bloomBlueMaterial}
            baseMaterial = {whiteMaterial}
            blackMaterial={blackMaterial}
            github={github}
            twitter={twitter}
            linkedin={linkedin}
            mail={mail}
           />
        </>
    )
}

useGLTF.preload("./models/mobileModel.glb");