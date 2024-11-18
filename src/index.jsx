import React, { StrictMode, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Canvas } from "@react-three/fiber";
import Experience from './Experience';
import './style.css';
import { Leva } from 'leva';

const App = () => {
  // Create a ref for the Canvas component
  const canvasRef = useRef(null);

  useEffect(() => {

   

    // Fullscreen toggle logic when double-clicking anywhere on the window
    const handleDoubleClick = () => {
      const canvasElement = canvasRef.current;

      // If not in fullscreen, request fullscreen
      if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        if (canvasElement.requestFullscreen) {
          canvasElement.requestFullscreen();
        } else if (canvasElement.webkitRequestFullscreen) {
          canvasElement.webkitRequestFullscreen();
        }
      } else {
        // If in fullscreen, exit fullscreen
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
      }
    };

    // Listen for double-click events
    window.addEventListener('dblclick', handleDoubleClick);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('dblclick', handleDoubleClick);
    };
  }, []);

  return (
    <StrictMode>
        <Leva collapsed />
      <Canvas
        ref={canvasRef} // Attach ref to the Canvas component
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [-4, 3, 6]
        }}
      >
        <Experience />
      </Canvas>
    </StrictMode>
  );
};

// Render the App component into the root
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
