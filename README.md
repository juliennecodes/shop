# Seaside Cafe - practice app for client-server communication
Seaside Cafe is an app for a fictional cafe. In the app, the user can view the cafe’s menu and order by adding menu items to the cart. They can also change their order by changing the item quantity or removing it altogether.

## Goals and Objectives
Seaside Cafe was primarily written to practice client-server communication. The frontend client makes GET, POST, and DELETE requests and the backend server responds with JSON.

## View Seaside Cafe App
demo - https://polar-plateau-65701.herokuapp.com/

## Setup
- go to project folder
- type command - npm install

## Running the App Locally
- type command - npm start

## Tests
- type command - npm test

## Deploy App in Heroku
### Preparations
- copy package.json of the react app and paste it on the same level as server.js
  - package.json app specifies the dependencies of the react app
- delete all the other scripts except for start
- change the start script to "start": "node server.js"
  - originally, npm start runs the react app
  - this change makes it so that the node express server is the one that is running on heroku
  - the node express server is the one serving the index.html of the react app
- write app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});
  - this makes it so that the server serves index.html for any get requests to any other endpoints that are not /menu or /cart
- write app.listen(process.env.PORT || 8000); in server.js
  - express server will listen for requests to the port in the environment variable

### Build Minified React App
- go to project folder
- type command - npm run build
- copy the build folder
- paste the build folder in the same level as server.js
  - the build folder is the minified react app, which will be what the server is serving for index.html 

### Deploy
- type command - heroku create
  - creates an empty heroku app - https://polar-plateau-65701.herokuapp.com/
  - creates an empty git repository - https://git.heroku.com/polar-plateau-65701.git
- type command - git subtree push --prefix src/server heroku main
  - this command is used because the code that will be pushed to heroku is in a subdirectory of src folder

## Redeploy Updated App
- make changes to the app
- go to project folder
- type command - npm run build
- copy the build folder
- paste the build folder in the same level as server.js
- go to https://localhost:8000/ to check if the server is serving up the minified react app
- commit changes to GitHub
- push changes to GitHub
- go to project folder
- type command - git subtree push --prefix src/server heroku main
