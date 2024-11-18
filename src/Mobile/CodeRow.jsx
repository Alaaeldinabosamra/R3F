import { useEffect, useRef } from "react"
import gsap from 'gsap'

export default function CodeRow({
    material, codeRow1,codeRow2,codeRow3,codeRow4,codeRow5,codeRow6,
    codeRow7,codeRow8,codeRow9,codeRow10
}){

    let codeRowArray = []
    let tl

    const row1 = useRef(), row2 = useRef(),row3 = useRef(),row4 = useRef(),
    row5 = useRef(), row6 = useRef(), row7 = useRef() , row8 = useRef(),
    row9 = useRef(), row10 = useRef()

    useEffect(() => {

        codeRowArray = [row1, row2, row3,row4,row5,row6,row7,row8,row9,row10]

        codeRowAnimation()

        let codeRowInterval = setInterval(()=>{
            codeRowAnimation()
        },18000)        

        return () => {
            clearInterval(codeRowInterval)
            tl.kill()
        }
    }, [])
    
    const codeRowAnimation = ()=>{
        codeRowArray.forEach(element=> element.current.position.z = 4.65216)

        tl = new gsap.timeline()
        tl.to(row1.current.scale,{z : Math.random(),duration : 1.5})
        tl.to(row2.current.scale,{z : Math.random(),duration : 1.5},1.5)
        tl.to(row3.current.scale,{z : Math.random(),duration : 1.5},3)
        tl.to(row4.current.scale,{z : Math.random(),duration : 1.5},4.5)
        tl.to(row5.current.scale,{z : Math.random(),duration : 1.5},6)
        tl.to(row6.current.scale,{z : Math.random(),duration : 1.5},7.5)
        tl.to(row7.current.scale,{z : Math.random(),duration : 1.5},9)
        tl.to(row8.current.scale,{z : Math.random(),duration : 1.5},10.5)
        tl.to(row9.current.scale,{z : Math.random(),duration : 1.5},12)
        tl.to(row10.current.scale,{z : Math.random(),duration : 1.5},13.5)
        
        codeRowArray.forEach(element=>{
            tl.to(element.current.scale,{z : 0,duration : 1},15)
            tl.to(element.current.position,{z : 0,duration : 1},15)
        })
    }

    return(
        <>
          <mesh ref={row1}            
            geometry={codeRow1} material={material}
            position={[-4.805874, 5.966416, 4.652156]} rotation={[0, 0, 1.811844]}           
            scale={[1, 1, 0]}
          />
          <mesh ref={row2}
            geometry={codeRow2} material={material}
            position={[-4.773823, 5.566416, 4.652156]} rotation={[0, 0, 1.811844]}           
            scale={[1, 1, 0]}
          />
          <mesh ref={row3}
            geometry={codeRow3} material={material}
            position={[-4.650633, 5.166416, 4.652156]} rotation={[0, 0, 1.811844]}           
            scale={[1, 1, 0]}
          />
          <mesh ref={row4}           
            geometry={codeRow4} material={material}
            position={[-4.558328, 4.766416, 4.652156]} rotation={[0, 0, 1.811844]}           
            scale={[1, 1, 0]}
          />
          <mesh ref={row5}           
            geometry={codeRow5} material={material}
            position={[-4.466022, 4.366416, 4.652156]} rotation={[0, 0, 1.811844]}           
            scale={[1, 1, 0]}
          />
          <mesh ref={row6}           
            geometry={codeRow6} material={material}
            position={[-4.369521, 3.966416, 4.652156]} rotation={[0, 0, 1.811844]}           
            scale={[1, 1, 0]}
          />
          <mesh ref={row7}           
            geometry={codeRow7} material={material}
            position={[-4.27302, 3.566416, 4.652156]} rotation={[0, 0, 1.811844]}           
            scale={[1, 1, 0]}
          />
          <mesh ref={row8}           
            geometry={codeRow8} material={material}
            position={[-4.180715, 3.166416, 4.652156]} rotation={[0, 0, 1.811844]}           
            scale={[1, 1, 0]}
          />
          <mesh ref={row9}           
            geometry={codeRow9} material={material}
            position={[-4.075823, 2.766416, 4.652156]} rotation={[0, 0, 1.811844]}           
            scale={[1, 1, 0]}
          />
          <mesh ref={row10}           
            geometry={codeRow10} material={material}
            position={[-3.983517, 2.366416, 4.65216]} rotation={[0, 0, 1.811844]}           
            scale={[1, 1, 0]}
          />        
        </>
    )
}