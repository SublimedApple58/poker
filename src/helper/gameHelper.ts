
export interface cardProperties{
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
    
    static verifica1(array: number[], scala: boolean){ // funzione che veririfica quanti numeri uguali ci sono ed eventualmente le carte consecutive per le scale
        array.sort(function(a, b) {
            if(a === b){
                return 0;
            } else {
                return a < b ? -1 : 1;
            }
        });
        let 
         sequence: number[] = [],
         numeriUguali: number[] = [];

        for(let i = 0; i<array.length; i++){
            if(i>0){
                if(scala){
                    if(array[i] == 13 && array.includes(1)){
                        array[i] == array[i-1]+1 ? sequence.push(array[i]): sequence = [13];
                        sequence.push(1);
                        let numero = 2;
                        for(let j = 0; j<array.length; j++){
                            if(array[j] == numero){
                                sequence.push(numero);
                                numero++;
                            }
                        }
                    } else {
                        array[i] == array[i-1]+1 ? sequence.push(array[i]): sequence;
                    }
                } else {
                    if(array[i] == array[i-1]){
                        if(i>1){
                            numeriUguali.includes(array[i-1]) ? numeriUguali.push(array[i]) : numeriUguali.push(array[i-1], array[i]);
                        } else {
                            numeriUguali.push(array[i-1], array[i]);
                        }
                    }
                }
            }
        }
        if(scala){
            return sequence;
        } else {
            return numeriUguali;
        }
    }

    static verifica2(array: cardProperties[], scala: boolean){ // verifica colore o scala colore, true per scala colore, false per colore

            let 
             semi: string[] = [],
             condizione: boolean = false;
            for(let i = 0; i<array.length; i++){
                if(i>0){
                    if(!semi.includes(array[i].seme)){
                        semi.push(array[i].seme)
                    }
                } else {
                    semi.push(array[i].seme)
                }
            }
            for(let i = 0; i<semi.length; i++){
                let arraySeme = [];
                for(let j = 0; j<array.length; j++){
                    if(array[j].seme == semi[i]){
                        arraySeme.push(array[j].numero);
                    }
                }
                if(scala){
                    arraySeme = arraySeme.sort(function(a, b) {
                        if(a === b){
                            return 0;
                        } else {
                            return a < b ? -1 : 1;
                        }
                    });
                    let 
                    current = 1,
                    max = 0;
                    for(let j = 0; j<arraySeme.length; j++){
                        if(j>0){
                            if(arraySeme[j] == 13 && arraySeme.includes(1)){
                                arraySeme[j] == arraySeme[j-1]+1 ? current++ : current = 1;
                                current+=1;
                                let numero = 2;
                                for(let k = 0; k<arraySeme.length; k++){
                                    if(arraySeme[k] == numero){
                                        current++;
                                        numero++;
                                    }
                                }
                            } else {
                                arraySeme[j] == arraySeme[j-1]+1 ? current++ : current = 1;
                            }
                            max < current ? max = current : max;
                        }
                    }
                    max >= 5 ? condizione = true : condizione;
                } else {
                    condizione = arraySeme.length > 4;
                }
                if(condizione){
                    break;
                }
            }
            return condizione;

    }

    static checkScalaReale(array: cardProperties[]){
            let 
             semi: string[] = [],
             condizione: boolean = true;

            for(let i = 0; i<array.length; i++){
                if(i>0){
                    if(array[i].seme != array[i-1].seme && !semi.includes(array[i].seme)){
                        semi.push(array[i].seme)
                    }
                } else {
                    semi.push(array[i].seme)
                }
            }
            for(let i = 0; i<semi.length; i++){
                condizione = true;
                let arraySeme = [];
                for(let j = 0; j<array.length; j++){
                    if(array[j].seme == semi[i]){
                        arraySeme.push(array[j].numero);
                    }
                }
                arraySeme.sort(function(a, b) {
                    if(a === b){
                        return 0;
                    } else {
                        return a < b ? -1 : 1;
                    }
                });

                if(arraySeme.includes(11)){
                    for(let j = 0; j<arraySeme.length; j++){
                        if(arraySeme[j] == 11){
                            for(let n = j; n<arraySeme.length; n++){
                                if(arraySeme[n] == 13){
                                    if(arraySeme.includes(1)){
                                        arraySeme[n] != arraySeme[n-1]+1? condizione = false : condizione;
                                    } else {
                                        condizione = false;
                                    }
                                } else {
                                    arraySeme[n] != arraySeme[n-1]+1 ? condizione = false : condizione;
                                }
                            }
                        }
                    }
                } else {
                    condizione = false;
                }
                if(condizione){
                    break;
                }
            }
            return condizione;
    }

    static ugualianze(array: number[]) {
        let diversi: number[] = [];
    
        for(let i = 0; i < array.length; i++) {
            if(i > 0){
                !diversi.includes(array[i]) ? diversi.push(array[i]) : null;
            } else {
                diversi.push(array[i]);
            }
        }
    
        let maxContatore: number = 0;
    
        for(let i = 0; i < diversi.length; i++) {
            let contatore: number = 0;
    
            for(let j = 0; j < array.length; j++) {
                if (diversi[i] === array[j]) {
                    contatore++;
                }
            }
    
            maxContatore < contatore ? maxContatore = contatore : maxContatore;
        }
    
        return maxContatore;
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
        const 
         allNumbers: number[] = [],
         allCards: cardProperties[] = [];

        playerCards.map(carta => allCards.push(carta));
        tableCard?.map(carta => allCards.push(carta));
        playerCards.map(carta => allNumbers.push(carta.numero));
        tableCard?.map(carta => allNumbers.push(carta.numero));

        // calcolo coppie, tris, poker e full
        let uguali: number[] = [];
        uguali = this.verifica1(allNumbers, false)
        uguali.sort(function(a, b) {
            if(a === b){
                return 0;
            } else {
                return a < b ? -1 : 1;
            }
        });

        const x = this.ugualianze(uguali);
        switch(uguali.length) {
            //niente
            case 0:
                break;
            // coppia
            case 2:
                score < coppia ? score = coppia : score;
                break;
            // tris
            case 3: 
                score < tris ? score = tris : score;
                break;
            // doppia coppia o poker
            case 4: //fixare
                x == 4 ? score = poker : score = doppiaCoppia;
                break;
            // full
            case 5: 
                score = full;
                break;
            // poker o full o doppia coppia
            case 6: //fixare
                x == 4 ? score = poker : score;
                x == 3 ? score = full : score;
                x == 2 ? score = doppiaCoppia : score;
                break; 
            // poker o full 
            case 7: // fixare
                x == 4 ? score = poker : score;
                x == 3 ? score = full : score;
                break;
        }

        // scala reale
        if(this.checkScalaReale(allCards)){
            score = scalaReale;
        } else {
            // scala colore
            if(this.verifica2(allCards, true)){
                score = scalaColore;
            } else {
                // colore
                if(this.verifica2(allCards, false)){
                    score < colore ? score = colore : score;
                } else {
                    // scala
                    if(this.verifica1(allCards.map(numero => numero.numero), true).length >= 5){  // verifica che ci siano almeno 5 carte di numeri consecutivi
                        score < scala ? score = scala : score;
                    }
                }
            }
        }   

        return score;
    }
};

export default gameHelper;