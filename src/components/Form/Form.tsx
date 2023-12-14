import './Form.css'
import { useDispatch } from 'react-redux';
import { addPlayer } from '../../state/formPlayer/nPlayerSlice';
import { useRef } from 'react';
import cardHelper from '../../helper/cardHelper';
import { setTurn } from '../../state/gameStatus/gameSlice';
import { setCentralCards } from "../../state/formPlayer/nPlayerSlice";
import gameHelper from '../../helper/gameHelper';

function Form() {
  const 
    riferimento = useRef<HTMLInputElement | null>(null),
    dispatch = useDispatch();

  function setPlayers(){
    const 
      nPlayers = riferimento.current?.valueAsNumber ?? 0,
      carte = cardHelper.generateCasualCard(nPlayers);

    let contatore = 0;

      if(nPlayers>2){
        for(let i = 1; i<=nPlayers; i++){
          const
                  integerTableSide = Math.trunc(i/4),
                  tableSide = 3 - (i - (integerTableSide * 4));
          dispatch(addPlayer({name: i, chips: 100, isVisible: i==1, side: tableSide, carte: [carte[contatore], carte[contatore+1]]}))
          contatore+=2;
        }

        dispatch(setTurn(gameHelper.casualPlayerTurn(nPlayers)))
        dispatch(setCentralCards(carte.slice(contatore)))
      }
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