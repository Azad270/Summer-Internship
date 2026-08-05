import { useState } from "react"



function App() {

  let [counter, setcounter] = useState(0);

  const addvalue = ()=>{
    counter=counter+1;
    setcounter(counter);
    
  }

  const decvalue = ()=>{
    counter=counter-1;
    setcounter(counter);
  }

  return (
    <>
     <h1>lets understand the props in react </h1>
    
    <h2>counter value : {counter}</h2>


      <button onClick={addvalue} >inc {counter}</button>

      <button onClick={decvalue}>dec {counter}</button>
    </>



  )
}

export default App
