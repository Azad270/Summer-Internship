import '../App.css'
import reactLogo from '../assets/react.svg'

function Card(props){
    return (
         <div className="card">
          <img src={reactLogo} alt="Card Image" className="card-image" />
          <div className="card-body">
            <h3 className="card-title">{props.name}</h3>
            <p className="card-text">This is a short description of the card content. Keep it sweet and simple.</p>
            <button className="card-btn">{props.btntext}</button>
          </div>
        </div>
    )
}


export default Card;