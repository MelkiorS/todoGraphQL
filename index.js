const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const graphqlHTTP = require('express-graphql')
const schema = require('./graphql/schema')
const resolver = require('./graphql/resolver')
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())

const mongoURL =
    'mongodb://proto:proto1@ds033285.mlab.com:33285/shop-ordering-crm'

mongoose.connect(mongoURL,
    {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(() => console.log('MongoDB connected.'))
    .catch(error => console.log(`MongoDB connection problem ${error}`))

app.use(graphqlHTTP(
    {
        schema: schema,
        rootValue: resolver
    }))

app.use((req, res, next) => {
    res.sendFile('/index.html')
})

async function start() {
    try {
        app.listen(PORT)
    } catch (e) {
        console.log(e)
    }
}

start()