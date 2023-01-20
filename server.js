const express = require('express')
const app = express()
const cors = require('cors')
const { response } = require('express')
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
        const listOfUnits = await db.collection('AOE42ndCollection').find().sort({name: 1, age:1}).toArray()
        
        response.render('index.ejs', {info: listOfUnits});
    }
    catch(err){
        console.log(err);
    }
})

app.post('/getSelectTechs1', async (request, response)=>{
    try{
        console.log(request)
        // // const listOfUnits = await db.collection('AOE4TechCollection').find().sort({name: 1, age:1}).toArray()
        
        // // response.render('index.ejs', {info: listOfUnits});
        // // works console.log(request.body.selectText1)
         let test = await collection.findOne({_id: ObjectId(request.body.selectText1)})
        
        // //console.log('test', test.civs)
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

  const filter = {
    $and: [{
        civs: {
            $in: [...test.civs]
        }
    }, {
        $or: [{
            "effects.select.class": {
                $in: [
                    [...test.classes]
                ]
            }
        }, {
            "effects.select.id": test.baseId
        }]
    }]
}
  
  const client = await MongoClient.connect(
    'mongodb+srv://tdjohnson91:Mongo1011657@cluster0.qauwu.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
  const coll = client.db('AOE4').collection('AOE4TechCollection');
  const cursor = coll.find(filter);
  const result = await cursor.toArray();
  //console.log(result)
  await client.close();
  response.json(result);
  console.log('result',result)
    }
    // civs: {$elemMatch: {...test.civs}}
    catch(err){
        console.log(err);
    }
})

//grab the values within the dropdown list and returns their stats to calculate which team wins and then renders the results page
app.post('/getSelectedUnitObject', async (request, response)=>{
   console.log(request)
    try{
        let requestBody = request.body
        //console.log('request body', requestBody)
       
        //send the _ids to mongo teamOne
        //teamOne
        let teamOne = {}
        teamOne.unit = await collection.findOne({_id: ObjectId(requestBody.selectNumberOne)})
                
        
        //send the _ids to mongo 
        //teamTwo
        let teamTwo = {}
        teamTwo.unit = await collection.findOne({_id: ObjectId(requestBody.selectNumberTwo)})
                
        
        
        //add numberOfUnits to team unit objects
        //team one
        teamOne.numberOfUnits = request.body.numberOne
        
        //add numberOfUnits to team unit objects
        //team two
        teamTwo.numberOfUnits = request.body.numberTwo
        
        //hitpoints
        teamOne.teamHitpoints = teamOne.unit.hitpoints * teamOne.numberOfUnits
        
        teamTwo.teamHitpoints = teamTwo.unit.hitpoints * teamTwo.numberOfUnits   


        
        //check for damge modifiers
       
        teamOne.displayClasses = teamOne.unit.displayClasses[0].toLowerCase()
        teamTwo.displayClasses = teamTwo.unit.displayClasses[0].toLowerCase()
        
        if(!teamOne.unit.weapons[0].modifiers){
            console.log('no modifiers team one')
            teamOne.weaponModifiers = 0
            
        }
        else{
            teamOne.weaponModifiers = teamOne.unit.weapons[0].modifiers[0].target.class[0].join(' ').toLowerCase()
        }
        
        if(!teamTwo.unit.weapons[0].modifiers){
            console.log('no modifiers team two')
            teamTwo.weaponModifiers = 0
            
        }
        else{
            teamTwo.weaponModifiers = teamTwo.unit.weapons[0].modifiers[0].target.class[0].join(' ').toLowerCase()
        }
        
    
        //does team one get weapon mod?
        if(teamTwo.displayClasses.includes(teamOne.weaponModifiers)){
            
            teamOne.weaponModifiersValue = teamOne.unit.weapons[0].modifiers[0].value
            
        }
        else{
            teamOne.weaponModifiersValue=0
        }
        //does team two get weapon mod?
        if(teamOne.displayClasses.includes(teamTwo.weaponModifiers)){
           
            teamTwo.weaponModifiersValue = teamTwo.unit.weapons[0].modifiers[0].value
            
        }
        else{
            teamTwo.weaponModifiersValue=0
        }
        

        //find armor
        
        //tean one armor
        teamOne.armor = 0
        teamOne.armorType = 'none'
        teamTwo.armor = 0
        teamTwo.armorType = 'none'
        if(teamOne.unit.armor[0] && teamTwo.unit.weapons[0].type == teamOne.unit.armor[0].type){
            teamOne.armor = teamOne.unit.armor[0].value
            teamOne.armorType = teamOne.unit.armor[0].type
        }
        else if(teamOne.unit.armor[1] && teamTwo.unit.weapons[0].type == teamOne.unit.armor[1].type){
            teamOne.armor = teamOne.unit.armor[1].value
            teamOne.armorType = teamOne.unit.armor[1].type
        }
        else{
            teamOne.armor = 0
            teamOne.armorType = 'none'
        }
        //tean two armor
        if(teamTwo.unit.armor[0] && teamOne.unit.weapons[0].type == teamTwo.unit.armor[0].type){
            teamTwo.armor = teamTwo.unit.armor[0].value
            teamTwo.armorType = teamTwo.unit.armor[0].type
        }
        else if(teamTwo.unit.armor[1] && teamOne.unit.weapons[0].type == teamTwo.unit.armor[1].type){
            teamTwo.armor = teamTwo.unit.armor[1].value
            teamTwo.armorType = teamTwo.unit.armor[1].type
        }
        else{
            teamTwo.armor = 0
            teamTwo.armorType = 'none'
        }

        //if no damage, damge = 0
        if(!teamOne.unit.weapons[0].damage){
            teamOne.unit.weapons[0].damage = 0
    }
    
    if(!teamTwo.unit.weapons[0].damage){
            teamTwo.unit.weapons[0].damage = 0
    }

    //calculate true unit damage
    teamOne.trueUnitDamage = teamOne.unit.weapons[0].damage + teamOne.weaponModifiersValue - teamTwo.armor
    teamTwo.trueUnitDamage = teamTwo.unit.weapons[0].damage + teamTwo.weaponModifiersValue - teamOne.armor

    //calculate team damage

    teamOne.teamDamage = teamOne.trueUnitDamage * teamOne.numberOfUnits
    teamTwo.teamDamage = teamTwo.trueUnitDamage * teamTwo.numberOfUnits

        //if no attack speed, attack speed = 0
        
            if(!teamOne.unit.weapons[0].speed){
                teamOne.unit.weapons[0].speed = 0
            }
    
            if(!teamTwo.unit.weapons[0].speed){
                teamTwo.unit.weapons[0].speed = 0
            }
          
        
        
        teamOne.teamDamagePerSecond = teamOne.teamDamage / teamOne.unit.weapons[0].speed
        teamTwo.teamDamagePerSecond = teamTwo.teamDamage / teamTwo.unit.weapons[0].speed
        teamOne.teamTimeToKill = teamOne.teamHitpoints / teamTwo.teamDamagePerSecond
        teamTwo.teamTimeToKill = teamTwo.teamHitpoints / teamOne.teamDamagePerSecond
       
        //determine winning team
        let winner
        let loser
        let winningTeam
        let losingTeam
               
        if(teamOne.teamTimeToKill > teamTwo.teamTimeToKill){
            winner = 'Team 1'
            loser ='Team 2'
            winningTeam = teamOne
            losingTeam = teamTwo
        }
        else if(teamOne.teamTimeToKill < teamTwo.teamTimeToKill){
            winner = 'Team 2'
            loser = 'Team 1'
            winningTeam = teamTwo
            losingTeam = teamOne
        }
        else{
            winner = 'Stalemate. Try again!'
            loser = 'Stalemate. Try again!'
            
            winningTeam = teamOne
            losingTeam = teamTwo
            
        }

        response.render('index2.ejs', ({
            winner: winner,
            loser: loser, 
            winningTeam: winningTeam, 
            losingTeam: losingTeam, 
            teamOneWeaponModifiers: teamOne.weaponModifiers,
            //teamOneWeaponModifiersNumber: teamOne.unit.weapons[0].modifiers[0].value,
            teamTwoWeaponModifiers: teamTwo.weaponModifiers,
            //teamTwoWeaponModifiersNumber: teamTwo.unit.weapons[0].modifiers[0].value,
        }))
        console.log('winning team', winningTeam)
        console.log('losing team', losingTeam)
        console.log('teamOne.teamDamagePerSecond', teamOne.teamDamagePerSecond)
        console.log('teamTwo.teamDamagePerSecond', teamTwo.teamDamagePerSecond)
        
        console.log('teamOne.teamTimeToKill', teamOne.teamTimeToKill)
        console.log('teamTwo.teamTimeToKill', teamTwo.teamTimeToKill)
    }     
    catch(err){
        console.log(err)
    }   
    })
    




//PORT = 8000
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})

