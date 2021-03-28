var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

// Mock data for personalized greeting messages
const database = require('./database.json');
const students = database.Students;
const courses = database.Courses;
const trainings = database.Trainings;

// Resolve & store nested value objects
trainings.forEach((value, index) => {
  value.course = courses.find(({id}) => id === value.course);
  value.student_rep = students.find(({id}) => id === value.rep);
  value.participants = [];
  value.students.forEach((student, index) => {
    value.participants.push(students.find(({id}) => id === student));
  });
});

 
// Construct a schema for Student, Course, Training types & their queries
var schema = buildSchema(`
  type Student {
    id: String!
    name: String!
    gender: String
  }
  type Course {
    id: String!
    name: String!
    duration: Int
    rating: Float
  }
  type Training {
    id: String!
    date: String
    course: Course!
    student_rep: Student
    participants: [Student]! 
  }

  type Query {
    students: [Student]
    courses: [Course]
    trainings: [Training]
    student(id: String): Student
    course(id: String): Course
    training(id: String): Training
  }
`);
 
// Implement resolvers for all queries 
var root = {
  // Return all students
  students: () => {
    return students;
  },

  // Return all courses
  courses: () => {
    return courses;
  },
  
  // Return all trainings
  trainings: () => {
    return trainings;
  },

  // Return student with matching id
  student: (args) => {
    return students.find(({id}) => id === args.id);
  },

  // Return course with 
  course: (args) => {
    return courses.find(({id}) => id === args.id);
  },
  // Return all trainings
  training: (args) => {
    return trainings.find(({id}) => id === args.id);
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
