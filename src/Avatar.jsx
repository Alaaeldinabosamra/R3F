import { useAnimations ,useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import {useEffect, useRef, useState } from "react";
import { Vector3 } from "three";
export default function Avatar()
{
    // upload model from files
    const avatar = useGLTF('./Avatars/alaa.glb')
    // extract animations
    const animations = useAnimations(avatar.animations, avatar.scene)
    
     // State to track the current animation
    const [currentAction, setCurrentAction] = useState(null);


     // Camera references
     const { camera } = useThree();
     const focusCameraPosition = useRef(new Vector3(0, 2, 5)); // Default camera position when idle

    // Avatar movement speed
    const moveSpeed = 0.1;

    // Set initial camera distance
    const distance = 5;
    
    useEffect(() => {
        const idle = animations.actions.Idle
        const walk = animations.actions.Walk
        const run = animations.actions.Run
        const laying = animations.actions.Laying
        const dance = animations.actions.Dance
        const clap = animations.actions.Clap
        const waving = animations.actions.Waving
        const sit = animations.actions.Sit


        // Set initial animation to idle
        idle.play();
        setCurrentAction("Idle");


        // Function to fade out the current animation and fade in the new one
        const transitionToAction = (newAction, duration) => {
        if (currentAction === newAction) return; // Don't do anything if already in the same action
  
        // Fade out the current action
        animations.actions[currentAction]?.fadeOut(0.5); // Fade out over 0.5 seconds
        // Fade in the new action
        animations.actions[newAction]?.reset().fadeIn(0.5).play(); // Fade in over 0.5 seconds
  
        setCurrentAction(newAction);
  
        // Set timeout to return to idle after the action's duration
        setTimeout(() => {
          animations.actions[newAction]?.fadeOut(0.5); // Fade out the current action
          idle.reset().fadeIn(0.5).play(); // Fade back to idle
          setCurrentAction("Idle");
        }, duration);
      };

      // Listen for key events
    const handleKeyDown = (e) => {
        switch (e.key.toLowerCase()) {
          case "h":
            // Trigger Waving action for 3 seconds
            transitionToAction("Waving", 3000); // 3 seconds duration
            break;
          case "d":
            // Trigger Dance action for 5 seconds
            transitionToAction("Dance", 5000); // 5 seconds duration
            break;
          case "l":
            // Trigger Laying action for 5 seconds
            transitionToAction("Sit", 5000); // 5 seconds duration
            break;
          default:
            break;
        }
      };

       // Attach event listener for key press
    window.addEventListener("keydown", handleKeyDown);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
        
    },[animations, currentAction])

     // Update camera to always follow avatar at a fixed distance
    useEffect(() => {
    const avatarPosition = avatar.scene.position;
    const direction = new Vector3(0, 2, distance);
    
    // Calculate the camera's position based on avatar's position
    const newCameraPosition = avatarPosition.clone().add(direction);

    camera.position.lerp(newCameraPosition, 0.1); // Smoothly transition the camera's position
    camera.lookAt(avatarPosition); // Keep the camera looking at the avatar
     }, [avatar.scene.position, camera, distance]);

    

    // Add model to scene
    return <primitive 
        object={avatar.scene}
        scale={2}
        position={[0,-1,0]}
        rotation-y={0.3}
    />
}