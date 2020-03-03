
window.onload = function(){
    let
        modal = document.querySelector('#modal-body'),
        modal_close = document.querySelector('#modal-close'),
        actionList = document.querySelectorAll('#action_list')  
    ;
    console.log(actionList);
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