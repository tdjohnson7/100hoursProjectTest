//This is where you put the code that reaches out to the server to send information back and forth.
//Info can travel back and forth using using fetches.
// window.onload = function() {


    
//     detectChange('6336077d44d829de28c1fc12')
// }
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
// if (typeof document !== "undefined") {
//     console.log( 'document exists')
// } else {
//     console.log( 'document does not exist')
// }
//add another row for units
// let selectionCounter = 0
// function cloneSelect1() {
//     let section = document.getElementById('sectionOne')
//     let clone = section.cloneNode(true)
//     let name = section.getAttribute('name') + selectionCounter++
//     clone.id =  name
//     clone.setAttribute('name', name)
//     document.querySelector('#divOne').appendChild(clone)
//     //console.log('working')
// }
// function cloneSelect1() {
//     let select = document.getElementById('sectionOne')
//     let clone = select.cloneNode(true)
//     let name = select.getAttribute('name') + selectionCounter++
//     clone.id =  name
//     clone.setAttribute('name', name)
//     document.querySelector('#form').appendChild(clone)
//     //console.log('working')
// }
//add another row for units
// function cloneSelect2() {
//     let section = document.getElementById('sectionTwo')
//     let clone = section.cloneNode(true)
//     let name = section.getAttribute('name') + selectionCounter++
//     clone.id =  name
//     clone.setAttribute('name', name)
//     document.querySelector('#divTwo').appendChild(clone)
//     //console.log('working')
// }



// document.getElementById('addAnotherSelectRowForTeam1').addEventListener('click', cloneSelect1)
// document.getElementById('addAnotherSelectRowForTeam2').addEventListener('click', cloneSelect2)




// //get tech options for selected option
// let selectElement1 = document.querySelector("#selectNumberOne")
// let selectElement2 = document.querySelector("#selectNumberTwo")

// async function getTechOptionsForSelect1(){
//     const selectText1 = selectElement1.options[selectElement1.selectedIndex].text;
//     try{
//         const response = await fetch('/getSelectTechs1', {
//             method: 'GET',
//             headers: {'Content-type': 'application/json'},
//             body: JSON.stringify({
//                 'selectText1': selectText1
//             })
//         })
//         const data = await response.json()
//         console.log(`This is the ${data}`)
//         //location.reload()
//     }catch(err){
//         console.log(err)
//     }
// }
//grab unit techs when unit is switched

async function getUnits1(selection){
    try{
        console.log('getUnits1 ran')
        const requestFromMainJS = await fetch("/getUnits",{
            method: 'POST',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify({
                //'selectedCiv' : selection.selectedOptions[0].getAttribute('value')
                'selectedCiv' : document.querySelector('#selectCivNumberOne').selectedOptions[0].getAttribute('value')
            })
        })
        const itemObject = await requestFromMainJS.json()
        selectUnitNumberOne.innerHTML= ''
        for(i=0; i<itemObject.length; i++){
            selectUnitNumberOne.innerHTML += `<option title="Select a civ" id="" value="">${itemObject[i]}</option>`
        }

    }
    catch(err){
        console.log(err)
    }
}
async function getUnits2(selection){
    try{
        console.log('getUnits2 ran')
        const requestFromMainJS = await fetch("/getUnits",{
            method: 'POST',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify({
                //'selectedCiv' : selection.selectedOptions[0].getAttribute('value')
                'selectedCiv' : document.querySelector('#selectCivNumberTwo').selectedOptions[0].getAttribute('value')
            })
        })
        const itemObject = await requestFromMainJS.json()
        selectUnitNumberTwo.innerHTML= ''
        for(i=0; i<itemObject.length; i++){
            selectUnitNumberTwo.innerHTML += `<option title="Select a civ" id="" value="">${itemObject[i]}</option>`
        }
        getAges2()

    }
    catch(err){
        console.log(err)
    }
}

