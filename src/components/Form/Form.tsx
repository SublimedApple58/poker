import './Form.css'
import { useDispatch } from 'react-redux';
import { choise } from '../../state/formPlayer/nPlayerSlice';
import { useRef } from 'react'
// import Player from './components/Player/Player'; 

function Form(){

    const riferimento = useRef(null);
    const dispatch = useDispatch();

    return(
        <>
          <div className="form">
            <h2>Choise n. of player</h2>
            <input type="number" inputMode='numeric' ref={riferimento} className='nPlayer'/>
            <button className='submit' onClick={()=>dispatch(choise(riferimento.current?.value))}>Send number</button>
          </div>
        </>
    )
}

export default Form;