const express = require('express')
const router = express.Router()
// const fetchuser = require('../middleware/fetchuser')
const Task = require('../model/task')
const { body, validationResult } = require('express-validator')


//Route 1 : get all the tasks using GET 
router.get('/fetchalltask', async (req, res) => {
    const tasks = await Task.find()
    res.json(tasks)
})

//Route 2 : add a task using Using Post : localhost:6000/api/tasks/addtask
router.post('/addtask', [
    //validation rules 
    body('title', 'enter a valid title').isLength({ min: 3 }),
    body('description', 'description must be atleast 10 charechters').isLength({ min: 10 }),

], async (req, res) => {
    // if error - return bad request and errors

    try {
        const { title, description, tag  } = req.body
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const task = new Task({
            title, description, tag
        })
        const saveTask = await task.save()
        console.log(saveTask)
        res.json(saveTask)

    } catch (error) {
        console.error(error.message)
        res.status(500).send("some error has occured !")
    }

})

//ROUTE 3 : Update a existing task using PUT : /api/tasks/updatetask

router.put('/updatetask/:id', async (req, res) => {
    const { title, description, tag } = req.body
    try {
        //create a new task
        const newtask = {}
        if (title) { newtask.title = title }
        if (description) { newtask.description = description }
        if (tag) { newtask.tag = tag }

        //find task to be updated and update

        let task = await Task.findById(req.params.id)
        if (!task) {
            res.status(404).send("Not Found")
        }
        

        task = await Task.findByIdAndUpdate(req.params.id, { $set: newtask }, { new: true })

        res.json({ task })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("some error has occured !")
    }
})

//ROUTE 4 : delete a existing task using DELETE : /api/tasks/deletetask : Login requiresd 

router.delete('/deletetask/:id', async (req, res) => {
    try {
        //find task to deleted and delete it

        let task = await Task.findById(req.params.id)
        if (!task) {
            res.status(404).send("Not Found")
        }
        
        //find the task and delete
        task = await Task.findByIdAndDelete(req.params.id)

        res.json({ "Success": "task has been deleted !" })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("some error has occured !")
    }
})


module.exports = router