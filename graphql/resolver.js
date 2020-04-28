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
    }
}