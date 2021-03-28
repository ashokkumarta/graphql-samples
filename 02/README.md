# Diging deeper demo - Students, Courses & Trainings

## Install dependencies
npm install

## Start GraphQL Server
npm start

## Start testing  
Open http://localhost:4000/graphql in browser

## Sample requests

### Get the name & Gender of all students
{
  students {
    name
    gender
  }
}
### Get all details for course C04
{
  course(id: "C04") {
    id
    name
    duration
    rating      
  }
}

### Get the date of a training, course name and duration, all details of student rep and names of participants
{
  training(id:"2001-010") {
    date
    course {
      name
      duration      
    }
    student_rep {
      id
      name
      gender
    }
    participants {
      name
    }
  }
}
