//This is where you put the code that reaches out to the server to send information back and forth.
//Info can travel back and forth using using fetches.
// document.querySelector('button').addEventListener('click', () => {
//     fetch(collection, {
//         method: 'get',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({
//            id: document.querySelector('select').value
//         })
//     })
// })


// async function markComplete(){
//     const itemText = document.querySelector('#selectNumberOne').innerText
//     try{
//         const response = await fetch('seeUnit', {
//             method: 'get',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify({
//                 'unitName': itemText
//             })
//           })
//         const data = await response.json()
//         console.log(data)
//         location.reload()

//     }catch(err){
//         console.log(err)
//     }
// }

// document.querySelector('#button').addEventListener('click', markComplete)
// //let button = querySelector('button')
// //let selectNumberOne = document.querySelector('#selectNumberOne')
// //button.addEventListener('click', () => {
//     fetch('/seeUnit', {
//         method: 'get',
//         headers: {'Content-Type': 'application/json'},
//         bod
//     })
//     const test = selectNumberOne.value
//     // test = selectNumberOne.options[selectNumberOne.selectedIndex].text
//     //document.querySelector('#selectedUnitInfo').innerHTML = test
//     //console.log(db.collection('AOE41stCollection').find({id: 'carrack4'}))
// //})

// exports.test = test

// const submitButton = querySelector('#submit')

// submitButton.addEventListener('click', sendSelectedUnit)

// async function sendSelectedUnit(){
//     const selectedUnit = document.querySelector('#selectNumberOne').innerText
//     console.log(selectedUnit)
//     try{
//     let unitObject = await fetch('/getSelectedUnitObject',{
//         method: 'get',
//         headers:{
//             'Content-Type':'application/json'
//         },
//         body: JSON.stringify({
//             selectedUnit: selectedUnit
//         })
//     })
//     const data = await unitObject.json()
//     console.log(data)
//     location.reload()
// }catch(err){
//     console.log(err)
// }
// }
if (typeof document !== "undefined") {
    console.log( 'document exists')
} else {
    console.log( 'document does not exist')
}

let selectionCounter = 0
function cloneSelect1() {
    let section = document.getElementById('sectionOne')
    let clone = section.cloneNode(true)
    let name = section.getAttribute('name') + selectionCounter++
    clone.id =  name
    clone.setAttribute('name', name)
    document.querySelector('#divOne').appendChild(clone)
    //console.log('working')
}
// function cloneSelect1() {
//     let select = document.getElementById('sectionOne')
//     let clone = select.cloneNode(true)
//     let name = select.getAttribute('name') + selectionCounter++
//     clone.id =  name
//     clone.setAttribute('name', name)
//     document.querySelector('#form').appendChild(clone)
//     //console.log('working')
// }
function cloneSelect2() {
    let section = document.getElementById('sectionTwo')
    let clone = section.cloneNode(true)
    let name = section.getAttribute('name') + selectionCounter++
    clone.id =  name
    clone.setAttribute('name', name)
    document.querySelector('#divTwo').appendChild(clone)
    //console.log('working')
}



document.getElementById('addAnotherSelectRowForTeam1').addEventListener('click', cloneSelect1)
document.getElementById('addAnotherSelectRowForTeam2').addEventListener('click', cloneSelect2)

console.log('winner')


//get tech options for selected option
let selectElement1 = document.querySelector("#selectNumberOne")
let selectElement2 = document.querySelector("#selectNumberTwo")

async function getTechOptionsForSelect1(){
    const selectText1 = selectElement1.options[selectElement1.selectedIndex].text;
    try{
        const response = await fetch('/getSelectTechs1', {
            method: 'GET',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'selectText1': selectText1
            })
        })
        const data = await response.json()
        console.log(data)
        //location.reload()
    }catch(err){
        console.log(err)
    }
}

async function detectChange(selection){
    try{
        const response = await fetch('/getSelectTechs1', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'selectText1': selection.value
            })
        })
        //const data = await response.json()
        console.log(selection.value)
        //console.log(data)
        //location.reload()
    }catch(err){
        console.log(err)
    }
    
}