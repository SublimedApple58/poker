export interface player{
    name: number,
    chips: number,
    isUser: boolean
    isVisible: boolean,
    side: number,
    carte: number[],
    done: boolean,
    bet: number,
    inManche: boolean,
    inGame: boolean,
    allIn: boolean
}

export interface carteCentrali{
    numero: number,
    isVisible: boolean
}

export function indexOfMax(arr: number[]) {
        
    let max = arr[0];
    let maxIndex = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}

export enum Moves{
    check,
    fold, 
    allIn,
    raise,
    call
}