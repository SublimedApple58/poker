import Card from "../Cards/Card";

function CardContainer(props: {isVisible: boolean, value: number}){
    return(
        <>
            <div className="card-container">
                <Card numero={5} isVisible={props.isVisible} key={props.value}/>
                <Card numero={6} isVisible={props.isVisible} key={props.value+1}/>
            </div>
        </>
    );
}

export default CardContainer;