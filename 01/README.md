# Getting started sample with 2 APIs - welcome and greet

## Install dependencies
npm install

## Start GraphQL Server
npm start

## Start testing  
Open http://localhost:4000/graphql in browser

## Sample requests

### Execute only welcome API
{
  welcome
}

### Execute only greet API
{
  greet (name:"Robert")
}

### Execute both welcome & greet in one go
{
  welcome
  greet (name:"Robert")
}

