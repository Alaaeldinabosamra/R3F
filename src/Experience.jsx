import { Text3D, OrbitControls, Center, useMatcapTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Perf } from 'r3f-perf';
import { useRef } from 'react';
import * as THREE from 'three';

export default function Experience() {
    // Load matcap texture
    const [matcapTexture] = useMatcapTexture('E6BF3C_5A4719_977726_FCFC82', 256);

    // References for rings and torus geometry/material
    const rings = useRef([]);
    const torusGeometry = useRef();
    const material = useRef();

    // Update ring positions every frame
    useFrame((state, delta) => {
        const time = state.clock.getElapsedTime(); // Get the elapsed time

        const orbitRadius = 5; // Orbit radius around the center
        const orbitSpeed = 0.5; // Speed of orbit

        // Loop through each ring and update their positions to simulate orbital movement
        for (let i = 0; i < rings.current.length; i++) {
            const ring = rings.current[i];
            if (ring) {
                const angle = orbitSpeed * time + i * 0.1; // Small offset to stagger their orbits

                // Set position to orbit around the center
                ring.position.x = orbitRadius * Math.cos(angle);
                ring.position.z = orbitRadius * Math.sin(angle);

                // Optional: vertical floating effect
                ring.position.y = Math.sin(time + i * 0.1) * 0.5;
            }
        }
    });

    return (
        <>
            {/* Performance monitoring */}
            <Perf position="top-left" />
            
            {/* OrbitControls with zoom limits */}
            <OrbitControls
                makeDefault
                minDistance={1}    // Minimum zoom distance
                maxDistance={30}   // Maximum zoom distance
            />

            {/* Set the camera to a position that ensures we can see everything */}
            <perspectiveCamera makeDefault position={[0, 0, 25]} fov={75} near={0.1} far={1000} />

            {/* Central Text */}
            <Center>
                <Text3D
                    font="./fonts/Lacquer_Regular.json"
                    size={0.75}
                    height={0.2}
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

            {/* Render 100 toruses */}
            {[...Array(100)].map((_, index) => (
                <mesh
                    key={index}
                    ref={(el) => (rings.current[index] = el)} // Assign each mesh to the `rings` array
                    geometry={torusGeometry.current || (torusGeometry.current = new THREE.TorusGeometry(1, 0.2, 16, 32))}
                    material={material.current || (material.current = new THREE.MeshMatcapMaterial({ matcap: matcapTexture }))} 
                    position={[ 
                        (Math.random() - 0.5) * 10, // Random initial X position
                        (Math.random() - 0.5) * 10, // Random initial Y position
                        (Math.random() - 0.5) * 10, // Random initial Z position
                    ]}
                    scale={0.2 + Math.random() * 0.2} // Random scale for variation
                    rotation={[
                        Math.random() * Math.PI, // Random rotation on X axis
                        Math.random() * Math.PI, // Random rotation on Y axis
                        0, // Fixed rotation on Z axis
                    ]}
                />
            ))}
        </>
    );
}
