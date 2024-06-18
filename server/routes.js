const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const todo = require('./models/todoSchema')

//GET 
router.get('/todos', async (req,res) => {
    const toDoData = await todo.find({})
    res.json(toDoData)
})

router.get('/todos/:id', async (req,res) => {
    try {
        const { id } = req.params
        const fetchtodo = await todo.findById(id)
        res.status(200).json(fetchtodo)

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.post('/todos', async (req,res) => {
    let { title } = req.body

    if(!title){
        res.status(400).json({message: "Error no todos"})
    }

    const newTodo = await todo.create({title, status: false})
    
    res.status(201).json({title, status: false, id: newTodo._id})
})

router.delete('/todos/:id', async (req,res) => {
    const { id } = req.params
    await todo.findByIdAndDelete(id).then(function(){
        res.status(200).json({mssg: "Deleted entry"})
    }).catch(function(err) {
        console.log(err)
    })
})

router.put('/todos/:id', async (req,res) => {
    const { id } = req.params
    const { status } = req.body

    if(typeof status != 'boolean'){
        res.status(400).json({message: "Status should be boolean"})
    }

    try{
        await todo.findByIdAndUpdate(id, { $set: { status: !status }})
        const updatedTodo = await todo.findById(id)
        res.status(200).json(updatedTodo)
    } catch(error){
        res.status(500).json(error.message)
    }
})

module.exports = router