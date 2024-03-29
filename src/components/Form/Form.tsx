import './Form.css'
import { useDispatch } from 'react-redux';
import { addPlayer } from '../../state/formPlayer/nPlayerSlice';
import { carteCentrali } from '../../modules/exports';
import { useRef, useState } from 'react';
import cardHelper from '../../helper/cardHelper';
import { setDifficulty, setTurn } from '../../state/gameStatus/gameSlice';
import { setCentralCards } from "../../state/formPlayer/nPlayerSlice";
import { Difficulty } from '../../modules/exports';

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
    [level, setLevel] = useState(0),
    dispatch = useDispatch();

  function setShadow(emoji: Difficulty) {
      setEasy(noShadow);
      setMedium(noShadow);
      setHard(noShadow);
      setLevel(emoji);

      switch (emoji) {
        case Difficulty.easy : 
          setEasy(shadow);
          break;
        case Difficulty.medium : 
          setMedium(shadow);
          break;
        case Difficulty.hard : 
          setHard(shadow);
          break;
      }
    }

  function setPlayers(){
    if(level != 0){
      const 
        nPlayers = Math.trunc(riferimento.current?.valueAsNumber ?? 0),
        carte = cardHelper.generateCasualCard(nPlayers);

      let contatore = 0;

      // dispatch(setTurn(gameHelper.casualPlayerTurn(nPlayers)));
      dispatch(setTurn(1));
      dispatch(setDifficulty(level));

      if(nPlayers>2 && nPlayers<=8){
        for(let i = 1; i<=nPlayers; i++){
          const
                integerTableSide = Math.trunc(i/4),
                tableSide = 3 - (i - (integerTableSide * 4));
                
          dispatch(addPlayer(
              {name: i, 
              chips: 100, 
              isVisible: i==1, 
              isUser: i==1, 
              side: tableSide, 
              done: false, 
              finished: false, 
              bet: 0, 
              carte: [carte[contatore], carte[contatore+1]], 
              inManche: true, 
              inGame: true, 
              allIn: false,
              bluff: false}
            ))
          contatore+=2;
        }
        const carteCentrali = carte.slice(contatore);
        const carteConvertiteCentrali: carteCentrali[] = carteCentrali.map(carta => {
          return {
            numero: carta,
            isVisible: false
          }
        });
        dispatch(setCentralCards(carteConvertiteCentrali));
      } else {
        alert('you need to chose a number between 3 and 8');
      }
    } else {
      alert('you need to choose a difficulty level')
    }
  }

    return(
        <>
          <div className="form">
            <h2>Choose n. of player</h2>
            <input type="number" inputMode='numeric' ref={riferimento} className='nPlayer'/>
            <h2>Bluff level</h2>
            <div className="options">
              <div className="easy" onClick={() => setShadow(Difficulty.easy)} style={easy}></div>
              <div className="medium" onClick={() => setShadow(Difficulty.medium)} style={medium} ></div>
              <div className="hard" onClick={() =>setShadow(Difficulty.hard)} style={hard} ></div>
            </div>
            <button className='submit' onClick={setPlayers}>Start playing</button>
          </div>
        </>
    )
}

export default Form;