import './Form.css'
import { useDispatch } from 'react-redux';
import { choise } from '../../state/formPlayer/nPlayerSlice';
import { useRef } from 'react'
// import { RootState } from '../../state/store'; 
// import Player from './components/Player/Player'; 

function Form(){

    const riferimento = useRef<HTMLInputElement | null>(null);
    const dispatch = useDispatch();
    // const numberPlayer = useSelector((state: RootState)=> state.giocatori.nplayer); 
    // const form = document.querySelector('.form'); 

    // if(numberPlayer >=3){
    //   form?.classList.add("formDisappear")
    //   setTimeout(()=>{
    //     form.style.display = "none";
    //   }, 3000)
    // }

    return(
        <>
          <div className="form">
            <h2>Choise n. of player</h2>
            <input type="number" inputMode='numeric' ref={riferimento} className='nPlayer'/>
            <button className='submit' onClick={()=>dispatch(choise(riferimento.current?.valueAsNumber ?? 0))}>Send number</button>
          </div>
        </>
    )
}

export default Form;