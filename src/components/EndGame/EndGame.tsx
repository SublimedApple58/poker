import { useSelector } from "react-redux";
import { RootState } from "../../state/store";

function EndGame(){

    const winner = useSelector((state: RootState) => state.giocatori.players.filter(giocatore => giocatore.inGame)[0])
    
    return (
        <div className="endgame">
            <h1>THE WINNER IS PLAYER {winner.name}</h1>
        </div>
    )
}

export default EndGame;