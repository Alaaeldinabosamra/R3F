import { Text3D, OrbitControls, Center, useMatcapTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Perf } from 'r3f-perf';
import { useRef } from 'react';

export default function Experience() {
    // Load matcap texture
    const [matcapTexture] = useMatcapTexture('E6BF3C_5A4719_977726_FCFC82', 256);

 
    // Create an array of torus references
    const torusRefs = useRef([]);

    // Using `useFrame` to animate torus movements
    useFrame((state) => {
        const time = state.clock.getElapsedTime(); // Get current time in seconds
        const orbitRadius = 5; // Radius of the orbit
        const orbitSpeed = 0.5; // Speed of orbit

        // Loop through each torus and apply an orbiting effect
        torusRefs.current.forEach((torus, i) => {
            if (torus) {
                // Calculate new X and Z positions for each torus
                torus.position.x = orbitRadius * Math.cos(orbitSpeed * time + i); // X position
                torus.position.z = orbitRadius * Math.sin(orbitSpeed * time + i); // Z position

                // Optional floating effect on the Y axis
                torus.position.y = Math.sin(time + i) * 0.5;
            }
        });
    });

    return (
        <>
            <Perf position="top-left" />
            <OrbitControls makeDefault />

            {/* Central text */}
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

            {/* Render 100 toruses with random positions */}
            {[...Array(100)].map((_, index) => {
                return (
                    <mesh
                        key={index}
                        ref={(el) => torusRefs.current[index] = el} // Store reference to each torus in the array
                        position={[
                            (Math.random() - 0.5) * 10, // Random X position
                            (Math.random() - 0.5) * 10, // Random Y position
                            (Math.random() - 0.5) * 10, // Random Z position
                        ]}
                        scale={0.2 + Math.random() * 0.2} // Random scale for variety
                        rotation={[
                            Math.random() * Math.PI, // Random rotation on X axis
                            Math.random() * Math.PI, // Random rotation on Y axis
                            0, // Keep rotation on Z fixed
                        ]}
                    >
                        <torusGeometry args={[1, 0.2, 16, 32]} />
                        <meshMatcapMaterial matcap={matcapTexture} />
                    </mesh>
                );
            })}
        </>
    );
}
