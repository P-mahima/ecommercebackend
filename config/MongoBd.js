// const mongoose = require('mongoose')

// const connecDb = async() =>{
//     try{
//         const connection = await mongoose.connect(process.env.MONGO_URL,{
//             useUnifiedTopology :true,
//             useNewUrlParser: true,
//         })
//         console.log('mogobd connected')
//     }
//     catch(error){
//         console.log('error' , error)
//     }
// }

// module.exports = connecDb

const mongoose = require("mongoose");

const connectToDB = (url) => mongoose.connect(url)
    .then(() => console.log("Connected Mongo db"))
    .catch((err) => console.log(err));


module.exports = connectToDB

