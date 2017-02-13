# Starter for Firebase, React Native, Redux applications with 100% of code in common between IOS and Android

## Features

- Authentication
- CRUD ( Create, Read, Update, Delete )
- Form validation
- Redux form library configuration
- Redux configuration
- React Native Router Flux configuration
- Linting with Airbnb eslint configuration

## Preview

![Screenshot](preview.gif)

## Getting started - Firebase

### Create firebase app

1) You'll need a JavaScript (web or Node.js) app to create at Firebase.
2) Find firebase.example.json file in src directory, rename it to firebase.json and edit it with your firebase app configuration.

### Add rules to firebase database

In firebase console navigate to, Database -> Rules and add following code snippet.

````
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    }
  }
}
````

## Getting started - Application

### npm install dependencies

````
npm install
````

## IOS

````
react-native run-ios
````

## Android

````
react-native run-android
````

## Testing

````
npm run test
````

## Linting

````
npm run lint
````