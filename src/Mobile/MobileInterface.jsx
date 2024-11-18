import { useRef,useEffect,useState } from 'react'
import gsap from 'gsap'
import '../styles/mobileInterface.css'

export default function MobileInterface({orbitC}){

    const homeButton = useRef(),aboutButton =  useRef(),    
    projectButton =  useRef(),contactButton = useRef(),    

    [activeSpan,setActiveSpan] = useState(homeButton)

    useEffect(()=>{
        gsap.to(activeSpan.current,{color : '#08ffff',duration : 1}) 
    },[activeSpan])

    const resetActiveSpan = ()=>{
        gsap.to(activeSpan.current,{color : '#fafafa',duration : .8})
    }

    const goToAbout = ()=>{
        if(activeSpan!== aboutButton){
            resetActiveSpan()
            setActiveSpan(aboutButton)   
        }
        gsap.to(orbitC.current.object.position,{ x : 18.94,y : 16.85, z : -73.42, duration : 1.5})
        gsap.to(orbitC.current.target,{x : -3.1 ,y: 0,z : -73.35 , duration : 1.5})
        resetAngleLimitOrbit()
        orbitC.current.object.far = 50
        orbitC.current.object.updateProjectionMatrix()
    }

    const goToHome = ()=>{
        if(activeSpan!== homeButton){
            resetActiveSpan()
            setActiveSpan(homeButton)   
        }
        gsap.to(orbitC.current.object.position,{x : 9.88,y : 12.76, z : 0.6, duration : 1.5})
        gsap.to(orbitC.current.target,{x : 0 ,y: 4.7,z : 0 , duration : 1.5})
        resetAngleLimitOrbit()
        orbitC.current.object.far = 35
        orbitC.current.object.updateProjectionMatrix()
    }

    const goToContact = ()=>{
        if(activeSpan!== contactButton){
            resetActiveSpan()
            setActiveSpan(contactButton)   
        }
        gsap.to(orbitC.current.object.position,{x : 66,y : 17.44, z : -0.71, duration : 1.5})
        gsap.to(orbitC.current.target,{x : 60.3,y: -0.55,z : -2.7 , duration : 1.5})
        resetAngleLimitOrbit()
        orbitC.current.object.far = 30
        orbitC.current.object.updateProjectionMatrix()
    }

    const goToProject = ()=>{
        if(activeSpan!== projectButton){
            resetActiveSpan()
            setActiveSpan(projectButton)   
        }
        gsap.to(orbitC.current.object.position,{x : 84.78,y : 22, z : -77.4, duration : 1.5})
        gsap.to(orbitC.current.target,{x : 60.8322  ,y: 7.58,z : -72.6785 , duration : 1.5})
        orbitC.current.maxAzimuthAngle = Infinity
        orbitC.current.minAzimuthAngle = Infinity
        orbitC.current.maxPolarAngle = Math.PI * 0.45
        orbitC.current.minPolarAngle = Math.PI * 0.45
        orbitC.current.object.far = 40
        orbitC.current.object.updateProjectionMatrix()
    }

    const resetAngleLimitOrbit = ()=>{
        orbitC.current.maxAzimuthAngle = -Math.PI * 1.1
        orbitC.current.minAzimuthAngle = Math.PI * 0.1
        orbitC.current.maxPolarAngle = Math.PI * 0.4
        orbitC.current.minPolarAngle = Math.PI * 0.1
    }
    return(     
        <div className="navbarCaller">        
            <span ref={homeButton} className="homeButton" onClick={goToHome}>HOME</span>
            <span ref={aboutButton} className="aboutButton" onClick={goToAbout}>ABOUT</span>
            <span ref={projectButton} className="projectButton" onClick ={goToProject}>PROJECTS</span>
            <span ref={contactButton} className="contactButton" onClick={goToContact}>CONTACT</span>
        </div>       
    )
}