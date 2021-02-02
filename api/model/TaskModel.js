var mongoose = require('mongoose');

//schema
var taskSchema = mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        required: true
    }
});

taskSchema.methods.getTaskName = function () {
    return this.task + ' incluido com sucessooooooo'
}

// Export Bio Model
var Task = module.exports = mongoose.model('task', taskSchema);
/* 
module.exports.get = function (callback, limit) {
    Task.find(callback).limit(limit);
} */