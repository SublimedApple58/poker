
interface cardProperties{
    seme: string,
    nome: string,
    numero: number,
    valore: number,
    src: string
}

class cardHelper{
    static converNumberToCard (number: number): cardProperties {

            let 
                nome: string,
                numero: number,
                seme: string,
                valore: number,
                src: string;

            if(number<=13){
                seme = 'hearts';
                valore = number;
                nome = valore.toString();
                numero = valore;
            } else if(number<=26){
                seme = 'spades';
                valore = number - 13;
                nome = valore.toString();
                numero = valore;
            } else if(number<=39){
                seme = 'clubs';
                valore = number - 26;
                nome = valore.toString();
                numero = valore;
            } else{
                seme = 'diamonds';
                valore = number - 39;
                nome = valore.toString();
                numero = valore;
            }

            switch (parseInt(nome)) {
                case 1:
                    nome = 'ace';
                    valore = 14;
                    break;
                case 11: 
                    nome = 'jack';
                    break;
                case 12: 
                    nome = 'queen';
                    break;
                case 13:
                    nome = 'king';
                    break;
            }


            src = `../../cartePng/${nome}_of_${seme}.png`;

            return {seme, nome, numero, valore, src}
        }

        static generateCasualCard(playersNum: number): number[]{
            const
                cardsToGive = (playersNum * 2)+ 5,
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