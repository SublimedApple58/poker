import './cards.css'
import cardHelper from '../../helper/cardHelper';

function Card(props: {numero: number, isVisible: boolean}){

    const 
        cartaEsatta = cardHelper.converNumberToCard(props.numero),
        backgroundCard = props.isVisible ? {backgroundImage: `url(${cartaEsatta.src})`} : {backgroundImage: `url(./file/icon/poker.png)`}

    return(
        <>  
            <div className="card">
                <div className="figura"  style={backgroundCard}></div>
            </div>
        </>
    )
}

export default Card;