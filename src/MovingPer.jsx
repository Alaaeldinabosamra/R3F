import React, { useState, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Box, PerspectiveCamera } from '@react-three/drei';

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
const FollowCamera = ({ targetPosition, transitionProgress }) => {
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
  const [transitionProgress, setTransitionProgress] = useState(0); // Track the transition progress
  const [cameraPosition, setCameraPosition] = useState([0, 5, 5]); // Initial camera position
  const [cameraRotation, setCameraRotation] = useState([0, 0, 0]); // Initial camera rotation

  const cameraRef = useRef();

  useFrame(() => {
    // Smoothly transition between cameras
    if (!isMoving) {
      // If not moving, interpolate to the OrbitControls position
      setTransitionProgress(prev => Math.min(prev + 0.01, 1)); // Increase progress towards 1
      
      // Transition camera position and rotation using lerp
      const lerpPosition = cameraPosition.map((v, i) => 
        v + (targetPosition[i] - v) * transitionProgress
      );

      setCameraPosition(lerpPosition);
    }
  });

  useEffect(() => {
    if (!isMoving) {
      // When not moving, set OrbitControls to match the current position
      setCameraRotation([0, Math.atan2(targetPosition[2], targetPosition[0]), 0]);
    }
  }, [isMoving, targetPosition]);

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
      {isMoving ? (
        <FollowCamera targetPosition={targetPosition} transitionProgress={transitionProgress} />
      ) : (
        <>
          <OrbitControls makeDefault target={targetPosition} />
          <PerspectiveCamera
            ref={cameraRef}
            makeDefault
            position={cameraPosition}
            rotation={cameraRotation}
            fov={75}
          />
        </>
      )}
    </>
  );
};

export default MovingCamPer;
