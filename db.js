const mongoose = require('mongoose')
const mongoURI = process.env.DATABASE
const connectToMongo = () => {
    mongoose.connect(mongoURI,).then(()=>    console.log("connected to mongo successfully")
    ).catch((err)=>{console.log(err)})
}

module.exports = connectToMongo