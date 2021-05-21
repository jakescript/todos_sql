const express = require('express')
const path = require('path')
const methodOverride = require('method-override')
const {models: {Todo}, seed} = require('./db')
const app = express()

app.use(express.urlencoded({extended: true}))
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
    const todos = await Todo.findAll()
    res.send(`
    <html>
    <head>
        <link rel='stylesheet' href='/public/styles.css'>
    </head>
    <body>
        <div>
            <form method='POST' action='/todos'>
                <input type='text' name='name'/>
                <button> create </button>
            </form>

            <ul>
                ${todos.map(todo =>`
                    <li class=${todo.completed ? 'completed' : ''}>
                        ${todo.name}
                        <form method='POST' action='/todos/${todo.id}?_method=DELETE'>
                            <button>X</button>
                        </form>

                        <form method='POST' action='/todos/${todo.id}?_method=PUT'>
                            <button>${todo.completed ? 'Unfinished' : 'Done'}</button>
                        </form>
                    </li>
                `).join('')}
            </ul>
        </div>
    </body>
    </html>
    `)
})

app.put('/todos/:id', async (req, res) => {
    const todo = await Todo.findByPk(req.params.id)
    todo.completed = !todo.completed
    await todo.save()
    res.redirect('/')
})

app.delete('/todos/:id', async (req, res) => {
    const todo = await Todo.findByPk(req.params.id)
    await todo.destroy()
    res.redirect('/')
})

app.get('/todos', async (req, res) => {
    res.send(await Todo.findAll())
})

app.post('/todos', async (req, res) => {
    await Todo.create(req.body)
    res.redirect('/')
})

const run = async () => {
    await seed()
    console.log("Seeded")
    app.listen(3000, () => console.log('listening'))
}

run()

