const mongoose = require('mongoose');

// Define the persone Schema -> means a person should have follwing information to work in this hotel
const personSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    age:{
        type: Number,
        required: false
    },
    work:{
        type : String,
        enum : ['owner' , 'manager' , 'chef' ,'waiter'],
        required : true

    },
    mobile:{
        type : String,
        required : true,
        unique : true
    },
    email:{
        type : String,
        required : true,
        unique : true
    },
    address:{
        type : String,
        required : true
    },
    salary:{
        type : Number,
        required : true
    }
})

// Create person model -> here we can perform crud operation on person information
const Person = mongoose.model('Person',personSchema);

module.exports = Person;
