const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: {
    type: String,
    
   
  },
  category:{
    type: String,
 
  },
  title:{
    type: String,

  },
  price:{
    type: String,
    
  },
  image:{
    type: String,
    
  },
  description:{
    type: String,
    
  }
 
});

const ProductModel = mongoose.model("Products", productSchema);

module.exports =  ProductModel;