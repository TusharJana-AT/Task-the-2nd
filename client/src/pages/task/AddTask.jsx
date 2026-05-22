import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addTask } from "../../api/taskAPI";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useEffect } from "react";
import { getAllUser } from "../../api/authAPI";
import { addTaskSchema } from "../../validations/task.validation";
import { useAuth } from "../../context/AuthContext";

function AddTask() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const {user} = useAuth()
  // console.log(user.id)
  useEffect(() => {
    const getUsers = async () => {
      const res = await getAllUser();
      console.log(res.data?.data);
      setUsers(res.data?.data);
    };
    getUsers();
  }, []);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(addTaskSchema) });
  const onSubmit = async (data) => {
    try {
      await addTask(data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">Add Task</h2>

        <div>
          <input
            name="title"
            placeholder="Title"
            {...register("title")}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <input
            name="description"
            placeholder="description"
            type="text"
            {...register("description")}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <select
            {...register("assignedTo")}
            className="w-full p-2 border rounded-lg"
          >
          
            <option value="">Select One User</option>
            {users.map((u) => user.id !== u.id && (
              <option key={u.id} value={u.id}>
                {u.email}
              </option>
            ))}
          </select>
          {errors.assignedTo && (
            <p className="text-red-500 text-sm mt-1">
              {errors.assignedTo.message}
            </p>
          )}
        </div>

        <div>
          <input
            name="dueDate"
            type="date"
            min={new Date().toISOString().split("T")[0]}
            {...register("dueDate")}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.dueDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.dueDate.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding" : "Add"}
        </button>
      </form>
    </div>
  );
}

export default AddTask;
