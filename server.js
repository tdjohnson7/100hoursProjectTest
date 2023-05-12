const express = require('express')
const app = express()
const cors = require('cors')
const { response, request } = require('express')
const {MongoClient, ObjectId} = require('mongodb')
require('dotenv').config()

// const main = require("./public/main.js") remvoed to get main.js to work

let db,
    dbConnectionString = process.env.DB_STRING,
    dbName = 'AOE4',
    collection,
    collection2

MongoClient.connect(dbConnectionString, {useUnifiedTopology: true, useNewUrlParser: true})
    .then((client) => {
        console.log(`Connected to Database`)
        db = client.db(dbName)
        collection = db.collection('AOE42ndCollection')
        collection2 = db.collection('AOE4TechCollection')
    })
    .catch(err=> console.log("ERROR connecting to DB: ", err))

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))// in place of body-parser
app.use(express.json())// in place of body-parser
app.use(cors())

//renders the main page with the inputs

app.get('/', async (request, response)=>{
    try{
        //const listOfUnits = await db.collection('AOE42ndCollection').find().sort({name: 1, age:1}).toArray()
        //const listOfUnits2 = await db.collection('AOE42ndCollection').distinct("name")
        //const listOfUnits2 = await db.collection('AOE42ndCollection').find({civs: {$in:['ab']}}).distinct('name').sort({name: 1})
        const listOfUnits2 = await db.collection('AOE42ndCollection').distinct('name',{civs: {$in:['ab']}})
        const result = await listOfUnits2
        
        
        
        //response.render('index.ejs', {info: listOfUnits2});
        response.render('index.ejs', {info: result});
    }
    catch(err){
        console.log(err);
    }
})

app.post('/getUnits', async (request, response)=>{
    
    try{
        //const units = await db.collection('AOE42ndCollection').find({civs:{$in: [request.body.selectText]}})
        const units = await db.collection('AOE42ndCollection').distinct('name',{civs: {$in:[request.body.selectedCiv]}})
        
        response.json(units)
    }
    catch(err){
        console.log(err)
    }
})
// app.post('/getSelectCiv1', async (request, response)=>{
//     console.log('getSelectCiv1', request.body)
//     console.log('test')
//     try{
//         const itemsCivs = await db.collection('AOE42ndCollection').findOne({'name': request.body.selectText},{projection: {civs: 1, _id: 0}})
//         console.log('civs', itemsCivs)
//         response.json(itemsCivs);
//     }
//     catch(err){
//         console.log(err)
//     }
// })
app.post('/getSelectAge', async (request, response)=>{
    //console.log('getSelectAge1', request.body)
    
    try{
        const itemsAges = await db.collection('AOE42ndCollection').find({'name': request.body.selectText, 'civs':{$in: [request.body.selectCiv.toLowerCase()]}},{projection: {age: 1, _id: 0}}).sort({age: 1})
        //   const coll = client.db('AOE4').collection('AOE4TechCollection');

        const result = await itemsAges.toArray();
        
        await itemsAges.close();
        response.json(result);
        // console.log('result',result)
        
        
    }
    catch(err){
        console.log(err)
    }
})

