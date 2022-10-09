const express = require('express')
const app = express()
const cors = require('cors')
const { response } = require('express')
const {MongoClient, ObjectId} = require('mongodb')
require('dotenv').config()

const main = require("./public/main.js")

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
        const listOfUnits = await db.collection('AOE42ndCollection').find().sort({id:1}).toArray()
        
        
        
        response.render('index.ejs', {info: listOfUnits});
        
    }
    catch(err){
        console.log(err);
    }
})

//grab the values within the dropdown list and returns their stats to calculate which team wins and then renders the results page
app.post('/getSelectedUnitObject', async (request, response)=>{
   
    try{
        let unitOne = await collection.findOne({_id: ObjectId(request.body.selectNumberOne)});
        let unitTwo = await collection.findOne({_id: ObjectId(request.body.selectNumberTwo)});
        console.log("Unit_One", unitOne)
        console.log("Unit_Two", unitTwo)
        

        const unitOneDamagePerSecond = unitOne.weapons[0].damage / unitOne.weapons[0].speed
        const timeToKillUnitTwo = unitTwo.hitpoints / unitOneDamagePerSecond
        
        const unitTwoDamagePerSecond = unitTwo.weapons[0].damage / unitTwo.weapons[0].speed
        const timeToKillUnitOne = unitOne.hitpoints / unitTwoDamagePerSecond 
        let winner
        let winningUnit
        if(timeToKillUnitTwo > timeToKillUnitOne){
                winner = "Team Two"
                winningUnit = unitTwo.id
        }
        if(timeToKillUnitOne > timeToKillUnitTwo){
                winner = "Team One"
                winningUnit = unitOne.id
        }
        else{
            winner = "There is not winner in war. Both units die at the same time."
            winningUnit = ""
        }
        
        
        response.render('index2.ejs', ({winner: winner, winningUnit: winningUnit}))
    }     
    catch(err){
        console.log(err)
    }   
    })
    
//copy the form with the selects to add more dropdown lists
app.post('/addSelectRow', async(request, response)=>{
    try{
        console.log(request)
        numberOfSelectRows = numberOfSelectRows + 1;
        response.redirect('index3.ejs', ({numberOfSelectRows:numberOfSelectRows}))
}
catch(err){
    console.log(err)
}
    
})



//PORT = 8000
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port`)
})

