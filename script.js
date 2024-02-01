
function Spellbook() {
    spells = []
}

function Spell(name, description) {
    this.name = name
    this.description = description
}

const spellbooksContainer = document.getElementById('spellbooks-container')

const databaseURL = "db.json"


fetch(databaseURL).then(response => {
    return response.json();
}).then(database => {
    parseDatabase(database)
})



function parseDatabase(database) {
    spellbooksDOMPointers = []

    database.forEach((spellbook, index) => {
        spellbooksContainer.appendChild(renderSpellbook(spellbook, index))
        
        spellbooksDOMPointers.push(document.getElementById(`spellbook-${index}`))
 
        spellbooksDOMPointers[index].addEventListener('click', () => {spellbookClicked(spellbook)})    
    });
}



function renderSpellbook(spellbook, index) {
    const spellbookHTML = document.createElement("div")
    spellbookHTML.setAttribute('class', 'spellbook-name')
    spellbookHTML.id = `spellbook-${index}`

    spellbookNameHTML = document.createTextNode(spellbook.name)
    spellbookHTML.appendChild(spellbookNameHTML)
    
    return spellbookHTML;
}


function spellbookClicked(spellbook) {
    spellbooksContainer.innerHTML = ""

    spellbook.spells.forEach((spell, index) => {
        spellbooksContainer.appendChild(renderSpell(spell, index))
    });
    
}



function renderSpell(spell, index) {
    const spellHTML = document.createElement("div")
    spellHTML.setAttribute('class', 'spell-name')
    spellHTML.id = `spell-${index}`

    spellNameHTML = document.createTextNode(spell.name)
    spellHTML.appendChild(spellNameHTML)
    
    return spellHTML;
}








