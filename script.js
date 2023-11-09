'use strict'

let carta = document.querySelectorAll('.card');
let figura = document.querySelectorAll('.figura');

for(let i=0; i<carta.length; i++){
    carta[i].onclick = ()=>{
       if(figura[i].style.background == 'rgb(193, 22, 22)'){
            figura[i].style.background = 'blue';
       } else {
            figura[i].style.background = 'rgb(193, 22, 22)';
       }
    }
}