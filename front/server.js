const express = require('express')
const app = express()
const nunjucks = require('nunjucks')
require('dotenv').config()
const port = process.env.PORT
const router = require('./routes')
const cors = require('cors')

app.set('view engine','html')
nunjucks.configure('views',{
    express:app,
    watch:true
})

app.use(cors())
app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(router)

app.listen(port,_=>{
    console.log(`front server running on localhost:${port}`)
})

// Content-Security-Policy: default-src 'self' trusted.com *.trusted.com