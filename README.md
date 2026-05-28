# Task Management App

A full-stack Task Management Application where users can assign tasks to other users and manage task progress.

## Features

* User Registration & Login
* JWT Authentication
* Password Hashing using bcrypt
* Create, Edit, and Delete Tasks
* Assign Tasks to Other Users
* Update Task Status (`Pending`, `In-Progress`, `Completed`)
* Pagination
* Task Filtering
* Responsive UI using Tailwind CSS
* Toast Notifications for frontend responses
* Context API for state management
* Axios for API requests

## Task Permission Logic

### Task Creator

The user who creates a task can:

* Edit task details
* Delete the task
* Assign the task to another user

But the creator cannot update the task status.

### Assigned User

The user to whom the task is assigned can:

* Only update the task status

The assigned user cannot:

* Edit task details
* Delete the task

## Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* Axios
* Context API
* React Toastify

### Backend

* Node.js
* Express.js
* Sequelize ORM
* PostgreSQL
* JWT Authentication
* bcrypt

## Environment Variables

Create a `.env` file using `.envDemo` as reference.

```env
DB_NAME=
DB_USER=
DB_PASS=
DB_HOST=
DB_PORT=

BASE_URL=

MY_SECRET=
```

## Installation

### Clone the Repository

```bash
git clone <your-repo-link>
```

## Backend Setup

```bash
cd server
npm install
npm run dev
```

## Frontend Setup

```bash
cd client
npm install
npm run dev
```




## Author

Tushar
