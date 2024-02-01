const spellbookContainer = document.getElementById('spellbooks-container')

const databaseURL = "db.json"


fetch(databaseURL).then(response => {
    return response.json();
}).then(database => {
    parseArrayToHTML(database, 'spellbook')
})


// Now with event listeners!
function parseArrayToHTML(database, type) {
    arrayDOMPointers = []

    database.forEach((element, index) => {
        spellbookContainer.appendChild(renderElement(element, index, type))
        
        arrayDOMPointers.push(document.getElementById(`${type}-${index}`))
 
        arrayDOMPointers[index].addEventListener('click', () => {elementClicked(element, 'spell')})    
    });
}

function renderElement(element, index, type) {
    const elementHTML = document.createElement("div")
    elementHTML.setAttribute('class', `${type}-name`)
    elementHTML.id = `${type}-${index}`

    elementNameHTML = document.createTextNode(element.name)
    elementHTML.appendChild(elementNameHTML)
    
    return elementHTML;
}


//Can this function and parseArrayToHTML be combined into one and call itself but with a different list?
function elementClicked(spellbook, type) {
    spellbookContainer.innerHTML = ""
    spellsDOMPointers = []

    spellbook.spells.forEach((spell, index) => {
        spellbookContainer.appendChild(renderElement(spell, index, type))

        spellsDOMPointers.push(document.getElementById(`${type}-${index}`))

        spellsDOMPointers[index].addEventListener('click', () => {renderSpell(spell)})    
    });
}

function renderSpell(spell) {
    spellbookContainer.innerHTML =
    `
    
    `
}








