const spellbookContainer = document.getElementById('spellbooks-container')

const databaseURL = "db.json"


fetch(databaseURL).then(response => {
    return response.json();
}).then(database => {
    parseArrayToHTML(database, (item) => {parseArrayToHTML(item.spells, (spell) => renderSpell(spell) )})
})


// Now with event listeners!
function parseArrayToHTML(arr, callback) {
    spellbookContainer.innerHTML = ""
    arrayDOMPointers = []

    arr.forEach((item, index) => {
        spellbookContainer.insertAdjacentHTML('beforeend', renderListItem(index, item.name, item.prepared, item.level))
        arrayDOMPointers.push(document.getElementById(`item-${index}`))
        arrayDOMPointers[index].addEventListener('click', () => callback(item))    
    });
}

function renderListItem(index, name, prepared = false, level = '') {
    return `
    <div class="list-item" id="item-${index}">
        <div class="${prepared ? 'prepared' : ''}"></div>
        <div class="level">${level}</div>           
        <div class="name">${name}</div>
    </div>`
}

function renderSpell(spell) {
    console.log(spell);
    spellbookContainer.innerHTML =
    `
    <div class="spell-container">
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
}