// async function getCivs(selection){
//     try{
//         const requestFromMainJS = await fetch("/getSelectCiv1",{
//             method: 'POST',
//             headers: {'Content-type' : 'application/json'},
//             body: JSON.stringify({
//                 'selectText': selection.selectedOptions[0].text
//             })
//         })
//         const itemObject = await requestFromMainJS.json()
        
//         civsNumberOne.innerHTML = `<option title="Optionally choose a tech" id='techArray1' value='1'> Choose a Civ </option>`
//         for(i=0; i< itemObject.civs.length;i++){
//             civsNumberOne.innerHTML+= `<option title="" id='' value=>`+ itemObject.civs[i].toUpperCase() +"</option>"}
//     }catch(err){
//         console.log(err)
//     }
// }
async function getAges1(selection){
    try{ console.log('getAges ran')
        const requestFromMainJS = await fetch("/getSelectAge",{
            method: 'POST',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify({
                'selectText': document.querySelector('#selectUnitNumberOne').selectedOptions[0].text,
                'selectCiv': document.querySelector('#selectCivNumberOne').selectedOptions[0].getAttribute('value')
            })
        })
        const itemObject = await requestFromMainJS.json()
        
        
        selectAgeNumberOne.innerHTML = ''
        for(i=0; i< itemObject.length;i++){
            selectAgeNumberOne.innerHTML+= `<option title="" id='' value=>`+ itemObject[i].age +"</option>"}
    }catch(err){
        console.log(err)
    }
}

async function getAges2(selection){
    try{ console.log('getAges ran')
        const requestFromMainJS = await fetch("/getSelectAge",{
            method: 'POST',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify({
                'selectText': document.querySelector('#selectUnitNumberTwo').selectedOptions[0].text,
                'selectCiv': document.querySelector('#selectCivNumberTwo').selectedOptions[0].getAttribute('value')
            })
        })
        const itemObject = await requestFromMainJS.json()
        
        
        selectAgeNumberTwo.innerHTML = ''
        for(i=0; i< itemObject.length;i++){
            selectAgeNumberTwo.innerHTML+= `<option title="" id='' value=>`+ itemObject[i].age +"</option>"}
    }catch(err){
        console.log(err)
    }
}

async function getTechs1(selection){
    try{
        console.log('getTechs1 ran')
        //console.log('doc',document)
        const requestFromMainJS = await fetch('/getSelectTechs', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'selectCiv': document.querySelector('#selectCivNumberOne').selectedOptions[0].getAttribute('value'),
                'selectText': document.querySelector('#selectUnitNumberOne').selectedOptions[0].text,
                'selectAge': document.querySelector('#selectAgeNumberOne').selectedOptions[0].text
            })
        })
       
        //const data = await response.json()
        const techArray = await requestFromMainJS.json()
        techSelectOne.innerHTML=''
        
        console.log(techArray)
        
        
        for(i=0; i < techArray.length; i++){
                techSelectOne.innerHTML += `<option title="${techArray[i].description}" id='techArray1' value=${techArray[i]._id}>`+ techArray[i].name +"</option>"
            }
        }
       // location.reload()
    catch(err){
        console.log(err)
    }
    
}
async function getTechs2(selection){
    try{
        console.log('getTechs2 ran')
        //console.log('doc',document)
        const requestFromMainJS = await fetch('/getSelectTechs', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'selectCiv': document.querySelector('#selectCivNumberTwo').selectedOptions[0].getAttribute('value'),
                'selectText': document.querySelector('#selectUnitNumberTwo').selectedOptions[0].text,
                'selectAge': document.querySelector('#selectAgeNumberTwo').selectedOptions[0].text
            })
        })
       
        //const data = await response.json()
        const techArray = await requestFromMainJS.json()
        techSelectTwo.innerHTML=''
        
        console.log(techArray)
        
        
        for(i=0; i < techArray.length; i++){
            techSelectTwo.innerHTML += `<option title="${techArray[i].description}" id='techArray1' value=${techArray[i]._id}>`+ techArray[i].name +"</option>"
        }
        
       // location.reload()
    }catch(err){
        console.log(err)
    }
    
}




