const { Router } = require('express')
const { Task, validate } = require('../models/Task')

const router = Router()

router.get('/tasks', async (req, res) => {
    let data = await Task.find()
    res.send({
        value: data
    })
})

router.get('/tasks/:id', async (req, res) => {
    try {
        let response = await Task.findById(req.params.id)

        response ? res.send(response)
            : res.status(404).send('Not Found...')
    }
    catch (err) {
        return res.status(404).send('Not Found...')
    }
})

router.post('/tasks/create', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    try {
        const task = new Task(req.body)
        const data = await task.save()
        res.status(200).send({
            message: 'Task created successfully...',
            data,
            success: true
        })
    }
    catch (err) {
        return res.status(404).send({ message: 'Something wrong', success: false })
    }

})

router.put('/tasks/:id', async (req, res) => {
    // check 404
    try {
        await Task.findById(req.params.id)
    }
    catch (err) {
        return res.status(404).send('Not Found...')
    }

    // update
    try {
        let data = await Task.findByIdAndUpdate(
            { _id: req.params.id },
            { text: req.body.text },
            { new: true }
        )

        res.status(200).send({
            message: 'Task updated successfully...',
            data,
            success: true
        })
    } catch (err) {
        return res.status(404).send({ message: 'Not Found...', success: false })
    }

})

router.delete('/tasks/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id)
        res.status(200).send({
            message: 'Deleted successfully...',
            success: true
        })
    }
    catch (err) {
        return res.status(404).send({ message: 'Not Found...', success: false })
    }
})

module.exports = router