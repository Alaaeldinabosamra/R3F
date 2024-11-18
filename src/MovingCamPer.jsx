import React, { useState, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Box, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// The MovingObject component that handles movement and position updates
const MovingObject = ({ targetPosition, setTargetPosition, setIsMoving }) => {
  const speed = 0.1; // Movement speed
  const velocity = useRef([0, 0, 0]); // Velocity for smooth movement  

  // Update object position smoothly based on velocity
  useFrame(() => {
    const newPosition = [
      targetPosition[0] + velocity.current[0],
      targetPosition[1] + velocity.current[1],
      targetPosition[2] + velocity.current[2],
    ];
    setTargetPosition(newPosition); // Update the position in the parent state
  });

  // Handle key events for movement
  const handleKeyDown = (event) => {
    setIsMoving(true); // Set to moving when any key is pressed
    switch (event.key) {
      case 'w':
      case 'ArrowUp':
        velocity.current[1] = speed; // Move up (positive y)
        break;
      case 's':
      case 'ArrowDown':
        velocity.current[1] = -speed; // Move down (negative y)
        break;
      case 'a':
      case 'ArrowLeft':
        velocity.current[0] = -speed; // Move left (negative x)
        break;
      case 'd':
      case 'ArrowRight':
        velocity.current[0] = speed; // Move right (positive x)
        break;
      case 'e': // Move forward (positive z)
        velocity.current[2] = speed;
        break;
      case 'r': // Move backward (negative z)
        velocity.current[2] = -speed;
        break;
      case ' ':
        velocity.current = [0, 0, 0]; // Stop movement (space key)
        break;
      default:
        break;
    }
  };

  const handleKeyUp = (event) => {
    switch (event.key) {
      case 'w':
      case 's':
        velocity.current[1] = 0; // Stop moving vertically
        break;
      case 'a':
      case 'd':
        velocity.current[0] = 0; // Stop moving horizontally
        break;
      case 'ArrowUp':
      case 'ArrowDown':
        velocity.current[1] = 0; // Stop vertical movement
        break;
      case 'ArrowLeft':
      case 'ArrowRight':
        velocity.current[0] = 0; // Stop horizontal movement
        break;
      case 'e':
      case 'r':
        velocity.current[2] = 0; // Stop movement along z-axis
        break;
      default:
        break;
    }
    // When keys are released, check if the object is still moving. If not, switch back to idle state
    if (
      velocity.current[0] === 0 &&
      velocity.current[1] === 0 &&
      velocity.current[2] === 0
    ) {
      setIsMoving(false); // Set to idle if no movement is occurring
    }
  };

  // Add event listeners for keydown and keyup
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <mesh position={targetPosition}>
      <sphereGeometry />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
};

// The FollowCamera component that follows the moving object
const FollowCamera = ({ targetPosition }) => {
  const camera = useRef();
  
  useFrame(() => {
    if (camera.current) {
      const [x, y, z] = targetPosition;
      // Smoothly follow the target position (lerp)
      camera.current.position.lerp({ x: x, y: y + 3, z: z + 5 }, 0.1);
      camera.current.lookAt(x, y, z);
    }
  });

  return <PerspectiveCamera ref={camera} makeDefault position={[0, 5, 5]} fov={75} />;
};

// The parent component that manages the scene
const MovingCamPer = () => {
  const [targetPosition, setTargetPosition] = useState([0, 0, 0]); // Shared position state
  const [isMoving, setIsMoving] = useState(false); // Track if the user is moving the object
  const [lastStopPosition, setLastStopPosition] = useState([0, 0, 0]); // Track where the object stops moving
  const [currentView, setCurrentView] = useState('follow'); // State to track the current view (either 'follow' or 'orbit')

  const cameraRef = useRef();
  const orbitRef = useRef();

  // Handle the C and O keys to toggle between camera views
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'c' || event.key === 'C') {
        setCurrentView('follow');
      } else if (event.key === 'o' || event.key === 'O') {
        setCurrentView('orbit');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  useEffect(() => {
    if (!isMoving && currentView === 'orbit') {
      // Set the position of OrbitControls to the last stop position when the user stops moving
      orbitRef.current.target = new THREE.Vector3(...lastStopPosition); // Update the orbit controls target
    }
  }, [isMoving, lastStopPosition, currentView]);

  return (
    <>
      <ambientLight />
      <directionalLight position={[5, 5, 5]} />
      
      {/* Object that will move */}
      <MovingObject 
        targetPosition={targetPosition} 
        setTargetPosition={setTargetPosition} 
        setIsMoving={setIsMoving} 
      />
      
      {/* Conditional rendering of FollowCamera or OrbitControls */}
      {currentView === 'follow' ? (
        <FollowCamera targetPosition={targetPosition} />
      ) : (
        <>
          {/* OrbitControls should follow the mesh's stop position */}
          <OrbitControls ref={orbitRef} makeDefault target={lastStopPosition} />
          <PerspectiveCamera
            ref={cameraRef}
            makeDefault
            position={[lastStopPosition[0], lastStopPosition[1] + 5, lastStopPosition[2] + 5]}
            rotation={[-Math.PI / 4, Math.atan2(lastStopPosition[2], lastStopPosition[0]), 0]}
            fov={75}
          />
        </>
      )}
    </>
  );
};

export default MovingCamPer;
