import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { increment } from "../state/gameStatus/gameSlice";

export default function useTurn(value: number){
    const counter = useSelector((state: RootState) => state.game.counter);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(increment())
        console.log(value);
    }, [value])

    useEffect(() => {
        console.log(counter)
    }, [counter])
}