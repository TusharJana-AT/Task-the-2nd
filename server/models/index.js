import Task from './task.model.js'
import User from './user.model.js'


User.hasMany(Task, {
  foreignKey: "userId",
  as: "createdTasks",
});

Task.belongsTo(User, {
  foreignKey: "userId",
  as: "creator",
});

User.hasMany(Task, {
  foreignKey: "assignedTo",
  as: "assignedTasks",
});

Task.belongsTo(User, {
  foreignKey: "assignedTo",
  as: "assignee",
});

export {
    Task,
    User,
}
