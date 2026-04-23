const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true
    },
    price:{
        type : Number,
        // default : 2,   // we can use default price if price is not declare(fix)
        required : true
    },
    taste:{
        type : String,
        enum : ['sweet','spicy','sour'],
        required : true
    },
    is_drink :{
        type : Boolean,
        default : false
    },
    ingredients:{
       type : [String],
       default : []
    },
    num_sales:{
        type : Number,
        default : 0
    }
})

// Create menu model -> here we can perform crud operation on menu information
const MenuItem = mongoose.model('MenuItem',menuItemSchema);

module.exports = MenuItem;


