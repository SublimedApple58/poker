import './Form.css'
import { useDispatch } from 'react-redux';
import { addPlayer, choise } from '../../state/formPlayer/nPlayerSlice';
import { useRef } from 'react';
import { setCards } from '../../state/releasedCards/releasedSlice';
import cardHelper from '../../helper/cardHelper';

function Form(){


  const 
  riferimento = useRef<HTMLInputElement | null>(null),
  dispatch = useDispatch();

  // useEffect(()=>{
  //   console.log(numberPlayer)
  // }, [numberPlayer])


      function setPlayers(){

        const nPlayers = riferimento.current?.valueAsNumber ?? 0;


          if(nPlayers>2){
            for(let i = 1; i<=nPlayers; i++){
                if(i==1){
                    dispatch(addPlayer({name: i, chips: 100, isVisible: true}))
                } else {
                    dispatch(addPlayer({name: i, chips: 100, isVisible: false}))
                }
          }
        }
          dispatch(setCards(cardHelper.generateCasualCard(nPlayers)))
          dispatch(choise(nPlayers));
        }

        // lo state non si aggiorna subito, solo alla fine della vita del componente

        // function video(){
        //   console.log(numberPlayer);
        // }

    return(
        <>
          <div className="form">
            <h2>Choise n. of player</h2>
            <input type="number" inputMode='numeric' ref={riferimento} className='nPlayer'/>
            <button className='submit' onClick={setPlayers}>Send number</button>
          </div>
        </>
    )
    }

export default Form;