import { useRef } from 'react';
import './commands.css';
import { useDispatch } from 'react-redux';
import { removeChips } from '../../state/formPlayer/nPlayerSlice';

function Commands(){

    const 
        amountInput = useRef<HTMLInputElement | null>(null),
        // invisible = {
        //     opacity: '0'
        // },
        visible = {
            opacity: '1'
        },
        dispatch = useDispatch();

    // let [style, setStyle] = useState(invisible); 

    function amounting(){
        // if(style==invisible){
        //     setStyle(visible)
        // } else {
        //     setStyle(invisible)
        // }

        if(amountInput.current?.valueAsNumber != 0){
            dispatch(removeChips({ref: 1, chips: (amountInput.current?.valueAsNumber ?? 0)}))
            if(amountInput.current != null){
                amountInput.current.value = '0';
            }
        }
    }

    return (
        <>
            <div className="commands">
                <button>fold</button>
                <button>check</button>
                <button>bet</button>
                <button onClick={()=>amounting()}>raise</button>
            </div>
            <div className="amount" style={visible} >
                <input type="number" placeholder='Insert amount' ref={amountInput}/>
            </div>
        </>
    )
}

export default Commands;