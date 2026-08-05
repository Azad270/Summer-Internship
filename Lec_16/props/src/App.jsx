import Card from "./components/Cards"


function App() {

  return (
    <>
      <h1>lets understand the props in react </h1>
     <Card name="card1" btntext = "read more"  />
      <Card name="card2" btntext = "Learn more"  />
      <Card name="card3" btntext = "explore more"  />
    </>
  )
}

export default App
