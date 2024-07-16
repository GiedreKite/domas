// rikiavimas
// localStorage


/*
Local storage normaliai nepriima :
Infinity
NaN
null
undefinded
*/

const h1DOM = document.querySelector('h1');
const formDOM = document.forms[0];
const textInputDOM = formDOM.querySelector('input');
const submitButtonDOM = formDOM.querySelector('button');
const listDOM = document.querySelector('.list');

const toastDOM = document.querySelector('.toast');
const toastTitleDOM = toastDOM.querySelector('.title');
const toastMessageDOM = toastDOM.querySelector('.message');
const toastCloseDOM = toastDOM.querySelector('.close');

toastCloseDOM.addEventListener('click', () => {
toastDOM.classList.remove('active')
});



let todoData = [];

const localData = localStorage.getItem('task');
if (localData!== null) {
    const localDataArray = JSON.parse(localData);
    todoData = localDataArray;
    renderList();
}

submitButtonDOM.addEventListener('click', e => {
    e.preventDefault();

    const validationMsg = isValidText(textInputDOM.value);
    if (validationMsg !== true) {

        showToastError(validationMsg)
        
        return;
    }

    todoData.push({
        text: textInputDOM.value.trim(),
        createdAt: Date.now(),
    });
    renderList();

    showToastSuccess('Irasas sekmingai sukurtas');
       localStorage.setItem('task', JSON.stringify(todoData));
});
 


function renderList() {
    if (todoData.length === 0) {
        renderEmptyList();
    } else {
        renderTaskList();
    }
}

function renderEmptyList() {
    listDOM.classList.add('empty');
    listDOM.textContent = 'Empty';
}

function renderTaskList() {
    let HTML = '';

    for (const todo of todoData) {
        HTML += `
            <article class="item">
                <div class="date">${formatTime(todo.createdAt)}</div>
                <div class="text">${todo.text}</div>
                <form class="hidden">
                    <input type="text">
                    <button type="submit">Update</button>
                    <button type="button">Cancel</button>
                </form>
                <div class="actions">
                    <button>Done</button>
                    <div class="divider"></div>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            </article>`;
    }

    listDOM.innerHTML = HTML;
    listDOM.classList.remove('empty');

    const articlesDOM = listDOM.querySelectorAll('article');

    for (let i = 0; i < articlesDOM.length; i++) {
        const articleDOM = articlesDOM[i];
        const articleEditFormDOM = articleDOM.querySelector('form');
        const updateInputDOM = articleEditFormDOM.querySelector('input');
        const buttonsDOM = articleDOM.querySelectorAll('button');

        const updateDOM = buttonsDOM[0];
        updateDOM.addEventListener('click', event => {
            event.preventDefault();
            

         const validationMsg = isValidText(updateInputDOM.value);
        if (validationMsg !== true) {

            showToastError(validationMsg);

        return;
        }

            todoData[i].text = updateInputDOM.value.trim();
            renderTaskList();

            showToastInfo('Iraso informacija sekmingai atnaujinta');
            
        });

        const doneeDOM = buttonsDOM[0];
        doneeDOM.addEventListener('click', () => {
            updateInputDOM.value = 'Atlikta';

            showToastSuccess('Uzduotis atlikta');

        });

        const cancelDOM = buttonsDOM[1];
        cancelDOM.addEventListener('click', () => {
            articleEditFormDOM.classList.add('hidden');

            showToastSuccess('Iraso informacijos redagavimas baigtas be pakeitimu');

        });

        const editDOM = buttonsDOM[3];
        editDOM.addEventListener('click', () => {
            articleEditFormDOM.classList.remove('hidden');

        });

        const deleteDOM = buttonsDOM[4];
        deleteDOM.addEventListener('click', () => {
            todoData.splice(i, 1);
            renderList();

            showToastSuccess('Irasas sekmingai istrintas');

        });
    }
}








function formatTime(timeInMs) {

    const date = new Date(timeInMs);
    const y =date.getFullYear();
    const m = (date.getMonth() < 10 ? '0':'') +(date.getMonth()+1);
    const d = (date.getDate() < 10 ? '0':'') +(date.getDate());
    const h = (date.getHours() < 10 ? '0':'') + date.getHours();
    const mn = (date.getMinutes() < 10 ? '0':'') + date.getMinutes();
    const s = (date.getSeconds() < 10 ? '0':'') + date.getSeconds();

    const months = ['Sausis', 'Vasris', 'Kovas', 'Balandis', 'Geguze', 'Birzelis', 'Liepa', 'Rugpjutis', 'Rugsejis', 'Spalis', 'Lapkritis', 'Gruodis'];
    const weekdays = ['Sekmadienis', 'Pirm', 'Antr', 'Trec', 'Ketvi', 'Penktadienis', 'Sestaienis']
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
    //console.log(d.getFullYear());
    //console.log(d.getMonth(),months[d.getMonth]);
    //console.log(d.getDay(), weekdays[d.getDate()]);
    //console.log(d.getDate());
    //console.log(d.getHours());
    //console.log(d.getMinutes());
    //console.log(d.getSeconds());
    //console.log(d.getMilliseconds());
  


        return `${y}-${m}-${d} ${h}:${mn}:${s}` ;
    }
    // mdn: js Date -> getYear, getMonth, getDay, getHour...

function isValidText(text) {
   
        if (typeof text !== 'string') {
            return 'Informacija turi buti tekstine';
        }
       
        if (text === '') {
            return 'Parasytas tekstas negali buti tuscias';
        }

        if (text.trim()=== '') {
            return 'Parasytas tekstas negali buti vien is tarpu';
        }
       
        if (text[0].toUpperCase() !== text[0]) {
            return 'Tekstas negali prasideti mazaja raide';
        }

        return true;
    };

    function showToast(state,title,msg) {
        toastDOM.classList.add('active');
        toastTitleDOM.textContent = title;
        toastDOM.dataset.state = state;
        toastMessageDOM.textContent = msg;
    }
    
function showToastSuccess (msg) {
    showToast('success', 'Pavyko',msg)
};

function showToastInfo (msg) {
    showToast('info', 'Informacija',msg)
};

function showToastError (msg) {
    showToast('error', 'Klaida',msg)
};



// CRUD operations:
// -----------------------------------
// create   array.push({initial data})
// read     array.map()
// update   array[i] = {updated data}
// delete   array.splice(i, 1)
