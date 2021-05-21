const Sequelize = require('sequelize')

const conn = new Sequelize('todos', 'jake', 'captincarl69', {
    host: 'localhost',
    dialect: 'postgres'
  });

const Todo = conn.define('todo', {
    name: Sequelize.DataTypes.STRING,
    completed: {type: Sequelize.DataTypes.BOOLEAN, defaultValue: false}
})


const seed = async () => {
    conn.sync({force: true})
    await Todo.create({name: "finish demo"})
}

module.exports = {
    conn,
    models: {
        Todo
    }
}