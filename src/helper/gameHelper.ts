class gameHelper{
    static casualPlayerTurn(nplayer: number): number{
        const turno = Math.floor(Math.random() * nplayer) + 1;
        return turno;
    }
    
    static verifica(array: number[], numero: number){
        array.sort();
        let maxSequence: number = 2;
        let currentSequence: number = 1;
        for(let i = 0; i<array.length; i++){
            if(i>0){
                array[i] == array[i-1] ? currentSequence++ : currentSequence = 1;
                currentSequence > maxSequence ? maxSequence = currentSequence : maxSequence;
            }
        }
        return maxSequence>=numero;
    }

    static calcScore(playerCards: number[], tableCard?: number[]){
        const
         coppia: number = 1,
         doppiaCoppia: number = 2,
         tris: number = 3,
         full: number = 6,
         poker: number = 7;

        let score: number = 0; 
        const allCards: number[] = [];

        playerCards.map(carta => allCards.push(carta));
        tableCard?.map(carta => allCards.push(carta));
        allCards.sort();

        let numeriUguali: number[] = [];
        let lastCard: number = 0;

        // calcolo coppie, tris, poker e full
        for(let i = 0; i<allCards.length; i++){
            if(i>0){
                if(allCards[i] == lastCard){
                    if(numeriUguali.includes(allCards[i])){
                        numeriUguali.push(allCards[i]);
                    } else {
                        numeriUguali.push(lastCard, allCards[i]);
                    }
                }
            }
            lastCard = allCards[i];
        }
        switch(numeriUguali.length) {
            //niente
            case 0:
                break;
            // coppia
            case 2:
                score += coppia
                break;
            // tris
            case 3: 
                score += tris
                break;
            // doppia coppia o poker
            case 4:
                let condizione: boolean = this.verifica(numeriUguali, 4)
                condizione ? score += poker : score += doppiaCoppia;
                break;
            // full
            case 5: 
                score += full;
                break;
            // poker o full o doppia coppia
            case 6: 
                if(this.verifica(numeriUguali, 4)){
                    score += poker;
                } else if(this.verifica(numeriUguali, 3)){
                    score += full;
                } else {
                    score += doppiaCoppia;
                }
                break; 
            // poker o full 
            case 7: 
                if(this.verifica(numeriUguali, 4)){
                    score += poker;
                } else {
                    score += full;
                }
                break;
        }



        return score;
    }
};

export default gameHelper;