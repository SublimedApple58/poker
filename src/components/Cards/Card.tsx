import './cards.css'
import cardHelper from '../../helper/cardHelper';
import { addCard } from '../../state/releasedCards/releasedSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

function Card(props: {number: number}){

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(addCard(props.number))
    }, [])

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