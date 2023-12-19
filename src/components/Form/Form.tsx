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

    const array1 = [
      {numero: 1, valore: 1, src: 'ciao', nome: '1', seme: 'hearts'},
      {numero: 13, valore: 2, src: 'ciao', nome: '2', seme: 'hearts'},
      {numero: 12, valore: 4, src: 'ciao', nome: '4', seme: 'hearts'},
      {numero: 11, valore: 5, src: 'ciao', nome: '5', seme: 'hearts'},
      {numero: 10, valore: 3, src: 'ciao', nome: '3', seme: 'hearts'},
      {numero: 8, valore: 3, src: 'ciao', nome: '3', seme: 'clubs'},
      {numero: 7, valore: 3, src: 'ciao', nome: '3', seme: 'diamonds'},
    ]

        //  coppia: number = 1,
        //  doppiaCoppia: number = 2,
        //  tris: number = 3,
        //  scala: number = 4,
        //  colore: number = 5,
        //  full: number = 6,
        //  poker: number = 7,
        //  scalaColore: number = 8
  
  console.log(gameHelper.calcScore(array1))

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