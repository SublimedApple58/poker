interface cardProperties{
    seme: string,
    nome: string,
    numero: number,
    valore: number,
    src: string
}

class gameHelper{
    static casualPlayerTurn(nplayer: number): number{
        const turno = Math.floor(Math.random() * nplayer) + 1;
        return turno;
    }
    
    static verifica(array: number[], differenza: number){ // funzione che veririfica quanti numeri uguali ci sono ed eventualmente le carte consecutive per le scale
        array.sort();
        let maxSequence: number = 2;
        let currentSequence: number = 1;
        for(let i = 0; i<array.length; i++){
            if(i>0){
                array[i] == array[i-1]+differenza ? currentSequence++ : currentSequence = 1;
                currentSequence > maxSequence ? maxSequence = currentSequence : maxSequence;
            }
        }
        return maxSequence;
    }

    static verficaColore(array: cardProperties[]){
        let 
         condizione: boolean,
         diamonds: number = 0,
         hearts: number = 0,
         spades: number = 0,
         clubs: number = 0;

        for(let i = 0; i<array.length; i++){
            switch(array[i].seme){
                case 'spades':
                    spades++
                    break;
                case 'hearts':
                    hearts++
                    break;
                case 'diamonds':
                    diamonds++
                    break;
                case 'clubs':
                    clubs++
                    break;
            }
        }

        condizione = spades >= 5 || diamonds >= 5 || hearts >= 5 || clubs >= 5;

        return condizione;
    }

    static calcScore(playerCards: cardProperties[], tableCard?: cardProperties[]){
        const
         coppia: number = 1,
         doppiaCoppia: number = 2,
         tris: number = 3,
         scala: number = 4,
         colore: number = 5,
         full: number = 6,
         poker: number = 7,
         scalaColore: number = 8,
         scalaReale: number = 9;

        let score: number = 0; 
        const allCards: cardProperties[] = [];

        playerCards.map(carta => allCards.push(carta));
        tableCard?.map(carta => allCards.push(carta));
        allCards.sort();

        let numeriUguali: number[] = [];
        let lastCard: number = 0;

        // calcolo coppie, tris, poker e full
        for(let i = 0; i<allCards.length; i++){
            if(i>0){
                if(allCards[i].numero == lastCard){
                    if(numeriUguali.includes(allCards[i].numero)){
                        numeriUguali.push(allCards[i].numero);
                    } else {
                        numeriUguali.push(lastCard, allCards[i].numero);
                    }
                }
            }
            lastCard = allCards[i].numero;
        }
        switch(numeriUguali.length) {
            //niente
            case 0:
                break;
            // coppia
            case 2:
                score = coppia
                break;
            // tris
            case 3: 
                score = tris
                break;
            // doppia coppia o poker
            case 4:
                let condizione: boolean = this.verifica(numeriUguali, 0) == 4
                condizione ? score = poker : score = doppiaCoppia;
                break;
            // full
            case 5: 
                score += full;
                break;
            // poker o full o doppia coppia
            case 6: 
                if(this.verifica(numeriUguali, 0)){
                    score = poker;
                } else if(this.verifica(numeriUguali, 0)){
                    score = full;
                } else {
                    score = doppiaCoppia;
                }
                break; 
            // poker o full 
            case 7: 
                if(this.verifica(numeriUguali, 0) == 7){
                    score = poker;
                } else {
                    score = full;
                }
                break;
        }
        
        if(this.verifica(allCards.map(numero => numero.numero).sort(), 1) >= 5){  // verifica che ci siano almeno 5 carte di numeri consecutivi
            score = scala;
        }

        if(this.verficaColore(allCards)){
            score = colore;
        }

        return score;
    }
};

export default gameHelper;