import { useState, useEffect } from 'react'
import Experience from './DesktopComponents/Experience.js'
import MobileExperience from './MobileComponents/MobileExperience.js'

export default function Devices(){   

    const goToMidwiferyWebSite = ()=> window.open('https://www.julianne-engel-sagefemme.fr/'),
          goTo3DSceneWebsite = ()=> window.open('https://3d-workspace-rho.vercel.app/'),
          goToBoatWebSite = ()=> window.open('https://boat-simulation.vercel.app/'),
          goToBikeWebSite = ()=> window.open('https://bike-concept.vercel.app/'),
          openGithub = ()=> window.open('https://github.com/AEngel34'),
          openMail = ()=> window.open('mailto:contact@aengel-dev.com'),
          openTwitter = ()=> window.open('https://twitter.com/ArthurEngelDev'),
          openLinkedin = ()=> window.open('https://www.linkedin.com/in/arthur-engel-417626245')

    const [width, setWidth] = useState(window.innerWidth)
    const [component, setComponent] = useState(null)

    const deviceType = ()=>{
        
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(navigator.userAgent)) {
            return "tablet";
        }
        else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(navigator.userAgent)) {
            return "mobile";
        }
        return "desktop";
    }

    useEffect(()=>{
        const handleResize = ()=> setWidth(window.innerWidth)

        window.addEventListener('resize',handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    },[])

    useEffect(()=>{
        if(width <= 1024 || deviceType()!=='desktop' ){
            setComponent(
                <MobileExperience 
                    midwifery = {goToMidwiferyWebSite}
                    scene3D = {goTo3DSceneWebsite}
                    boat = {goToBoatWebSite}
                    bike = {goToBikeWebSite}
                    github = {openGithub}
                    mail = {openMail}
                    twitter = {openTwitter}
                    linkedin = {openLinkedin}
                />
                
            )  
        }        
        else{
            setComponent(
                <Experience
                    midwifery = {goToMidwiferyWebSite}
                    scene3D = {goTo3DSceneWebsite}
                    boat = {goToBoatWebSite}
                    bike = {goToBikeWebSite}
                    github = {openGithub}
                    mail = {openMail}
                    twitter = {openTwitter}
                    linkedin = {openLinkedin}
                />
            )  
        }
            
    },[width])
        
    return(
        <>
            {component}
        </>
    )
}


