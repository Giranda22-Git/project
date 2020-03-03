'use strict'

window.onload = function(){
    let
        modal = document.querySelector('#modal-body'),
        modal_close = document.querySelector('#modal-close'),
        actionList = document.querySelectorAll('#action_list')
    ;
    fetch('https://rickandmortyapi.com/api/character/')
            .then(response => {
                this.console.log(response);
                if(response.status !== 200){
                    this.console.log('sorry, error...');
                } else {
                    return response.json();
                }
            })
            .then(json => renderList(json))
            .catch(err => this.console.log(err));
    
    function renderList(data){
        let 
            rawData = data,
            list = [...rawData.results],
            info = rawData.info
        ;
        console.log(list);

        document.querySelector('.total').textContent = info.count;

    }
    
    for(let i = 0; i < actionList.length; i++){
        actionList[i].addEventListener('click', function(){
            modal.classList.remove('display_none');
            modal.classList.add('display_flex');
            modal_close.classList.remove('display_none');
        })
    }

    modal_close.addEventListener('click', function(){
        modal_close.classList.add('display_none');
        modal.classList.remove('display_flex');
        modal.classList.add('display_none');
    })
}