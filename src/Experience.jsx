import { Sparkles ,useGLTF, OrbitControls, Center, shaderMaterial } from '@react-three/drei'
import { useFrame, extend } from '@react-three/fiber'
import * as THREE from "three"
import portalVertexShader from './shaders/portal/vertex.js'
import portalFragmentShader from './shaders/portal/fragment.js'

import { useTexture } from '@react-three/drei'
import { useRef } from 'react'

const PortalMaterial = shaderMaterial(
    {
    uTime: 0,
    uColorStart: new THREE.Color("#ffffff"),
    uColorEnd: new THREE.Color("#000000")
    },
    portalVertexShader,
    portalFragmentShader
)

extend({ PortalMaterial })

export default function Experience()
{
    const {nodes} = useGLTF("./model/portal.glb")

    const bakedTexture = useTexture('./model/baked.jpg')
    // bakedTexture.flipY = false

    const portalMaterial = useRef()

    useFrame((state,delta) => {
        portalMaterial.current.uTime += delta
    })

    return <>

        <color args={ ['#201919'] } attach="background"  />

        <OrbitControls makeDefault  maxDistance={15} minZoom={2}/>


        <Center>
            <mesh geometry={nodes.baked.geometry}>
                <meshBasicMaterial map={ bakedTexture } map-flipY={ false } />
            </mesh>

            <mesh 
                geometry={ nodes.poleLightA.geometry }
                position={nodes.poleLightA.position}
            >
                <meshBasicMaterial color="#ffffe5" />
            </mesh>
            
            <mesh 
                geometry={ nodes.poleLightB.geometry }
                position={nodes.poleLightB.position}
            >
                <meshBasicMaterial color="#ffffe5" />
            </mesh>

            <mesh
                geometry={ nodes.portalLight.geometry }
                position={ nodes.portalLight.position }
                rotation={ nodes.portalLight.rotation }
            >
                {/* <shaderMaterial 
                    vertexShader={portalVertexShader} 
                    fragmentShader={portalFragmentShader}
                    uniforms={{ 
                        uTime: { value: 0 }, 
                        uColorStart: {value: new THREE.Color("#ffffff") },
                        uColorEnd: {value: new THREE.Color("#000000") },
                    }}
                /> */}
                <portalMaterial ref={ portalMaterial } />
            </mesh>

            <Sparkles 
                size={ 6 } 
                scale={ [4,2,4] }
                position={[0,1,0 ]}
                speed={ 0.2 }
                count={ 40 } 
            />

        </Center>

        
    </>
}