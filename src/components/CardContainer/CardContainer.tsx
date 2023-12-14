import Card from "../Cards/Card";
import './CardContainer.css'

function CardContainer(props: {isVisible: boolean, numero: number[]}){
    return(
        <>
            <div className={`card-container`}>
                <Card numero={props.numero[0]} isVisible={props.isVisible} key={0}/>
                <Card numero={props.numero[1]} isVisible={props.isVisible} key={1}/>
            </div>
        </>
    );
}

export default CardContainer;