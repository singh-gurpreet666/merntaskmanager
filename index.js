const connectToMongo = require('./db')
const express = require('express')
const cors = require('cors')
connectToMongo()

const app = express()
app.use(cors())
const port = process.env.PORT || 9000

app.use(express.json())

//available routes
app.use('/api/tasks',require('./routes/Task'))

if(process.env.NODE_ENV == "production"){
    app.use(express.static("taskmanager/build"))
}
app.listen(port,()=>{
    console.log(`listning on port : ${port}`)
})

