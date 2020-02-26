'use strict'

document.body.addEventListener( 'load', function(){
    let
        modal = document.querySelector('#modal'),
        actionList = document.querySelectorAll('#action_list')    
    ;

    for(let i = 0; i < actionList.length; i++){
        actionList[i].addEventListener('click', function(){
            modal.classList.remove('display_block');  
            console.log('jhjhj');         
        })
    }
})