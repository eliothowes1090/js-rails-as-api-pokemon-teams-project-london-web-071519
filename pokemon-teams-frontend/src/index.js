const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.querySelector('main')
let buttons = null

const getAllPokemon = () => {
   return  fetch('http://localhost:3000/trainers')
    .then(resp => resp.json())
    .then(trainers => {
        main.innerHTML = ''
        trainers.forEach(renderTrainer)
    }).then(() => {
        return buttons = document.querySelectorAll('button')
    }).then(() => addButtonEventListeners()) 
}

const renderTrainer = trainer => {
    const trainerDiv = document.createElement('div')
    trainerDiv.classList.add('card')
    trainerDiv.setAttribute('data-id', `${trainer.id}`)
    trainerDiv.innerHTML = `<p>${trainer.name}</p><button data-trainer-id="${trainer.id}">Add Pokemon</button>`

    const ul = document.createElement('ul')
    trainer.pokemons.forEach(pokemon => {
        ul.append(renderPokemon(pokemon))
    })

    trainerDiv.append(ul)
    main.append(trainerDiv)
}

const renderPokemon = pokemon => {
    const li = document.createElement('li')
    li.innerHTML = `${pokemon.nickname} (${pokemon.species})<button class="release" data-pokemon-id="${pokemon.id}">Release</button>`
    return li
}



 const addButtonEventListeners = () => {
     
     [...buttons].forEach(button => {
         button.addEventListener('click', event => {
         handleButtonEvent(event)
         })
     })
 }

const handleButtonEvent = event => {
    // debugger
    if (event.target.innerText === "Add Pokemon") {
        createPokemon(event)
    } else if (event.target.innerText === "Release") {
        destroyPokemon(event)
    }
}

const createPokemon = event => {
    // debugger
    const trainerId = (parseInt(event.target.getAttribute('data-trainer-id'))).toString()
    
    fetch(POKEMONS_URL, {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({trainer_id: trainerId})
    }).then(resp => resp.json()).then(getAllPokemon()).catch(error => alert(error.message))
}

const destroyPokemon = event => {
    // debugger
    const pokemonId = (parseInt(event.target.getAttribute('data-pokemon-id'))).toString()
    fetch(`${POKEMONS_URL}/${pokemonId}`, {
        method: "Delete"
    }).then(resp => resp.json()).then(event.target.parentElement.remove()).catch(error => alert(error.message))
}

getAllPokemon()