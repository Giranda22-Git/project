'use strict'

window.onload = function(){
    let
        modal = document.querySelector('#modal-body'),
        modal_close = document.querySelector('#modal-close'),
        right_array = document.querySelector('.right-array > span'),
        left_array = document.querySelector('.left-array > span'),
        page_index = 1,
        max_pages = 0,
        loaded = 0,
        max_loaded_page = 1,
        time_machine = 0
    ;
    
    loadData(page_index, 'default');

    function loadData(page, road){
        fetch('https://rickandmortyapi.com/api/character/?page=' + page)
            .then(response => {
                console.log(response);
                if(response.status !== 200){
                    console.log('sorry, error...');
                } else {
                    clearList();
                    return response.json();
                }
            })
            .then(json => renderList(json, road))
            .catch(err => console.log(err));
    }
    
    function renderList(data, road){
        let 
            rawData = data,
            list = rawData.results,
            info = rawData.info
        ;
        console.log(page_index + "      " + max_loaded_page + "        " + time_machine);

        if(loaded <= info.count && road != 'left' && page_index == max_loaded_page && page_index > time_machine)
            loaded += list.length;
        max_pages = info.pages;

        document.querySelector('.allCurrent').textContent = info.count;
        document.querySelector('.current').textContent = loaded;
        document.querySelector('.max-pages').textContent = info.pages;
        document.querySelector('.current-pages').textContent = page_index;


        const listContainer = document.querySelector('.relative_front_sec1');

        list.forEach((el, i, arr) => {

            listContainer.innerHTML += `
                <li id="item">${el.id} &nbsp;&nbsp;&nbsp; ${el.name}</li>
            `
        })

        let actionList = document.querySelectorAll('#item');

        for (let i = 0; i < actionList.length; i++) {
            actionList[i].addEventListener('click', function(){
                modal.classList.remove('display_none');
                modal.classList.add('display_flex');
                modal_close.classList.remove('display_none');
            })
        }

        time_machine = page_index;
    }

    function clearList(){
        let actionList = document.querySelectorAll('#item');

        for (let i = 0; i < actionList.length; i++)
            actionList[i].remove();
    }

    right_array.addEventListener('click', function(){
        if(page_index + 1 <= max_pages)
        {
            if(page_index == max_loaded_page)
                max_loaded_page++;
            page_index++;
            loadData(page_index, 'right');
            
        }
    })

    left_array.addEventListener('click', function(){
        if(page_index - 1 > 0)
        {
            page_index--;
            
            loadData(page_index, 'left');
        }
    })

    
    

    modal_close.addEventListener('click', function(){
        modal_close.classList.add('display_none');
        modal.classList.remove('display_flex');
        modal.classList.add('display_none');
    })
}