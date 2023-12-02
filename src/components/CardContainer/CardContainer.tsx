import Card from "../Cards/Card";
import './CardContainer.css'

function CardContainer(props: {isVisible: boolean, value: number, numero: number[], player: string}){
    return(
        <>
            <div className={`card-container ${props.player}`}>
                <Card numero={props.numero[props.value]} isVisible={props.isVisible} key={props.value}/>
                <Card numero={props.numero[props.value+1]} isVisible={props.isVisible} key={props.value+1}/>
            </div>
        </>
    );
}

export default CardContainer;