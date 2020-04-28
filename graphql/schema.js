const {buildSchema} = require('graphql')

module.exports = buildSchema(`
    type User {
        name: String!
        age: String!
        email: String!
    }
    
    type TestType {
        message: String,
        users: [User!]! 
    }

    type Query {
        test: TestType!
    }
`)