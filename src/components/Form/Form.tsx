import './Form.css'
import { useDispatch } from 'react-redux';
import { addPlayer, choise } from '../../state/formPlayer/nPlayerSlice';
import { useRef } from 'react'

function Form(){

    const 
      riferimento = useRef<HTMLInputElement | null>(null),
      dispatch = useDispatch();

      function setPlayers(){
          if((riferimento.current?.valueAsNumber ?? 0)>2){
            for(let i = 1; i<=(riferimento.current?.valueAsNumber ?? 0); i++){
              if(i==1){
                  dispatch(addPlayer({name: `Player${i}`, chips: 100, isVisible: true}))
              } else {
                  dispatch(addPlayer({name: `Player${i}`, chips: 100, isVisible: false}))
              }
          }
        }
          dispatch(choise(riferimento.current?.valueAsNumber ?? 0))
        }

    return(
        <>
          <div className="form">
            <h2>Choise n. of player</h2>
            <input type="number" inputMode='numeric' ref={riferimento} className='nPlayer'/>
            <button className='submit' onClick={()=>setPlayers()}>Send number</button>
          </div>
        </>
    )
    }

export default Form;