//grab unit techs when unit is switched
// async function detectChange2(selection){
//     try{
        
//         const requestFromMainJS = await fetch('/getSelectTechs1', {
//             method: 'POST',
//             headers: {'Content-type': 'application/json'},
//             body: JSON.stringify({
//                 'selectText': selection.value
//             })
//         })
//        console.log('selection', selection)
//        console.log('selection id', selection.id)
//         //const data = await response.json()
//         const techArray = await requestFromMainJS.json()
//         console.log(`this is the selection.value ${selection.value}`)
//         console.log(techArray)
//         techSelect2.innerHTML = `<option title="Optionally choose a tech" id='techArray1' value='1'> Choose a unit tech </option>`
//         for(i=0; i < techArray.length; i++){
//             techSelect2.innerHTML += `<option title="${techArray[i].description}" id='techArray1' value=${techArray[i]._id} value>`+ techArray[i].name +"</option>"
//         }
//         //console.log(data)
//         //location.reload()
//     }catch(err){
//         console.log(err)
//     }
    
// }

async function bigBoy1(){
    try{
        await getUnits1()
        await getAges1()
        await getTechs1()
    }catch(err){
        console.log(err)
    }

}

async function bigBoy2(){
    try{
        await getUnits2()
        await getAges2()
        await getTechs2()
    }catch(err){
        console.log(err)
    }

}

bigBoy1()
bigBoy2()

async function agesThenTechs1(){
    try{
        await getAges1()
        await getTechs1()
    }
    catch(err){
        console.log(err)
    }
}
async function agesThenTechs2(){
    try{
        await getAges2()
        await getTechs2()
    }
    catch(err){
        console.log(err)
    }
}

const form = document.getElementById('form')

form.addEventListener('submit', (event) => {
    event.preventDefault()
    
    // const civ1 = document.getElementById('selectCivNumberOne').selectedOptions[0].getAttribute('value')
    // const unit1 = document.getElementById('selectUnitNumberOne').selectedOptions[0].text
    // const age1 = document.getElementById('selectAgeNumberOne').selectedOptions[0].text
    // const civ2 = document.getElementById('selectCivNumberTwo').selectedOptions[0].getAttribute('value')
    // const unit2 = document.getElementById('selectUnitNumberTwo').selectedOptions[0].text
    // const age2 = document.getElementById('selectAgeNumberTwo').selectedOptions[0].text

    // console.log('civ1', civ1)
    // console.log('unit1', unit1)
    // console.log('age1', age1)
    // console.log('civ2', civ2)
    // console.log('unit2', unit2)
    // console.log('age2', age2)
})

async function submit(){
    const selectElement1 = document.getElementById('techSelectOne')
    const selectedValues1 = Array.from(selectElement1.selectedOptions).map(option => option.value)
    
    const selectElement2 = document.getElementById('techSelectTwo')
    const selectedValues2 = Array.from(selectElement2.selectedOptions).map(option => option.value)
    
    const requestFromMainJS = await fetch('/calculate', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
            'civ1' : document.getElementById('selectCivNumberOne').selectedOptions[0].getAttribute('value'),
            'unit1' : document.getElementById('selectUnitNumberOne').selectedOptions[0].text,
            'age1' : document.getElementById('selectAgeNumberOne').selectedOptions[0].text,
            'techs1' : selectedValues1,
            'numberOfUnits1' : document.getElementById('numberOne').value,
            'civ2' : document.getElementById('selectCivNumberTwo').selectedOptions[0].getAttribute('value'),
            'unit2' : document.getElementById('selectUnitNumberTwo').selectedOptions[0].text,
            'age2' : document.getElementById('selectAgeNumberTwo').selectedOptions[0].text,
            'techs2' : selectedValues2,
            'numberOfUnits2' : document.getElementById('numberTwo').value
        })
    })
    const result = await requestFromMainJS.json()

    console.log("submit result", result)
}     

document.querySelector('#submit').addEventListener('click', submit)