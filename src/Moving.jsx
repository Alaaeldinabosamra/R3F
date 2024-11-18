import React, { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Box } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';

const MovingObject = ({ position, setPosition }) => {
  const moveSpeed = 0.1;
  

  const handleKeyDown = (event) => {
    
    switch (event.key) {
      case 'w':
      case 'ArrowUp':
        setPosition([position[0], position[1] + moveSpeed, position[2]]);
        break;
      case 's':
      case 'ArrowDown':
        setPosition([position[0], position[1] - moveSpeed, position[2]]);
        break;
      case 'a':
      case 'ArrowLeft':
        setPosition([position[0] - moveSpeed, position[1], position[2]]);
        break;
      case 'd':
      case 'ArrowRight':
        setPosition([position[0] + moveSpeed, position[1], position[2]]);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [position]);

  return (
    <Box position={position}>
      <meshStandardMaterial color="orange" />
    </Box>
  );
};

const FollowCamera = ({ targetPosition }) => {
  const camera = useRef();
  const { camera: defaultCamera } = useThree();

  // Update camera position to follow the object
  useFrame(() => {
    if (camera.current) {
      camera.current.position.lerp(
        { x: targetPosition[0], y: targetPosition[1] + 3, z: targetPosition[2] + 5 },
        0.1
      );
      camera.current.lookAt(targetPosition[0], targetPosition[1], targetPosition[2]);
    }
  });

  return (
    <PerspectiveCamera ref={camera} makeDefault position={[0, 5, 5]} fov={75} />
  );
};

const Moving = () => {
  const [position, setPosition] = useState([0, 0, 0]);

  return (
 
     <>
      <ambientLight />
      <directionalLight position={[5, 5, 5]} />
      <MovingObject position={position} setPosition={setPosition} />
      <FollowCamera targetPosition={position} />
     </>
    
  );
};

export default Moving;
