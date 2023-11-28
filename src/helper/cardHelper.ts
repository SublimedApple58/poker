
interface cardProperties{
    seme: string,
    numero: string,
    valore: number,
    src: string
}

class cardHelper{
    static converNumberToCard (number: number): cardProperties {

            let numero: string;
            let seme: string;
            let valore: number;
            let src: string

            if(number<=13){
                seme = 'hearts';
                valore = number;
                numero = valore.toString();
            } else if(number<=26){
                seme = 'spades';
                valore = number - 13;
                numero = valore.toString();
            } else if(number<=39){
                seme = 'clubs';
                valore = number - 26;
                numero = valore.toString();
            } else{
                seme = 'diamonds';
                valore = number - 39;
                numero = valore.toString();
            }

            switch (parseInt(numero)) {
                case 1:
                    numero = 'ace';
                    valore = 14;
                    break;
                case 11: 
                    numero = 'jack';
                    break;
                case 12: 
                    numero = 'queen';
                    break;
                case 13:
                    numero = 'king';
                    break;
            }

            src = `../../cartePng/${numero}_of_${seme}.png`;

            return {seme, numero, valore, src}
        }

        static generateCasualCard(playersNum: number): number[]{
            const
                cardsToGive = (playersNum * 2),
                deckOfCards = Array.from({length: 52}, (_, i) => i + 1),
                drawnCards  = [];

            for (let i = 0; i < cardsToGive; i++) {
                const indexDrawnCard = Math.random() * deckOfCards.length;
                const drawnCard = deckOfCards.splice(indexDrawnCard, 1)[0];
                drawnCards.push(drawnCard);
            }

            return drawnCards;
        }

    }

    export default cardHelper;