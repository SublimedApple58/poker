import './cards.css'
import cardHelper from '../../helper/cardHelper';

function Card(props: {number: number}){

    // const src: string = `../../..//cartePng/${prop.number}_of_${prop.suit}`

    const cartaEsatta = cardHelper.converNumberToCard(props.number);
    
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