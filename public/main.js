async function getUnits1(selection){
    try{
        const requestFromMainJS = await fetch("/getUnits",{
            method: 'POST',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify({
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
        const requestFromMainJS = await fetch("/getUnits",{
            method: 'POST',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify({
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

async function getAges1(selection){
    try{ 
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
    try{ 
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
        const requestFromMainJS = await fetch('/getSelectTechs', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'selectCiv': document.querySelector('#selectCivNumberOne').selectedOptions[0].getAttribute('value'),
                'selectText': document.querySelector('#selectUnitNumberOne').selectedOptions[0].text,
                'selectAge': document.querySelector('#selectAgeNumberOne').selectedOptions[0].text
            })
        })
        
        const techArray = await requestFromMainJS.json()
        techSelectOne.innerHTML=''
        
        console.log(techArray)
        
        
        for(i=0; i < techArray.length; i++){
                techSelectOne.innerHTML += `<option title="${techArray[i].description}" id='techArray1' value=${techArray[i]._id}>`+ techArray[i].name +"</option>"
            }
        }
       
    catch(err){
        console.log(err)
    }
    
}
async function getTechs2(selection){
    try{
        console.log('getTechs2 ran')
        const requestFromMainJS = await fetch('/getSelectTechs', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'selectCiv': document.querySelector('#selectCivNumberTwo').selectedOptions[0].getAttribute('value'),
                'selectText': document.querySelector('#selectUnitNumberTwo').selectedOptions[0].text,
                'selectAge': document.querySelector('#selectAgeNumberTwo').selectedOptions[0].text
            })
        })
       
        const techArray = await requestFromMainJS.json()
        techSelectTwo.innerHTML=''
        
        console.log(techArray)
        
        
        for(i=0; i < techArray.length; i++){
            techSelectTwo.innerHTML += `<option title="${techArray[i].description}" id='techArray1' value=${techArray[i]._id}>`+ techArray[i].name +"</option>"
        }
        
    }catch(err){
        console.log(err)
    }
    
}


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
    let finalResult = document.querySelector('#finalResult')
    if(!result.tieStatement){
    finalResult.innerHTML = 
    `<section id='resultSection'>
        <h1 id='result'>Result</h1>
        <h1 class="resultUnitHeader">Winner: </h1>
        <h2> ${result.winningTeam.team} Age ${result.winningUnit.age} ${result.winningUnit.fullNameOfCiv} ${result.winningUnit.name}</h2>
        <button id="icon1" onlick="unhideWinningUnitSection"></button>
        <section >
            <section id="sectionToHide1" class="hiddenElement">
            <table>
            <tr>
                <td></td>
                <td>Winning Unit: ${result.winningTeam.team}</td>
                <td>Losing Unit: ${result.losingTeam.team}</td>
            </tr>
            <tr>
                <td>Age/Civ/Unit Name</td>
                <td>Age ${result.winningUnit.age} ${result.winningUnit.fullNameOfCiv} ${result.winningUnit.name}</td>
                <td>Age ${result.losingUnit.age} ${result.losingUnit.fullNameOfCiv} ${result.losingUnit.name}</td>
            </tr>
            <tr>
                <td>Hitpoints/Total Team Hitpoints</td>
                <td>${result.winningUnit.hitpoints}/${result.winningTeam.hitpoints}</td>
                <td>${result.losingUnit.hitpoints}/${result.losingTeam.hitpoints}</td>
            </tr>
            <tr>
                <td>Number of Units</td>
                <td>${result.winningTeam.numberOfUnits}</td>
                <td>${result.losingTeam.numberOfUnits}</td>
            </tr>
            <tr>
                <td>Attack Damage/Type/Speed/Modifiers</td>
                <td>${result.winningUnit.weapons[0].damage}/${result.winningUnit.weapons[0].type}/${result.winningUnit.weapons[0].speed}/${result.winningTeam.weaponModifier}</td>
                <td>${result.losingUnit.weapons[0].damage}/${result.losingUnit.weapons[0].type}/${result.losingUnit.weapons[0].speed}/${result.losingTeam.weaponModifier}</td>
            </tr>
            <tr>
                <td>Armor/Type</td>
                <td>${result.winningTeam.relevantArmor}/${result.winningUnit.relevantArmorType}</td>
                <td>${result.losingTeam.relevantArmor}/${result.losingUnit.relevantArmorType}</td>
            </tr>
            <tr>
                <td title = "((unit's attack damage + any weapon modifiers - opponent's relevant armor) * number of units) / divided by a unit's attack speed">True Damage</td>
                <td>${result.winningTeam.trueDamage}</td>
                <td>${result.losingTeam.trueDamage}</td>
            </tr>
            <tr>
                <td title = "Opponent's total team hitpoints / true damage">Time To Kill The Other Team</td>
                <td>${result.winningTeam.timeToKillOtherTeam} seconds</td>
                <td>${result.losingTeam.timeToKillOtherTeam} seconds</td>
            </tr>
            
        </table>
            </section>
        </section>
        
        
    </section>`
    
    }else if(result.tieStatement){
        finalResult.innerHTML = `<section id="resultSection">
        <h1 id='result'>Result</h1>
            <h1>${result.tieStatement}</h1></section>`
    }
}    

 function focusResult(){
    location.assign('#finalResult')

}

document.querySelector('#section')
document.querySelector('#submit').addEventListener('click', () => {focusResult(), submit()})



function unhideWinningUnitSection(event){
    if(event.target.id == 'icon1'){
        document.querySelector('#sectionToHide1').classList.toggle("hiddenElement")
    }
}

function unhideLosingUnitSection(event){
    if(event.target.id == 'icon2'){
        document.querySelector('#sectionToHide2').classList.toggle("hiddenElement")
    }
}

document.querySelector('#finalResult').addEventListener('click',unhideWinningUnitSection)
document.querySelector('#finalResult').addEventListener('click',unhideLosingUnitSection)


console.log(window.location.hostname)
console.log(document.location.hostname)