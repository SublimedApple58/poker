import './cards.css'
import cardHelper from '../../helper/cardHelper';

function Card(props: {number: number}){

    let cartaEsatta = cardHelper.converNumberToCard(props.number);
    
    const backgroundCard = {
        backgroundImage: `url(${cartaEsatta.src})`,
    }

    return(
        <>  
            <div className="card">
                <div className="figura"  style={backgroundCard}></div>
            </div>
        </>
    )
}

export default Card;