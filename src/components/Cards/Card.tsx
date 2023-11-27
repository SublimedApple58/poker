import './cards.css'
import cardHelper from '../../helper/cardHelper';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { giveCard } from '../../state/releasedCards/releasedSlice';
import { RootState } from '../../state/store';

function Card(){

    const dispatch = useDispatch();
    const carteDate = useSelector((state: RootState)=> state.carteUscite.carteUscite);
    const index = useSelector((state: RootState)=> state.carteUscite.length);

    useEffect(()=>{
        dispatch(giveCard());
    }, [])

    const numeroCarta = carteDate[index-1];

    let cartaEsatta = cardHelper.converNumberToCard(numeroCarta);
    
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