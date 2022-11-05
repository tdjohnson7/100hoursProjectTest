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
    collection

MongoClient.connect(dbConnectionString, {useUnifiedTopology: true})
    .then((client) => {
        console.log(`Connected to Database`)
        db = client.db(dbName)
        collection = db.collection('AOE42ndCollection')
    })
    .catch(err=> console.log("ERROR connecting to DB: ", err))

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))// in place of body-parser
app.use(express.json())// in place of body-parser
app.use(cors())

//renders the main page with the inputs
let numberOfSelectRows = 1
app.get('/', async (request, response)=>{
    try{
        let numberOfSelectRows = 1
        const listOfUnits = await db.collection('AOE42ndCollection').find().sort({name: 1, age:1}).toArray()
        
        
        
        response.render('index.ejs', {info: listOfUnits});
        
    }
    catch(err){
        console.log(err);
    }
})

//grab the values within the dropdown list and returns their stats to calculate which team wins and then renders the results page
app.post('/getSelectedUnitObject', async (request, response)=>{
   let teamOne = []
   let teamTwo = []
   let teamOne_IdsOnly = []
   let teamTwo_IdsOnly = []
   let arrayOfTeamOneObjects = []
   let arrayOfTeamTwoObjects = []
   let arrayOfTeamOneUnitNumbers = []
   let arrayOfTeamTwoUnitNumbers = []
   let hitpointsArrayTeam1 = []
   let hitpointsArrayTeam2 = []
   let damageArrayTeam1 = []
   let damageArrayTeam2 = []
   let attackSpeedArrayTeam1 = []
   let attackSpeedArrayTeam2 = []
   let team1NamesOnlyArray=[]
   let team2NamesOnlyArray=[]
    try{
        
        //console.log('requestDOTbody', request.body.selectNumberOne[0])
        let requestBody = request.body
        console.log('request body', requestBody)
        // //returns in this format 'selectNumberOne---6336077d44d829de28c1fc19'
        // const requestBody = Object.entries(request.body).map(([key,val])=>(key + '---' + val))
        // //seperate the array of ids and _ids into team specific arrays
        // for(i=0;i<requestBody.length;i++){
        //     if(requestBody[i].startsWith('selectNumberOne')){
        //         teamOne.push(requestBody[i])
        //     }
        // }
        // for(i=0;i<requestBody.length;i++){
        //     if(requestBody[i].startsWith('selectNumberTwo')){
        //         teamTwo.push(requestBody[i])
                
                               
        //     }
        // }
        
        
        
        
        // //remove the id from the _id
        // for(i=0;i<teamOne.length;i++){
        //     teamOne_IdsOnly[i] = teamOne[i].slice(teamOne[i].lastIndexOf('-')+1)
        // }
        
        // for(i=0;i<teamTwo.length;i++){
        //     teamTwo_IdsOnly[i] = teamTwo[i].slice(teamTwo[i].lastIndexOf('-')+1)
        // }
       
       console.log(`this is the request body selectNumberOne length ${requestBody.selectNumberOne.length}`)
        //send the _ids to mongo teamOne
        //teamOne
        if(typeof request.body.selectNumberOne == 'object'){
            for(i=0;i<request.body.selectNumberOne.length;i++){
                let tempVariable = await collection.findOne({_id: ObjectId(requestBody.selectNumberOne[i])})
                arrayOfTeamOneObjects.push(tempVariable)
                
            }
        }
        else if(typeof request.body.selectNumberOne == 'string'){
            let tempVariable = await collection.findOne({_id: ObjectId(requestBody.selectNumberOne)})
                arrayOfTeamOneObjects.push(tempVariable)
        }
        else{
            console.log('no unit was selected for team one')
        }
        //send the _ids to mongo 
        //teamTwo
        if(typeof request.body.selectNumberTwo == 'object'){
            for(i=0;i<request.body.selectNumberTwo.length;i++){
                let tempVariable = await collection.findOne({_id: ObjectId(requestBody.selectNumberTwo[i])})
                arrayOfTeamTwoObjects.push(tempVariable)
                
            }
        }
        else if(typeof request.body.selectNumberTwo == 'string'){
            let tempVariable = await collection.findOne({_id: ObjectId(requestBody.selectNumberTwo)})
                arrayOfTeamTwoObjects.push(tempVariable)
        }
        else{
            console.log('no unit was selected for team two')
        }
        //add numberOfUnits to team unit objects
        //team one
        if(typeof request.body.numberOne == 'object'){
            for(i=0;i<request.body.numberOne.length;i++){
                //arrayOfTeamOneUnitNumbers.push(request.body.numberOne[i])
                arrayOfTeamOneObjects[i].numberOfUnits = request.body.numberOne[i]
            }
        }
        
        else if(typeof request.body.selectNumberTwo == 'string'){
            arrayOfTeamOneUnitNumbers.push(request.body.numberOne)
            arrayOfTeamOneObjects[0].numberOfUnits = request.body.numberOne   
        }
        else{
            console.log('no unit number was selected for team one')
        }
        //add numberOfUnits to team unit objects
        //team two
        if(typeof request.body.numberTwo == 'object'){
            for(i=0;i<request.body.numberTwo.length;i++){
                //arrayOfTeamOneUnitNumbers.push(request.body.numberOne[i])
                arrayOfTeamTwoObjects[i].numberOfUnits = request.body.numberTwo[i]
            }
        }
        
        else if(typeof request.body.selectNumberTwo == 'string'){
            arrayOfTeamTwoUnitNumbers.push(request.body.numberTwo)
            arrayOfTeamTwoObjects[0].numberOfUnits = request.body.numberTwo   
        }
        else{
            console.log('no unit number was selected for team two')
        }
        
        //hitpoints
        for(i=0;i<arrayOfTeamOneObjects.length;i++){
            hitpointsArrayTeam1.push(arrayOfTeamOneObjects[i].hitpoints * arrayOfTeamOneObjects[i].numberOfUnits)
        }
        console.log(hitpointsArrayTeam1)
        for(i=0;i<arrayOfTeamTwoObjects.length;i++){
            hitpointsArrayTeam2.push(arrayOfTeamTwoObjects[i].hitpoints * arrayOfTeamTwoObjects[i].numberOfUnits)
        }
        //damage
        for(i=0;i<arrayOfTeamOneObjects.length;i++){
            if(!arrayOfTeamOneObjects[i].weapons[0].damage){
                arrayOfTeamOneObjects[i].weapons[0].damage = 0
            }
            damageArrayTeam1.push(arrayOfTeamOneObjects[i].weapons[0].damage * arrayOfTeamOneObjects[i].numberOfUnits)
        }
      
        for(i=0;i<arrayOfTeamTwoObjects.length;i++){
            if(!arrayOfTeamTwoObjects[i].weapons[0].damage){
                arrayOfTeamTwoObjects[i].weapons[0].damage = 0
            }
            damageArrayTeam2.push(arrayOfTeamTwoObjects[i].weapons[0].damage * arrayOfTeamTwoObjects[i].numberOfUnits)
        }
        //attack speed
        for(i=0;i<arrayOfTeamOneObjects.length;i++){
            if(!arrayOfTeamOneObjects[i].weapons[0].speed){
                arrayOfTeamOneObjects[i].weapons[0].speed = 0
            }
            attackSpeedArrayTeam1.push(arrayOfTeamOneObjects[i].weapons[0].speed)
        }
        
        for(i=0;i<arrayOfTeamTwoObjects.length;i++){
            if(!arrayOfTeamTwoObjects[i].weapons[0].speed){
                arrayOfTeamTwoObjects[i].weapons[0].speed = 0
            }
            attackSpeedArrayTeam2.push(arrayOfTeamTwoObjects[i].weapons[0].speed)
        }
        //get unit names
        for(i=0;i<arrayOfTeamOneObjects.length;i++){
            team1NamesOnlyArray.push(arrayOfTeamOneObjects[i].id)
        }
        for(i=0;i<arrayOfTeamTwoObjects.length;i++){
            team2NamesOnlyArray.push(arrayOfTeamTwoObjects[i].id)
        }
        
        let team1DamagePerSecond = (damageArrayTeam1.reduce((acc,c) => acc+c,0) / attackSpeedArrayTeam1.reduce((acc,c) => acc+c,0))
        let team2DamagePerSecond = (damageArrayTeam2.reduce((acc,c) => acc+c,0) / attackSpeedArrayTeam2.reduce((acc,c) => acc+c,0))
        let timeToKillTeam1 = (hitpointsArrayTeam1.reduce((acc,c)=> acc+c,0)) / team2DamagePerSecond
        let timeToKillTeam2 = (hitpointsArrayTeam2.reduce((acc,c)=> acc+c,0)) / team1DamagePerSecond
        console.log(`this is the damageArrayTeam1 ${damageArrayTeam1}`)
        console.log(`this is the damageArrayTeam2 ${damageArrayTeam2}`)
        console.log(`this is the damageArrayTeam1 total ${damageArrayTeam1.reduce((acc,c) => acc+c,0)}`)
        console.log(`this is the damageArrayTeam2 total ${damageArrayTeam2.reduce((acc,c) => acc+c,0)}`)
        console.log(`this is the attackSpeedArrayTeam1 ${attackSpeedArrayTeam1}`)
        console.log(`this is the attackSpeedArrayTeam2 ${attackSpeedArrayTeam2}`)
        console.log(`this is the attackSpeedArrayTeam1 total ${attackSpeedArrayTeam1.reduce((acc,c) => acc+c,0)}`)
        console.log(`this is the attackSpeedArrayTeam2 total ${attackSpeedArrayTeam2.reduce((acc,c) => acc+c,0)}`)
        console.log(`this is the team1DamagePerSecond ${team1DamagePerSecond}`)
        console.log(`this is the team2DamagePerSecond ${team2DamagePerSecond}`)
        console.log(`this is the hitpointsArrayTeam1 ${hitpointsArrayTeam1}`)
        console.log(`this is the hitpointsArrayTeam2 ${hitpointsArrayTeam2}`)
        console.log(`this is the hitpointsArrayTeam1 total ${hitpointsArrayTeam1.reduce((acc,c)=> acc+c,0)}`)
        console.log(`this is the hitpointsArrayTeam2 total ${hitpointsArrayTeam1.reduce((acc,c)=> acc+c,0)}`)
        console.log(`this is the team1DamagePerSecond ${team1DamagePerSecond}`)
        console.log(`this is the team2DamagePerSecond ${team2DamagePerSecond}`)
        console.log(`this is the timeToKillTeam1 ${timeToKillTeam1}`)
        console.log(`this is the timeToKillTeam2 ${timeToKillTeam2}`)
        console.log(arrayOfTeamOneObjects)
        console.log(arrayOfTeamTwoObjects)
        // console.log(hitpointsArrayTeam1)
        // console.log(hitpointsArrayTeam2)
        // console.log(damageArrayTeam1)
        // console.log(damageArrayTeam2)
        // console.log(attackSpeedArrayTeam1)
        // console.log(attackSpeedArrayTeam2)
        //determine winning team
        let winner
        let loser
        let arrayOfWinningTeamObjects
        let arrayOfLosingTeamObjects
        console.log(`This is team1 attackspeed array ${attackSpeedArrayTeam1}`)
        console.log(`This is team2 attackspeed array ${attackSpeedArrayTeam2}`)
        
        if(timeToKillTeam1 > timeToKillTeam2){
            winner = 'Team1'
            loser ='Team2'
            arrayOfWinningTeamObjects = arrayOfTeamOneObjects
            arrayOfLosingTeamObjects = arrayOfTeamTwoObjects
        }
        else if(timeToKillTeam1 < timeToKillTeam2){
            winner = 'Team2'
            loser = 'Team1'
            arrayOfWinningTeamObjects = arrayOfTeamTwoObjects
            arrayOfLosingTeamObjects = arrayOfTeamOneObjects
        }
        else{
            winner = 'Somehow you picked a stalemate. Try again!'
            loser = 'Somehow you picked a stalemate. Try again!'
            
            arrayOfWinningTeamObjects = arrayOfTeamTwoObjects
            arrayOfLosingTeamObjects = arrayOfTeamOneObjects
            
        }
        
        //console.log(arrayOfTeamOneObjects[0])
        //console.log("arrayOfTeamOneObjects", arrayOfTeamOneObjects)
        // console.log(arrayOfTeamTwoObjects)
        // //pull info from objects
        // console.log(arrayOfTeamOneObjects)
        // console.log(arrayOfTeamTwoObjects)
        //let unitOne = await collection.findOne({_id: ObjectId(request.body.selectNumberOne)});
        // let unitTwo = await collection.findOne({_id: ObjectId(request.body.selectNumberTwo)});
        //console.log("Unit_One", unitOne)
        // console.log("Unit_Two", unitTwo)
        
        
        // const unitOneDamagePerSecond = unitOne.weapons[0].damage / unitOne.weapons[0].speed
        // const timeToKillUnitTwo = unitTwo.hitpoints / unitOneDamagePerSecond
        
        // const unitTwoDamagePerSecond = unitTwo.weapons[0].damage / unitTwo.weapons[0].speed
        // const timeToKillUnitOne = unitOne.hitpoints / unitTwoDamagePerSecond 
        // let winner
        // let winningUnit
        // if(timeToKillUnitTwo > timeToKillUnitOne){
        //         winner = "Team Two"
        //         winningUnit = unitTwo.id
        // }
        // if(timeToKillUnitOne > timeToKillUnitTwo){
        //         winner = "Team One"
        //         winningUnit = unitOne.id
        // }
        // else{
        //     winner = "There is not winner in war. Both units die at the same time."
        //     winningUnit = ""
        // }
        // // console.log(request)
        // // console.log(requestBody)
        // console.log(teamOne)
        // console.log(teamOneIdsOnly)
        

        response.render('index2.ejs', ({winner: winner, loser: loser, arrayOfWinningTeamObjects: arrayOfWinningTeamObjects, arrayOfLosingTeamObjects: arrayOfLosingTeamObjects}))
    }     
    catch(err){
        console.log(err)
    }   
    })
    




//PORT = 8000
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port`)
})

