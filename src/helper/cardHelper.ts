interface cardProperties{
    seme: string,
    numero: string,
    valore: number
}

class cardHelper{
    static converNumberToCard (number: number): cardProperties {

            let numero: string;
            let seme: string;
            let valore: number;

            if(number<=13){
                seme = 'hearts';
                numero = `${number}`;
                valore = parseInt(numero)
            } else if(number<=26){
                seme = 'spades';
                numero = `${number - 13}`;
                valore = parseInt(numero)
            } else if(number<=39){
                seme = 'clubs';
                numero = `${number - 26}`;
                valore = parseInt(numero)
            } else{
                seme = 'diamonds';
                numero = `${number - 39}`;
                valore = parseInt(numero)
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

            return {seme, numero, valore}
        }
    }