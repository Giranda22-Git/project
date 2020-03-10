'use strict'

window.onload = function(){
    let
        modal = document.querySelector('#modal-body'),
        modal_close = document.querySelector('#modal-close'),
        right_array = document.querySelector('.right-array > span'),
        left_array = document.querySelector('.left-array > span'),
        avatar = document.querySelector('#modal-avatar'),
        description = document.querySelector('#modal-description'),
        page_index = 1,
        max_pages = 0,
        loaded = 0,
        oneChange = 0,
        ArrayLoad = []
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
        console.log(list);

        if(oneChange < 1)
        {
            for(let i = 1; i <= info.pages; i++){
                ArrayLoad[i] = i;
            }
            oneChange++;
        }


        if(inArray(page_index, ArrayLoad) + 1){
            if(loaded <= info.count && road != 'left')
            {
                loaded += list.length;
                delete ArrayLoad[inArray(page_index, ArrayLoad)];
                console.log(ArrayLoad);
            }
        }


        
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
                avatar.style.cssText = `
                    background: url('${list[i].image}') center no-repeat;
                    background-size: cover;
                `
                description.innerHTML = `
                    <li class="description">Name: ${list[i].name}</li>
                    <li class="description">Status: ${list[i].status}</li>
                    <li class="description">Species: ${list[i].species}</li>
                    <li class="description">Gender: ${list[i].gender}</li>

                `
                
                

                modal.classList.remove('display_none');
                modal.classList.add('display_flex');
                modal_close.classList.remove('display_none');
            })
        }

    }

    function inArray(checker, array){
        for (let i = 0; i < array.length; i++)
        {
            if(array[i] == checker)
                return i;
        }
    }

    function clearList(){
        let actionList = document.querySelectorAll('#item');

        for (let i = 0; i < actionList.length; i++)
            actionList[i].remove();
    }

    right_array.addEventListener('click', function(){
        if(page_index + 1 <= max_pages)
        {
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