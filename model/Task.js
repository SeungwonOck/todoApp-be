const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    task: {
        type: String,
        required: true,
    },
    isComplete: {
        type: Boolean,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
}, { timestamps: true });
//timestamps로 createAt 및 updateAt을 자동으로 생성

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;