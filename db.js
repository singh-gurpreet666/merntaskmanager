const mongoose = require('mongoose')
const mongoURI = "mongodb+srv://gurpreetgolu31:Dak2020@merntaskmanager.n3a6xlq.mongodb.net/taskmanager?retryWrites=true&w=majority"
const connectToMongo = () => {
    mongoose.connect(mongoURI,).then(()=>    console.log("connected to mongo successfully")
    ).catch((err)=>{console.log(err)})
}

module.exports = connectToMongo