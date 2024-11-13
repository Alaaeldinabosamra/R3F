import { useEffect, useState } from "react"

export default function Clicker()
{
   
    const [count, setCount] = useState(0);
    console.log(`render`)

    useEffect(() => {
        const saveCount = parseInt(localStorage.getItem('count') ?? 0)
        setCount(saveCount)
    },[])

    useEffect(() => {
        // console.log(`hello`)
        // the log will appear once when the component is rendered for the first time 
        // but also after each change in it(When we click on the button)
        // to control whe  use effect is being called we can pass it an array of dependencies as the secound argument
        // arry called the function when the array member is changed
        localStorage.setItem('count',count)
    },[count])

    const buttonClick = () => {
        setCount(value => value +1)
    }
    return(
        <div>
            <div>Clicks count: {count}</div>
            <button onClick={buttonClick}>Click me</button>
        </div>
    )
}