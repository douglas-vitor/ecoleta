function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
    .then( (res) => { return res.json()} )
    .then( (states) => {
        for( state of states ) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}
populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")
    
    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = `<option value="">Selecione a Cidade</option>`
    citySelect.disabled = true

    fetch(url)
    .then( (res) => { return res.json()} )
    .then( (cities) => {
        for( city of cities ) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)



    // Itens de coleta
const itemsToCollect = document.querySelectorAll(".items-grid li")
for (item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("Input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target
    itemLi.classList.toggle("selected")
    const itemId = event.target.dataset.id

    
    // Verificar se existe itens selecionados, se sim, pega os itens selecionados
    const alreadySelected = selectedItems.findIndex( (item) => {
        const itemFound = item == itemId
        return itemFound 
    } )

    // Se ja estiver selecionado, tirar da seleção
    if( alreadySelected >= 0) {
        const filteredItems = selectedItems.filter( (item) => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        selectedItems = filteredItems
    } else {
    // Se não estiver selecionado, adiionar na seleção
        selectedItems.push(itemId)
    }
    // Atualizar o campo com os itens selecionados
    collectedItems.value = selectedItems
}