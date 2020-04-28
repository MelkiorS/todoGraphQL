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
    }
}