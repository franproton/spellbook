const spellbookContainer = document.getElementById('spellbooks-container')

const databaseURL = "db.json"

let currentScope = []

fullscreenButton = document.getElementById('fullscreen-button')
fullscreenButton.addEventListener(
    "click",
    (e) => {
        toggleFullScreen()
        fullscreenButton.style.display = 'none'
    },
    false,
  );

function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
}



fetch(databaseURL).then(response => {
    return response.json();
}).then(database => {
    parseArrayToHTML(database, (item) => {parseArrayToHTML(item.spells, (spell) => renderSpell(spell) )})
})


// Now with event listeners!
function parseArrayToHTML(arr, callback) {
    currentScope = parseArrayToHTML.bind(null, arr, callback)

    spellbookContainer.innerHTML = ""
    arrayDOMPointers = []
    selectedDOMPointers = []

    arr.forEach((item, index) => {
        spellbookContainer.insertAdjacentHTML('beforeend', renderListItem(index, item.name, item.prepared, item.level))
        arrayDOMPointers.push(document.getElementById(`item-${index}`))
        arrayDOMPointers[index].addEventListener('click', () => callback(item))

        if (item.prepared !== undefined) {
            selectedDOMPointers.push(document.getElementById(`selected-${index}`))
            selectedDOMPointers[index].addEventListener('click', () => {
                item.prepared ? item.prepared = false : item.prepared = true
                parseArrayToHTML(arr, callback)
            })
        }
        
    });
}

function renderListItem(index, name, prepared, level = '') {
    return `
    <div class="list-item">
        <div class="${prepared === undefined ? '' : 'prepared'}${prepared === true ? ' prepared-true' : ''}" id="selected-${index}"></div>
        <div class="level">${level}</div>              
        <div class="name" id="item-${index}">${name}</div>
    </div>`
}

function renderSpell(spell) {
    spellbookContainer.innerHTML =
    `
    <div class="spell-container">
        <div id="back-button">Back</div>
        <div class="inner-container">
            <div class="top-section">
                <div class="name">${spell.name}</div>
                <div class="spell-level">Nivel ${spell.level}, ${spell.school} ${spell.ritual ? '(ritual)' : ''}</div>
            </div>
            <div class="middle-section">
                <div class="casting-time">Tiempo de lanzamiento ${spell.castingTime}</div>
                <div class="range">Alcance ${spell.range}</div>
                <div class="components">Componentes ${spell.components}</div>
                <div class="duration">Duracion ${spell.duration} ${spell.concentration ? '(concentracion)' : ''}</div>
            </div>
            <div class="bottom-section">
                <div class="description">${spell.description}</div>
            </div>
        </div>
    </div>
    `
    const backButton = document.getElementById('back-button')
    backButton.addEventListener('click', currentScope)
}








