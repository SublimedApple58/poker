class gameHelper{
    static casualPlayerTurn(nplayer: number): number{
        const turno = Math.floor(Math.random() * nplayer) + 1;
        return turno;
    }
    
    static calcScore(playerCards: number[], tableCard?: number[]){
        let score: number = 0; 
        // const cartaAlta = Math.max(...playerCards);
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
            // coppia
            case 2:
                score += 1
                break;
            // tris
            case 3: 
                score += 3
                break;
            // doppia coppia o poker
            case 4:
                let condizione: boolean = true;
                for(let i = 0; i<numeriUguali.length; i++){
                    if(i>0){
                        numeriUguali[i] != numeriUguali[i-1] ? condizione = false : condizione;
                    }
                }
                condizione ? score += 7 : score += 2;
                break;
            // full
            case 5: 
                score += 6;
                break;
        }



        return score;
    }
};

export default gameHelper;