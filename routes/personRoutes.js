const express = require('express')
const router = express.Router()   // it manages different - 2 end point (API's)
const Person = require('./../models/Person')

// post method to send the data from the client to the databse server 
router.post('/',async (req , res) => {

    // const data = req.body   // assuming the request body contains person data

    // // Create a new Person Document using mongoose model
    // const newPerson = new Person(data);

    // // newPerson.name = data.name;
    // // newPerson.age = data.age;
    // // newPerson.work = data.work;
    // // newPerson.mobile = data.mobile;
    // // newPerson.email = data.email;
    // // newPerson.address = data.address;
    // // newPerson.salary = data.salary;

    // // Or we can directly pass the data to the person class {Person(data)} to preventing writing number of lines code for the multiple values 

    // // save the new person data to the database
    //    // this will give some error because now post method does not accept callback function
    // newPerson.save((error , savedPerson) => {
    //     if(error){
    //         console.log("Error on saving person's data :",error)
    //         res.status(500).json({error : 'Internal Server Error'})
    //     }else{
    //         console.log("Data saved Successfully")
    //         res.status(200).json(savedPerson)
    //     }
    // })
    
    try{

        // assuming the request body contains person data
        const data = req.body   

         // Create a new Person Document using mongoose model
        const newPerson = new Person(data);

        // saving the newPerson data into the database
        const response = await newPerson.save()

        // showing that data is saved in database
        console.log('data saved')

        // showing status that operation is success or fail
        res.status(200).json(response)

    }catch(err){
        console.log(err)
        res.status(500).json({error : 'Internal Server Error'})
    }
})

// get method to get the data from the databse server to the client
router.get('/',async(req, res) =>{
    try{
        const data = await Person.find()
        console.log("data fetched")
        res.status(200).json(data)
    }catch(err){
        console.log(err)
        res.status(500).json({error : 'Internal Server Error'})
    }
})

//this is to find the worktype of a person like waiter/manager/owner/chef etc here worktype is variable  
router.get('/:workType' , async (req , res) => {
    try{
        const workType = req.params.workType;
        if(workType == 'chef' || workType == 'waiter' || workType == 'manager' || workType == 'owner'){
            const response = await Person.find({work : workType});
            console.log('response Fetched');
            res.status(200).json(response);

        }else{
            res.status(404).json({error : "Invalid work Type"});
        }
    }catch(err){
        console.log(err)
        res.status(500).json({error : "Internal Server Error"})
    }
})

// update the data 
router.put('/:id',async(req,res) => {
    try{
        const personId = req.params.id; // extract the id from the url parametetr
        const updatePersonData = req.body;  // update data for the person
        const response = await Person.findByIdAndUpdate(personId , updatePersonData , {
            new : true,  // return the updated document
            runValidators : true  // run mongoose validation
        })

        if(!response){
            return res.status(404).json({error : "Person Not Found"});
        }

        console.log('data updated')
        res.status(200).json(response)

    }catch(err){
        console.log(err);
        res.status(500).json({error : "Internal Server Error"})
    }
})

// delte the data
router.delete('/:id' , async (req,res) => {
    try{
        const personId = req.params.id; // extract the id from the url parametetr
        const response = await Person.findByIdAndDelete(personId);
         if(!response){
            return res.status(404).json({error : "Person Not Found"});
        }
        console.log('Data Deleted');
        res.status(200).json({message : "Person Data Deleted Successfully"});


    }catch(err){
        console.log(err)
        res.status(500).json({error : "Internal Server Error "})
    }

})
// if in every endpoint (api) anything is common then delete from here and paste it into server.js file at place of api(end point) in the router (express router)

module.exports = router;