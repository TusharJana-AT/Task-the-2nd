import { messages } from "../messages/index.js";
import { Task, User } from "../models/index.js";
import { response } from "../utils/response.util.js";

export const createTask = async ({
  title,
  description,
  dueDate,
  userId,
  assignedTo,
}) => {
  if (!title || !description) {
    const err = new Error(messages.task.EMPTY_FIELD);
    err.statusCode = 400;
    throw err;
  }

    if (userId === assignedTo) {
    const err = new Error("You cannot assign task to yourself");
    err.statusCode = 400;
    throw err;
  }

  
  const data = await Task.create({
    title,
    description,
    dueDate,
    userId,
    assignedTo,
  });

  return data;
};

export const destroyTask = async ({ taskId, userId }) => {
  
  if (!deleted) {
    const err = new Error("Task not found");
    err.statusCode = 404;
    throw err;
  }
  return true;
};

export const updateTask = async ({
  title,
  description,
  status,
  dueDate,
  assignedTo,
  taskId,
  userId,
}) => {

  const task = await Task.findByPk(taskId);

  if (!task) {
    const err = new Error(messages.task.TASK_NOTFOUNT);
    err.statusCode = 404;
    throw err;
  }

  const isCreator = task.userId === userId;
  const isAssignee = task.assignedTo === userId;

  if (!isCreator && !isAssignee) {
    const err = new Error("Unauthorized");
    err.statusCode = 403;
    throw err;
  }

  const updates = {};

  if (isCreator) {

    if (title !== undefined) {
      updates.title = title;
    }

    if (description !== undefined) {
      updates.description = description;
    }

    if (dueDate !== undefined) {
      updates.dueDate = dueDate;
    }

    if (assignedTo !== undefined) {

      if (assignedTo === userId) {
        const err = new Error("You cannot assign task to yourself");
        err.statusCode = 400;
        throw err;
      }

      updates.assignedTo = assignedTo;
    }
  }

  if (isAssignee && status !== undefined) {
    updates.status = status;
  }

  await task.update(updates);

  return task;
};

export const fetchCreatedTasks = async ({
  userId,
  page = 1,
  limit = 5,
  status,
}) => {
  const offset = (page - 1) * limit;

  const where = { userId };

  if (status) {
    where.status = status;
  }

  const { rows, count } = await Task.findAndCountAll({
    where,
    include: [
      {
        model: User,
        as: "assignee",
        attributes: ["id", "name", "email"],
      },
    ],
    limit: Number(limit),
    offset: Number(offset),
    order: [["createdAt", "DESC"]],
  });

  return {
    tasks: rows,
    totalPages: Math.ceil(count / limit),
  };
};

export const fetchAssignedTasks = async ({
  userId,
  page = 1,
  limit = 5,
  status,
}) => {
  const offset = (page - 1) * limit;

  const where = {
    assignedTo: userId,
  };

  if (status) {
    where.status = status;
  }

  const { rows, count } = await Task.findAndCountAll({
    where,
    include: [
      {
        model: User,
        as: "creator",
        attributes: ["id", "name", "email"],
      },
    ],
    limit: Number(limit),
    offset: Number(offset),
    order: [["createdAt", "DESC"]],
  });

  return {
    tasks: rows,
    totalPages: Math.ceil(count / limit),
  };
};

export const fetchSingleTask = async ({ taskId }) => {
  const data = await Task.findOne({
    where: { id: taskId },
    include: [
      {
        model: User,
        as: "assignee",
        attributes: ["id", "name", "email"],
      },
      {
        model: User,
        as: "creator",
        attributes: ["id", "name", "email"],
      },
    ],
  });
  if (!data) {
    const err = new Error(messages.task.TASK_NOTFOUNT);
    err.statusCode = 400;
    throw err;
  }
  return data;
};
