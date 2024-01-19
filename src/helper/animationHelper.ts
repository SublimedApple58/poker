class animationHelper{
    static createChipsElement(){
        const 
            container = document.querySelector('.contenitore'),
            box = document.createElement('div');
        
        box.classList.add('chips', 'temporaryChips')
        container?.appendChild(box);
        console.log(typeof(container))
    }

    static moveChipsElement(){

    }
}

export default animationHelper;