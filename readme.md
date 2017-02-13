[![Build Status](https://travis-ci.org/DimitriMikadze/firebase-react-native-redux-starter.svg?branch=master)](https://travis-ci.org/DimitriMikadze/firebase-react-native-redux-starter)
[![dependencies Status](https://david-dm.org/DimitriMikadze/firebase-react-native-redux-starter/status.svg)](https://david-dm.org/DimitriMikadze/firebase-react-native-redux-starter)
[![devDependencies Status](https://david-dm.org/DimitriMikadze/firebase-react-native-redux-starter/dev-status.svg)](https://david-dm.org/DimitriMikadze/firebase-react-native-redux-starter?type=dev)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()

# Starter For Firebase, React Native, Redux Applications With 100% Of Code In Common Between IOS And Android, with built In Authentication, Crud Example And Form Validation.

## Features

- Authentication
- CRUD ( Create, Read, Update, Delete )
- Form validation
- Redux form library configuration
- Redux configuration
- React Native Router Flux configuration
- Linting with Airbnb eslint configuration

## Preview

<img src="previewgif.gif" width="300">

## Getting started

### Clone Repo

````
git clone https://github.com/DimitriMikadze/firebase-react-native-redux-starter
````

### npm install dependencies

````
npm install
````

## Firebase

### Create firebase app

- You'll need a JavaScript (web or Node.js) app to create at Firebase.
- Find firebase.example.json file in src directory, rename it to firebase.json and edit it with your firebase app configuration.

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

## Application

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