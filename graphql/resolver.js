const Todo = require('../modelsDB/todo')

const users = [
    {name: 'David', age: 33, email: 'david@mail.com'},
    {name: 'Rami', age: 31, email: 'rami@mail.com'}
]

module.exports = {
    test() {
        return {
            message: 'Cool MESSAGE',
            users
        }
    },
    randomNumber({min, max, count}) {
        const arr = []
        for (let i = 0; i < count; i++) {
            const random = Math.random() * (max - min) + min
            arr.push(random)
        }
        return arr
    },
    addTestUser({user: {name, email}}) {
        const user = {
            name, email,
            age: Math.ceil(Math.random() + 30)
        };
        users.push(user)
        return user
    },
    async getTodos() {
        try {
            return await Todo.find()
        } catch (e) {
            throw new Error('Fetch todos is not available')
        }
    },

    async addTodo({todo: {title}}) {
        const todo = new Todo({
            title,
            done : false,
        })

        try {
            return  await  todo.save()
        } catch (e) {
            throw new Error('Add todos is not available')
        }
    },

    async completeTodo({id}){
        try {
            return await Todo.findByIdAndUpdate(
                id,{done: true}, {new:true})
        } catch (e) {
            throw new Error('Add todos is not available')
        }
    }
}