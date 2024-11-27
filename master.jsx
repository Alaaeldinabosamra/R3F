import { Text3D, OrbitControls, Center, useMatcapTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import { Perf } from 'r3f-perf'
import { useRef, useState } from 'react';


export default function Experience()
{
    // const  [matcapTexture]  = useMatcapTexture('3B3C3F_DAD9D5_929290_ABACA8', 256);
    // const  [matcapTexture]  = useMatcapTexture('3E95CC_65D9F1_A2E2F6_679BD4', 256);
    // const  [matcapTexture]  = useMatcapTexture('394641_B1A67E_75BEBE_7D7256', 256);
    // const  [matcapTexture]  = useMatcapTexture('442C27_A79E90_847066_8D837C', 256);
    // const  [matcapTexture]  = useMatcapTexture('482908_894E0D_FBDB52_CA7420', 256);
    const  [matcapTexture]  = useMatcapTexture('E6BF3C_5A4719_977726_FCFC82', 256);

    const [torusGeometry, setTorusGeometry] = useState()
    const [material, setMaterial] = useState()


    const rings = useRef([])

    useFrame((state,delta) => {
        for(const ring of rings.current)
        {
            ring.rotation.y += delta * 0.1
        }

    });

    return (<>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <torusGeometry ref={ setTorusGeometry } args={[1,0.2,16,32]} />
        <meshMatcapMaterial ref={ setMaterial } matcap={matcapTexture}  />

        <Center>
            <Text3D 
                font="./fonts/Lacquer_Regular.json"
                // font="./fonts/helvetiker_regular.typeface.json"
                size={0.75}
                height={ 0.2}
                curveSegments={12}
                bevelEnabled
                bevelThickness={0.02}
                bevelSize={0.02}
                bevelOffset={0}
                bevelSegments={5}
            >
                Alaa Abosamra
                <meshMatcapMaterial matcap={matcapTexture} flatShading />
            </Text3D>
        </Center>

        
        {[...Array(100)].map((value, index) => 
        <mesh  key={index} ref={(element) => rings.current[index] = element } geometry={torusGeometry} material={material}
        position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
        ]} 
        scale={0.2 + Math.random() * 0.2 }
        rotation={[
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            0
        ]}
        />
        )}
       


        
    </>)
}


// create own typeface font with this website
//  http://gero3.github.io/facetype.js/

// matcap textures
// https:github.com/emmelleppi/matcaps