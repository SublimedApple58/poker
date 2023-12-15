import './Form.css'
import { useDispatch } from 'react-redux';
import { addPlayer } from '../../state/formPlayer/nPlayerSlice';
import { useRef, useState } from 'react';
import cardHelper from '../../helper/cardHelper';
import { setDifficulty, setTurn } from '../../state/gameStatus/gameSlice';
import { setCentralCards } from "../../state/formPlayer/nPlayerSlice";
import gameHelper from '../../helper/gameHelper';

function Form() {
  const 
    riferimento = useRef<HTMLInputElement | null>(null),
    shadow = {
      boxShadow : "0px 0px 10px 5px white"
    },
    noShadow = {},
    [easy, setEasy] = useState(noShadow),
    [medium, setMedium] = useState(noShadow),
    [hard, setHard] = useState(noShadow),
    [level, setLevel] = useState(''),
    dispatch = useDispatch();
  

  function setShadow(emoji: string) {
      setEasy(noShadow);
      setMedium(noShadow);
      setHard(noShadow);
      setLevel(emoji);

      switch (emoji) {
        case 'easy' : 
          setEasy(shadow);
          break;
        case 'medium' : 
          setMedium(shadow);
          break;
        case 'hard' : 
          setHard(shadow);
          break;
      }
    }


  function setPlayers(){
    if(level != ''){
      const 
        nPlayers = riferimento.current?.valueAsNumber ?? 0,
        carte = cardHelper.generateCasualCard(nPlayers);

      let contatore = 0;

      dispatch(setTurn(gameHelper.casualPlayerTurn(nPlayers)));
      dispatch(setDifficulty(level));

      if(nPlayers>2 && nPlayers<=8){
        for(let i = 1; i<=nPlayers; i++){
          const
                  integerTableSide = Math.trunc(i/4),
                  tableSide = 3 - (i - (integerTableSide * 4));
          dispatch(addPlayer({name: i, chips: 100, isVisible: i==1, side: tableSide, carte: [carte[contatore], carte[contatore+1]]}))
          contatore+=2;
        }

        dispatch(setCentralCards(carte.slice(contatore)));

      }
    } else {
      alert('you need to choose a difficulty level')
    }
  }

    return(
        <>
          <div className="form">
            <h2>Choise n. of player</h2>
            <input type="number" inputMode='numeric' ref={riferimento} className='nPlayer'/>
            <h2>Bluff level</h2>
            <div className="options">
              <div className="easy" onClick={() => setShadow('easy')} style={easy}></div>
              <div className="medium" onClick={() => setShadow('medium')} style={medium} ></div>
              <div className="hard" onClick={() =>setShadow('hard')} style={hard} ></div>
            </div>
            <button className='submit' onClick={setPlayers}>Start playing</button>
          </div>
        </>
    )
}

export default Form;