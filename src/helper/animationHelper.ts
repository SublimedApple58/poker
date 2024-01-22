class animationHelper{
    static createChipsElement(playerTurn: number){
        const 
            box = document.createElement('div'),
            movement = 300;
        
        let player = document.querySelector(`.n${playerTurn}`);

        box.classList.add('chips', 'temporaryChips')
        player?.appendChild(box);

        setTimeout(() => {
            if(playerTurn == 1 || playerTurn == 5){
                const bottom = -10;      
                    
                box.style.top = `${-(bottom + movement)}px`;
            } else if(playerTurn == 2 || playerTurn == 6){
                const right = -10;
    
                box.style.right = `${-(right + movement + 100)}px`;
            } else if(playerTurn == 3 || playerTurn == 7){
                const bottom = -10;
                
                box.style.bottom = `${-(movement + bottom)}px`;
            } else {
                const left = -10;
                
                box.style.left = `${-(movement + left + 100)}px`;
            }
            box.style.opacity = '0'
        }, 500);

        setTimeout(()=>{
            box.remove();
        }, 1000)

    }
}

export default animationHelper;