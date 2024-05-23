const Task = require('../model/Task');

const taskController = {}

taskController.createTask = async (req, res) => {
    try {
        //req.body 는 프론트엔드 에서 보내는 값들
        const { task, isComplete } = req.body;
        const newTask = new Task({ task, isComplete });
        await newTask.save();
        res.status(200).json({ status: 'ok', data: newTask });
    } catch (err) {
        res.status(400).json({ status: 'fail', error: err})
    }
};

taskController.getTasks = async (req, res) => { 
    try {
        const taskList = await Task.find({}).select("-__v");
        res.status(200).json({ status: 'ok', data: taskList });
    } catch (err) {
        res.status(400).json({ status: 'fail', error: err})
    }
}

taskController.updateTask = async (req, res) => { 
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            throw new Error("Task not found")
        }
        const fields = Object.keys(req.body);
        fields.map((item) => (task[item] = req.body[item]));
        await task.save();
        res.status(200).json({ status: 'ok', data: task });
    } catch (err) {
        res.status(400).json({ status: 'fail', error: err})
    }
}

taskController.deleteTask = async (req, res) => { 
    try {
        const { id } = req.params;
        const deletedTask = await Task.findByIdAndDelete(id);
        res.status(200).json({ status: 'ok', data: deletedTask });
    } catch (err) {
        res.status(400).json({ status: 'fail', error: err})
    }
}

module.exports = taskController;