import './cards.css'
import cardHelper from '../../helper/cardHelper';
import { useRef } from 'react';

function Card(props: {number: number}){

    // const src: string = `../../..//cartePng/${prop.number}_of_${prop.suit}`

    const cartaEsatta = cardHelper.converNumberToCard(props.number);
    console.log(cartaEsatta.src);

    return(
        <>
            <div className="card">
                <div className="figura"></div>
            </div>
        </>
    )
}

export default Card;