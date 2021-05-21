const Sequelize = require('sequelize')

const conn = new Sequelize('postgres://localhost/todos', {logging: false});

const Todo = conn.define('todo', {
    name: Sequelize.DataTypes.STRING,
    completed: {type: Sequelize.DataTypes.BOOLEAN, defaultValue: false}
})

const todos = [
    { name: "finish demo" },
    { name: "eat something" },
    { name: "have coffee", completed: true }
]

const seed = async () => {
    await conn.sync({force: true})
    await Promise.all(todos.map(todo => Todo.create(todo)))
}

module.exports = {
    conn,
    models: {
        Todo
    },
    seed
}
