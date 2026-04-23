const express = require('express')
const app = express()
const port = 3000

// mkae data readable
app.use(express.json());


// Importing the database
const db = require('./db')    // here variable name is same as fileName

// // // Importing the person model 
// // now no need here because it has already a personRoutes file 
// // const Person = require("./models/Person")    // here variable name is same as fileName

// // Importing the menu model 
// now no need anymore because it has a route file name menuRoutes
// const MenuItem = require("./models/MenuItem")   // here variable name is same as fileName

// Importing person router (used to save for each collection api like person / menu etc..)
const personRoutes = require('./routes/personRoutes')  // here variable name is same as fileName

// Importing person router (used to save for each collection api like person / menu etc..)
const menuItemRoutes = require('./routes/menuItemRoutes')  // here variable name is same as fileName

// use the person router 
app.use('/person',personRoutes);

// use the menu router
app.use('/menu',menuItemRoutes);


// this is middleware to show the data from json file to readable format
const bodyParser = require('body-parser');
app.use(bodyParser.json());


// get method is used to getting the data from the server and send response to the client
app.get('/', (req, res) => {
  res.send('Hello, Welcome to My Hotel..... What can I serve you !')
})

// app.get('/vegBiryani', (req, res) => {
//   res.send('Sure sir, I would like to server you vegBiryani..')
// })

// app.get('/idli', (req, res) => {
//     var customized_idli = {
//         name : 'rava idli',
//         size : '10 cm diameter',
//         isSambhar : true,
//         isChutney : false
//     }
//   res.send(customized_idli)
// })


// app.post('/itmes',(req , res) => {
//     res.send("data is saved")
// })

app.listen(port, () => {
  console.log(`Server is running (live) on port ${port}`)
})