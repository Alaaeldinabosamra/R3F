import React from 'react'

function Cube({scale = 1, position = [2,0,0], color = "mediumpurple"} ) {
  return (
   
   <mesh position={ position } scale={ scale }  >
       <boxGeometry />
       <meshStandardMaterial color={color} />
   </mesh>
  )
}

export default Cube
