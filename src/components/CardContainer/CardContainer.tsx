import Card from "../Cards/Card";

function CardContainer(props: {isVisible: boolean, value: number, numero: number[]}){
    return(
        <>
            <div className="card-container">
                <Card numero={props.numero[props.value]} isVisible={props.isVisible} key={props.value}/>
                <Card numero={props.numero[props.value+1]} isVisible={props.isVisible} key={props.value+1}/>
            </div>
        </>
    );
}

export default CardContainer;