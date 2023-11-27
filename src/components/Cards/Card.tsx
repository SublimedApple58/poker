import './cards.css'
import cardHelper from '../../helper/cardHelper';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addCard } from '../../state/releasedCards/releasedSlice';
import { RootState } from '../../state/store';

function Card(props: {number: number}){

    // const src: string = `../../..//cartePng/${prop.number}_of_${prop.suit}`
    const carteUscite = useSelector((state:RootState)=> state.carteUscite.array);
    const dispatch = useDispatch()

    console.log(carteUscite)

    useEffect(()=>{
        dispatch(addCard(props.number))
    }, [])

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