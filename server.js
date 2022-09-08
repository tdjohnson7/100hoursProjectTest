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
        collection = db.collection('AOE41stCollection')
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

app.get('/', (request, response)=>{
    db.collection('AOE41stCollection').find().toArray()
    .then(data => {
        console.log(data[0]['data'].length)
        
        //console.log(data[0])
        response.render('index.ejs', {info: data})
    })
    .catch(error => console.error(error))
})

app.get('/seeUnit', (request, response)=>{
    // request.body(tynon: unitName)
    db.collection('AOE41stCollection').findOne({id: request.body.unitName})        
    .then(data2 => {
        
        console.log(data2)
        
        response.render('index.ejs', {info2: data2})
        //response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.get('/getSelectedUnitObject', (request, response)=>{
    // request.body(tynon: unitName)
    db.collection('AOE41stCollection').findOne({id: request.body.selectedUnit})        
    .then(data3 => {
        
        console.log(data3)
        
        response.render('index.ejs', {info3: data3 })
        response.redirect('/')
    })
    .catch(error => console.error(error))
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