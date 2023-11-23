const modes = ["Monochrome", "Monochrome-dark", "Monochrome-light", "Analogic", "Complement", "Analogic-complement", "Triad"]
const listModes = document.getElementById("list-modes")
const btnColor = document.getElementById("btn-color")
const columnContainer = document.getElementById("column-container")

const renderOptions = () => {
    modes.forEach(mode => {
    listModes.innerHTML += `<option value="${mode}">${mode}</option>`
    })
}

btnColor.addEventListener("click", function(){
    document.getElementById("column-container").innerHTML = "" //reset
    const hexValue = document.getElementById("color-selector").value.slice(1)
    const selectValue = listModes.value.toLowerCase()
    fetch(`https://www.thecolorapi.com/scheme?hex=${hexValue}&mode=${selectValue}`, {method: "GET"})
    .then(res => res.json())
    .then(data => { displayColours(data) })
})

function displayColours(data){
    for (let color of data.colors){
        console.log(data.colors.indexOf(color))
        columnContainer.innerHTML += `
            <div class="column" id="color-${data.colors.indexOf(color)}" data-color="${color.hex.value}"><p>${color.hex.value}</p></div>`
            
        const colorColumn = document.getElementById(`color-${data.colors.indexOf(color)}`)
        colorColumn.style.backgroundColor = `${color.hex.value}`
        }
}

 columnContainer.addEventListener('click', function(e){
        console.log(e.target.dataset.color)
        if (e.target.id.includes("color")){
            console.log(e.target.id)
            navigator.clipboard.writeText(e.target.dataset.color)
        } 
})

renderOptions()