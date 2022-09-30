const express = require('express')
const app = express()
const cors = require('cors')
const { response } = require('express')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()
const PORT = 8000
const main = require("./public/main.js")

let db,
    dbConnectionString = process.env.DB_STRING,
    dbName = 'AOE4',
    collection

MongoClient.connect(dbConnectionString, {useUnifiedTopology: true})
    .then(client => {
        console.log(`Connected to Database`)
        db = client.db(dbName)
        //collection = db.collection('AOE42ndCollection')
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))// in place of body-parser
app.use(express.json())// in place of body-parser
app.use(cors())

// app.get('/', async (request, response) => {
//     try {
//         response.render('index.ejs')
//     } catch (error) {
//         response.status(500).send({message: error.message})
//     }
// })
//put all the unit names into a select tage/drop-down list in ejs
app.get('/', async (request, response)=>{
    try{
        
        const listOfUnits = await db.collection('AOE42ndCollection').find().toArray()
        //console.log(listOfUnits[0].data.baseId)
        
        
        response.render('index.ejs', {info: listOfUnits });
        
    }
    catch(err){
        console.log(err);
    }
})
// app.get('/', (request, response)=>{
//     db.collection('AOE41stCollection').find().toArray()
//     .then(data => {
//         console.log(data[0]['data'].length)
        
//         //console.log(data[0])
//         response.render('index.ejs', {info: data})
//     })
//     .catch(error => console.error(error))
// })
//
app.get('/seeUnit', (request, response)=>{
    // request.body(tynon: unitName)
    db.collection('AOE42ndCollection').findOne({$eleMatch: request.body.unitName})        
    .then(data2 => {
        console.log(request.body)
        //console.log(data2)
        
        //response.render('index.ejs', {info2: data2})
        //response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.get('/getSelectedUnitObject', async (request, response)=>{
    // request.body(tynon: unitName)
    try{
        //console.log(request.query)
        //console.log(request.query.selectNumberOne)
        
        //console.log(request.query.selectNumberTwo)
        //const selectedUnitInfoFromDB1 = await db.collection('AOE42ndCollection').findOne({_id: request.query.selectNumberOne})
        const selectedUnitInfoFromDB1 = await db.collection('AOE42ndCollection').findOne({_id: `ObjectId('${request.query.selectNumberOne}')`})
        //const selectedUnitInfoFromDB2 = await db.collection('AOE41stCollection').find({}, {id: request.query.selectNumberOne})
        
        console.log(JSON.stringify(selectedUnitInfoFromDB1))
        //const selectedUnitInfoFromDB = await db.collection('AOE41stCollection').findOne({'id': request.body.selectedUnit})
        //const selectedUnit2 = await db.collection('AOE41stCollection').findOne({'id': request.body.selectedUnit2})
        //console.log(request.body.selectedUnit)
        //console.log(`this is the selectedUnitInfoFromDB ${JSON.stringify(selectedUnitInfoFromDB)}`)
        //console.log(`this is the request.body ${request.query}`)
        //console.log(response)
        //response.render('index2.ejs', {info3: selectedUnit })
        //response.render('index2.ejs', ({requestTest: selectedUnitInfoFromDB1}))
    }     
    catch(err){
        console.log(err)
    }   
    })
    


// let value = Document.querySelector('select').value
// app.get('/two', (request, response)=> {
//     db.collection('AOE41stCollection').find({"id" : value })
//     .then(data => {
//         response.render('index.ejs', {info: data})
//     })
// })

//PORT = 8000
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port`)
})

// app.get('/getSelectedUnitObject', (req,res)=>{
//     db.collection('AOE41stCollection').find
// })

// import * as SDK from "C:/Users/tdjoh/OneDrive/Desktop/aoe4unitdata.json";

