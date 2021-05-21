const express = require('express')
const {models: {Todo}} = require('./db')
const app = express()

app.get('/', (req, res) => {
    res.send('hello')
})

app.get('/todo', async (req, res) => {
    res.send(await Todo.findAll())
})

app.listen(3000, () => console.log('listening'))