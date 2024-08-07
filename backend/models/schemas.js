const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
})

const TodoSchema = new mongoose.Schema({
    title: String, 
    description: String,
})

const UserTodosSchema = new mongoose.Schema({
    user_id: mongoose.Schema.Types.ObjectId,
    todos_list: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: TodoSchema,
    }]
})

const User = mongoose.model('User', UserSchema)
const Todo = mongoose.model('Todo', TodoSchema)
const UserTodos = mongoose.model('UserTodos', UserTodosSchema)

module.exports = {
    User,
    Todo,
    UserTodos,
}