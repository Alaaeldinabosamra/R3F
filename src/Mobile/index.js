import { createRoot } from 'react-dom/client'
import Devices from './Devices.js'
import './style.css'

const root = createRoot(document.querySelector('#root'))

root.render(
    <Devices/> 
)