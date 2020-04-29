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

    type Todo {
        id: ID!
        title: String!
        done: Boolean!
    }

    type Query {
        test: TestType!
        randomNumber(min: Int!, max: Int!, count: Int!): [Float!]!
        getTodos: [Todo!]!
    }
    
    input InputUser {
        name: String!
        email: String!
    }
    
    type Mutation {
        addTestUser(user: InputUser!): User!
    }
`)