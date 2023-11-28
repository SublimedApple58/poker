import './cards.css'
import cardHelper from '../../helper/cardHelper';

function Card(props: {numero: number}){

    const 
        cartaEsatta = cardHelper.converNumberToCard(props.numero),
        backgroundCard = {
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