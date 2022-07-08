const express = require('express')
const app = express()
const cors = require('cors')
const { response } = require('express')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()
const PORT = 8000

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
app.use(express.urlencoded({extended:true}))
app.use(express.json())
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
        response.render('index.ejs', {info: data })
    })
    .catch(error => console.error(error))
})

//PORT = 8000
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port`)
})