app.post('/getSelectTechs', async (request, response)=>{
    try{
        //console.log('getSelectTech1',request.body)
        // // const listOfUnits = await db.collection('AOE4TechCollection').find().sort({name: 1, age:1}).toArray()
        
        // // response.render('index.ejs', {info: listOfUnits});
        // // works console.log(request.body.selectText1)
         //let test = await collection.findOne({_id: ObjectId(request.body.selectText)})
       
         let test = await collection.findOne({'name': request.body.selectText.replace(' ', '-').toLowerCase(), 'civs': {$in: [request.body.selectCiv.toLowerCase()]}, 'age': Number(request.body.selectAge)})
        
        //console.log('getSelectTech1 result',test)
        //IMPORTANT console.log('request.body.selectText',request.body.selectText.replace(' ', '-').toLowerCase())
        // IMPORTANT console.log('request.body.selectCiv.toLowerCase()',request.body.selectCiv.toLowerCase())
        // IMPORTANT console.log('request.body.selectAge',request.body.selectAge)
        // console.log(...test.civs)
        // //console.log('object', object)
        // var testTechs = await collection2.find({baseId: "Biology"})
        // const result = await testTechs.toArray()
        
        
        // console.log('result', result)
        /*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

// const filter2 = {
//     'civs': {$in: [...test.civs]}
//   };

//   const filter2 = {
//     //$and: [{
//         civs: {
//            // $in: [...test.civs]
//            $in: [...test.civs]
//         },
//         effectedUnitIds: {
//             $in :[test.basedId]
//         },
//         minAge: {
//             //equal to or less than
//             $lte: test.age
//         }

//     //}]
// }
// const filter2 = {civs:{ $in: ['hr','fr', 'ch', 'de', 'ab', 'mo', 'ru']}, effectedUnitIds: 'archer', minAge: {$lte: 4}}
//const filter2 = {civs:{ $in: [...test.civs]}, effectedUnitIds: test.baseId, minAge: {$lte: test.age}}
 const filter2 = {civs:{ $in: [request.body.selectCiv]}, effectedUnitIds: {$in: [request.body.selectText.toLowerCase().replace(' ','-')]}, minAge: {$lte: Number(request.body.selectAge)}}
 
 //const filter3 = {civs:{ $in: [request.body.selectCiv]}, effectedUnitIds: {$in: [test.name.toLowerCase()]}, minAge: {$lte: test.age}}
// console.log('test.civs', ...test.civs)
// console.log(typeof (test.civs))
// console.log(typeof (test.civs[0]))
// console.log(typeof (test.age))
// console.log('test.baseId', test.baseId)
//console.log('request.body.selectCiv',request.body.selectCiv)
//console.log('test.name',test.name)
//console.log('test.age',test.age)

// {$and: [{'civs': {$in: [...test.civs]},'effectedUnitIds': {$in :[test.basedId]},'minAge': {$lte: [test.age]}}]}

// const filter = {
//     $and: [{
//         civs: { //match one civ
//             $in: [...test.civs]
//         }
//     }, 

//                {
//                 $or:[
//                  {"effects.select.class": {//infantry
//                     $all: [
//                         [...test.classes]//
//                     ]
//                 }
//             }, {
//                 "effects.select.id": test.baseId
//             },
//             {
//                 "variations.effects.select.class": {
//                     $in: [
//                         [...test.classes]
//                     ]
//                 }
//             }, {
//                 "variations.effects.select.id": test.baseId
//             }]   
//         }]     
//         }

//console.log(filter)
  //console.log('civs',filter.civs)
//   console.log('filter',filter)
// console.log('test.classes', test.classes)
 //console.log('test.basedId', test.baseId)
  

  const client = await MongoClient.connect(
    'mongodb+srv://tdjohnson91:Mongo1011657@cluster0.qauwu.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
  const coll = client.db('AOE4').collection('AOE42ndTechCollection');
  const cursor = await coll.find(filter2);
  const result = await cursor.toArray();
  //console.log(result.length)
  
  //console.log(resul)
  await client.close();

//   if(result.length == 0){
//     result = 'No techs to display'
//   }
  response.json(result);
  //console.log('result',result)
    }
    // civs: {$elemMatch: {...test.civs}}
    catch(err){
        console.log(err);
    }
})

//grab the values within the dropdown list and returns their stats to calculate which team wins and then renders the results page
app.post('/calculate', async (request, response)=>{
   //console.log('/calculate request.body',request.body)
    try{
        let unitObject1 = await collection.findOne({'name': request.body.unit1, 'civs': {$in: [request.body.civ1]}, 'age': Number(request.body.age1)})
        let unitObject2 = await collection.findOne({'name': request.body.unit2, 'civs': {$in: [request.body.civ2]}, 'age': Number(request.body.age2)})
        
        //console.log("unitObject1", unitObject1)
        //console.log("unitObject2", unitObject2)

        let tech1Array = []
        for(i=0;i<request.body.techs1.length;i++){
        let techObjects1 = await db.collection('AOE42ndTechCollection').findOne({_id : ObjectId(request.body.techs1[i])})
        let techObjectsResult1 = await techObjects1
        
        tech1Array.push(techObjectsResult1)
       }
        
       let tech2Array = []
        for(i=0;i<request.body.techs2.length;i++){
        let techObjects2 = await db.collection('AOE42ndTechCollection').findOne({_id : ObjectId(request.body.techs2[i])})
        let techObjectsResult2 = await techObjects2
        
        tech2Array.push(techObjectsResult2)
       }
       //console.log('tech1Array', tech1Array)
       //console.log('tech2Array', tech2Array)

       

    //    function techEffectStringToOperator(techEffectString){
    //         if(techEffectString == "multiply"){
    //             return techEffectOperator = '*'
    //         }
    //         if(techEffectString == "add"){
    //             return techEffectOperator = '+'
    //         }
    //         if(techEffectString == "subtract"){
    //             return techEffectOperator = '-'
    //         }
    //         if(techEffectString == "divide"){
    //             return techEffectOperator = '/'
    //         }
    //    }

       function maths(operator, number1, number2){
            if(operator == "add"){
                return number1 + number2
            }
            if(operator == "change"){
                return number1 + number2
            }
            if(operator == "multiply"){
                return number1 * number2
            }
            else{
                return "unable to find operator"
            }
       }


       let object1IndexOfRangedArmor = unitObject1.armor.findIndex(x=>x.type === 'ranged')
       let object1IndexOfMeleeArmor = unitObject1.armor.findIndex(x=>x.type === 'melee')
       let object2IndexOfRangedArmor = unitObject2.armor.findIndex(x=>x.type === 'ranged')
       let object2IndexOfMeleeArmor = unitObject2.armor.findIndex(x=>x.type === 'melee')

       console.log('BEFORE')
       console.log('unitObject1.weapons.damage', unitObject1.weapons[0].damage)
       console.log('unitObject1.armor[object1IndexOfRangedArmor].value', unitObject1.armor[object1IndexOfRangedArmor].value)
       console.log('unitObject1.armor[object1IndexOfMeleeArmor].value', unitObject1.armor[object1IndexOfMeleeArmor].value)
       console.log('unitObject1.hitpoints', unitObject1.hitpoints)
       console.log('ARMOR INDEXS')
       console.log('object1IndexOfRangedArmor',object1IndexOfRangedArmor)
       console.log('object1IndexOfMeleeArmor',object1IndexOfMeleeArmor)

       for(eachTechObject of tech1Array){//iterates through each select tech
        for(effectObject of eachTechObject.effects){//iterates through each tech effect
            console.log('CONSOLE.LOG')
            console.log("effectObject.effect", effectObject.effect)
            console.log('unitObject1.weapons[0].damage', unitObject1.weapons[0].damage)
            console.log('effectObject.value', effectObject.value)
            
            if(effectObject.property == "rangedAttack" && unitObject1.weapons.type == "ranged"){//dont need to iterate through unitObject weapons because a unit only has one weapon type
                unitObject1.weapons[0].damage = maths(effectObject.effect, unitObject1.weapons[0].damage, effectObject.value)
            }
            if(effectObject.property == "meleeAttack" && unitObject1.weapons[0].type == "melee"){
                unitObject1.weapons[0].damage = maths(effectObject.effect, unitObject1.weapons[0].damage, effectObject.value)
            }
            if(effectObject.property == "rangedArmor" && unitObject1.armor[object1IndexOfRangedArmor].type === "ranged"){
                unitObject1.armor[object1IndexOfRangedArmor].value = maths(effectObject.effect, unitObject1.armor[object1IndexOfRangedArmor].value, effectObject.value)
            }
            if(effectObject.property == "meleeArmor" && unitObject1.armor[object1IndexOfMeleeArmor].type == "ranged"){
                unitObject1.armor[object1IndexOfMeleeArmor].value = maths(effectObject.effect, unitObject1.armor[object1IndexOfMeleeArmor].value, effectObject.value)
            }
            if(effectObject.property == "hitpoints"){
              unitObject1.hitpoints = maths(effectObject.effect, unitObject1.hitpoints, effectObject.value)
            }
            
        }
        
       }
       console.log('AFTER')
       console.log('unitObject1.weapons.damage', unitObject1.weapons[0].damage)
       console.log('unitObject1.armor[object1IndexOfRangedArmor].value', unitObject1.armor[object1IndexOfRangedArmor].value)
       console.log('unitObject1.armor[object1IndexOfMeleeArmor].value', unitObject1.armor[object1IndexOfMeleeArmor].value)
       console.log('unitObject1.hitpoints', unitObject1.hitpoints)
       console.log('ARMOR INDEXS')
       console.log('object1IndexOfRangedArmor',object1IndexOfRangedArmor)
       console.log('object1IndexOfMeleeArmor',object1IndexOfMeleeArmor)
       //let techEffectOperator
    //    for(i=0;i<tech1Array.length;i++){
    //     if(tech1Array[i].effects.property == "rangedAttack" && unitObject1.weapons.type == "ranged"){
    //         let techEffectOperator = techEffectStringToOperator(tech1Array.effects.effect)
    //         unitObject1.weapons.damage = unitObject1.weapons.damage techEffectOperator tech1Array[i].effects.value
    //     }
    //    }
       
       
        // let techObjects1 = await db.collection('AOE42ndTechCollection').find({id: ObjectId(request.body.techs1)})
        
        //let techObjects2 = await db.collection('AOE42ndTechCollection').find({_id : {$in: ObjectId(request.body.techs2)}})

        //console.log("unitObject1", unitObject1)
        //console.log('unitObject2',unitObject2)
        
        //console.log('techObjects2',techObjects2)
        
    //     let requestBody = request.body
    //     //console.log('request body', requestBody)
       
    //     //send the _ids to mongo teamOne
    //     //teamOne
    //     let teamOne = {}
    //     teamOne.unit = await collection.findOne({_id: ObjectId(requestBody.selectNumberOne)})
                
        
    //     //send the _ids to mongo 
    //     //teamTwo
    //     let teamTwo = {}
    //     teamTwo.unit = await collection.findOne({_id: ObjectId(requestBody.selectNumberTwo)})
                
        
        
    //     //add numberOfUnits to team unit objects
    //     //team one
    //     teamOne.numberOfUnits = request.body.numberOne
        
    //     //add numberOfUnits to team unit objects
    //     //team two
    //     teamTwo.numberOfUnits = request.body.numberTwo
        
    //     //hitpoints
    //     teamOne.teamHitpoints = teamOne.unit.hitpoints * teamOne.numberOfUnits
        
    //     teamTwo.teamHitpoints = teamTwo.unit.hitpoints * teamTwo.numberOfUnits   


        
    //     //check for damge modifiers
       
    //     teamOne.displayClasses = teamOne.unit.displayClasses[0].toLowerCase()
    //     teamTwo.displayClasses = teamTwo.unit.displayClasses[0].toLowerCase()
        
    //     if(!teamOne.unit.weapons[0].modifiers){
    //         console.log('no modifiers team one')
    //         teamOne.weaponModifiers = 0
            
    //     }
    //     else{
    //         teamOne.weaponModifiers = teamOne.unit.weapons[0].modifiers[0].target.class[0].join(' ').toLowerCase()
    //     }
        
    //     if(!teamTwo.unit.weapons[0].modifiers){
    //         console.log('no modifiers team two')
    //         teamTwo.weaponModifiers = 0
            
    //     }
    //     else{
    //         teamTwo.weaponModifiers = teamTwo.unit.weapons[0].modifiers[0].target.class[0].join(' ').toLowerCase()
    //     }
        
    
    //     //does team one get weapon mod?
    //     if(teamTwo.displayClasses.includes(teamOne.weaponModifiers)){
            
    //         teamOne.weaponModifiersValue = teamOne.unit.weapons[0].modifiers[0].value
            
    //     }
    //     else{
    //         teamOne.weaponModifiersValue=0
    //     }
    //     //does team two get weapon mod?
    //     if(teamOne.displayClasses.includes(teamTwo.weaponModifiers)){
           
    //         teamTwo.weaponModifiersValue = teamTwo.unit.weapons[0].modifiers[0].value
            
    //     }
    //     else{
    //         teamTwo.weaponModifiersValue=0
    //     }
        

    //     //find armor
        
    //     //tean one armor
    //     teamOne.armor = 0
    //     teamOne.armorType = 'none'
    //     teamTwo.armor = 0
    //     teamTwo.armorType = 'none'
    //     if(teamOne.unit.armor[0] && teamTwo.unit.weapons[0].type == teamOne.unit.armor[0].type){
    //         teamOne.armor = teamOne.unit.armor[0].value
    //         teamOne.armorType = teamOne.unit.armor[0].type
    //     }
    //     else if(teamOne.unit.armor[1] && teamTwo.unit.weapons[0].type == teamOne.unit.armor[1].type){
    //         teamOne.armor = teamOne.unit.armor[1].value
    //         teamOne.armorType = teamOne.unit.armor[1].type
    //     }
    //     else{
    //         teamOne.armor = 0
    //         teamOne.armorType = 'none'
    //     }
    //     //tean two armor
    //     if(teamTwo.unit.armor[0] && teamOne.unit.weapons[0].type == teamTwo.unit.armor[0].type){
    //         teamTwo.armor = teamTwo.unit.armor[0].value
    //         teamTwo.armorType = teamTwo.unit.armor[0].type
    //     }
    //     else if(teamTwo.unit.armor[1] && teamOne.unit.weapons[0].type == teamTwo.unit.armor[1].type){
    //         teamTwo.armor = teamTwo.unit.armor[1].value
    //         teamTwo.armorType = teamTwo.unit.armor[1].type
    //     }
    //     else{
    //         teamTwo.armor = 0
    //         teamTwo.armorType = 'none'
    //     }

    //     //if no damage, damge = 0
    //     if(!teamOne.unit.weapons[0].damage){
    //         teamOne.unit.weapons[0].damage = 0
    // }
    
    // if(!teamTwo.unit.weapons[0].damage){
    //         teamTwo.unit.weapons[0].damage = 0
    // }

    // //calculate true unit damage
    // teamOne.trueUnitDamage = teamOne.unit.weapons[0].damage + teamOne.weaponModifiersValue - teamTwo.armor
    // teamTwo.trueUnitDamage = teamTwo.unit.weapons[0].damage + teamTwo.weaponModifiersValue - teamOne.armor

    // //calculate team damage

    // teamOne.teamDamage = teamOne.trueUnitDamage * teamOne.numberOfUnits
    // teamTwo.teamDamage = teamTwo.trueUnitDamage * teamTwo.numberOfUnits

    //     //if no attack speed, attack speed = 0
        
    //         if(!teamOne.unit.weapons[0].speed){
    //             teamOne.unit.weapons[0].speed = 0
    //         }
    
    //         if(!teamTwo.unit.weapons[0].speed){
    //             teamTwo.unit.weapons[0].speed = 0
    //         }
          
        
        
    //     teamOne.teamDamagePerSecond = teamOne.teamDamage / teamOne.unit.weapons[0].speed
    //     teamTwo.teamDamagePerSecond = teamTwo.teamDamage / teamTwo.unit.weapons[0].speed
    //     teamOne.teamTimeToKill = teamOne.teamHitpoints / teamTwo.teamDamagePerSecond
    //     teamTwo.teamTimeToKill = teamTwo.teamHitpoints / teamOne.teamDamagePerSecond
       
    //     //determine winning team
    //     let winner
    //     let loser
    //     let winningTeam
    //     let losingTeam
               
    //     if(teamOne.teamTimeToKill > teamTwo.teamTimeToKill){
    //         winner = 'Team 1'
    //         loser ='Team 2'
    //         winningTeam = teamOne
    //         losingTeam = teamTwo
    //     }
    //     else if(teamOne.teamTimeToKill < teamTwo.teamTimeToKill){
    //         winner = 'Team 2'
    //         loser = 'Team 1'
    //         winningTeam = teamTwo
    //         losingTeam = teamOne
    //     }
    //     else{
    //         winner = 'Stalemate. Try again!'
    //         loser = 'Stalemate. Try again!'
            
    //         winningTeam = teamOne
    //         losingTeam = teamTwo
            
    //     }

    //     response.render('index2.ejs', ({
    //         winner: winner,
    //         loser: loser, 
    //         winningTeam: winningTeam, 
    //         losingTeam: losingTeam, 
    //         teamOneWeaponModifiers: teamOne.weaponModifiers,
    //         //teamOneWeaponModifiersNumber: teamOne.unit.weapons[0].modifiers[0].value,
    //         teamTwoWeaponModifiers: teamTwo.weaponModifiers,
    //         //teamTwoWeaponModifiersNumber: teamTwo.unit.weapons[0].modifiers[0].value,
    //     }))
    //     console.log('winning team', winningTeam)
    //     console.log('losing team', losingTeam)
    //     console.log('teamOne.teamDamagePerSecond', teamOne.teamDamagePerSecond)
    //     console.log('teamTwo.teamDamagePerSecond', teamTwo.teamDamagePerSecond)
        
    //     console.log('teamOne.teamTimeToKill', teamOne.teamTimeToKill)
    //     console.log('teamTwo.teamTimeToKill', teamTwo.teamTimeToKill)
    }     
    catch(err){
        console.log(err)
    }   
    })
    




//PORT = 8000
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})

