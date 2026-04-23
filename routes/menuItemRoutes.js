const express = require('express')
const router = express.Router()   // it manages different - 2 end point (API's)
const MenuItem = require('../models/MenuItem')

// post method for the menu option
router.post('/' , async (req , res) => {
    try{

        // assuming the request body contains person data
        const data = req.body   

         // Create a new Person Document using mongoose model
        const newMenu = new MenuItem(data);

        // saving the newPerson data into the database
        const response = await newMenu.save()

        // showing that data is saved in database
        console.log('data saved')

        // showing status that operation is success or fail
        res.status(200).json(response)

    }catch(err){
        console.log(err)
        res.status(500).json({error : 'Internal Server Error'})
    }
})

// get method for the menu option
router.get('/' , async (req , res) => {
    try{

        const data = await MenuItem.find()
        console.log('data Fetched')
        res.status(200).json(data)

    }catch(err){
        console.log(err)
        res.status(500).json({error : 'Internal Server Error'})
    }
})

// to find the taste type 
router.get('/:tasteType' , async (req , res) => {
    try{
        const tasteType = req.params.tasteType;
        if(tasteType == 'sweet' || tasteType == 'sour' || tasteType == 'salt' ){
            const response = await MenuItem.find({taste : tasteType});
            console.log('response Fetched');
            res.status(200).json(response);

        }else{
            res.status(404).json({error : "Invalid taste Type"});
        }
    }catch(err){
        console.log(err)
        res.status(500).json({error : "Internal Server Error"})
    }
})

module.exports = router;