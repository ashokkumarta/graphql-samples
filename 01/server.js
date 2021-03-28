var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

// Mock data for personalized greeting messages
const database = require('./database.json');
const greetings = database.greetings;

 
// Construct a schema for welcome and greet queries
var schema = buildSchema(`
  type Query {
    welcome: String
    greet(name: String): String
  }
`);
 
// Implement resolvers for welcome & greet 
var root = {
  // Returns the static welcome message to all users
  welcome: () => {
    return 'Welcome to GraphQL world!!!';
  },
  // Personalizes the greeting message for the user
  greet: (args) => {
    msg = greetings['guest'];
    if (args.name in greetings) {
      msg = greetings[args.name];
    }
    return msg + args.name ;
  },
};
 
// Putting it all together... schema, resolver and client
var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
