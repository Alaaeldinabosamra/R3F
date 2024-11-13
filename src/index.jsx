
import { createRoot } from 'react-dom/client'
import App from './App'
import './style.css'

const toto = false

const styke = {
    color: "coral",
    backgroundColor: "floralwhite"
}

function printing(){
    return "Alaa"
    console.log("hello from terminal")
}

const root = createRoot(document.querySelector('#root'))
const title = document.querySelector("title")
root.render(
    <>
        <App />
    </>
)