# **Project Management Dashboard**

## **Table of Contents**
1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [How to Run the Application Locally](#how-to-run-the-application-locally)
5. [Project Structure](#project-structure)
6. [Assumptions and Limitations](#assumptions-and-limitations)

---

## **Introduction**
The **Project Management Dashboard** is a web-based application for managing projects. It allows users to create, edit, and delete project records. Each project contains essential information such as project name, client name, and deadline.

This app demonstrates the use of **React** for the frontend, **Redux Toolkit** for state management, and **Node.js/Express** for the backend API with **MongoDB** as the database.

---

## **Features**
- **Add New Projects**: Users can add new projects by filling in the project name, client name, and deadline.
- **Edit Existing Projects**: Users can edit existing project details.
- **Delete Projects**: Users can delete projects with confirmation.
- **Error Handling and Form Validation**: Ensures all fields are filled before submission.
- **Responsive Design**: Works well on desktop and mobile devices.

---

## **Technologies Used**
- **Frontend**: React, Redux Toolkit, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Tools**: Axios (for API calls), npm (for package management)

---

## **How to Run the Application Locally**

### **Prerequisites**
- **Node.js** (version 20 or higher) installed on your machine
- **MongoDB** installed and running on port 27017 (or change the port in `.env` file if necessary)

### **1. Clone the Repository**
```bash
git clone https://github.com/vaibhava17/project-management-dashboard.git
cd project-management-dashboard
```

### **2. Set Up Environment Variables**
Create a `.env` file in the **backend** folder and add the following contents:
```
PORT=5001
MONGO_URI=mongodb://localhost:27017/project_management
```
> Make sure to change `MONGO_URI` if your MongoDB runs on a different port.

### **3. Install Dependencies**
**Install backend dependencies**
```bash
cd backend
npm install
```

**Install frontend dependencies**
```bash
cd ../frontend
npm install
```

### **4. Start MongoDB Server**
If you have **MongoDB** installed locally, you can start it using the following command (for MacOS):
```bash
brew services start mongodb-community@6.0
```

Alternatively, if you use **MongoDB Compass**, ensure that your MongoDB server is running on port **27017**.

### **5. Run the Application**
Run the backend server:
```bash
cd backend
npm start
```
> The backend server will run at **http://localhost:5001**.

Run the frontend application:
```bash
cd ../frontend
npm start
```
> The frontend server will run at **http://localhost:3000**.

---

## **Project Structure**
```
project-management-dashboard
├── backend
│   ├── config
│   ├── controllers
│   ├── daos
│   ├── helpers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── server.js
│   └── .env
├── frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── store
│   │   └── App.js
│   └── package.json
└── README.md
```
---

## **Assumptions and Limitations**

### **Assumptions**
1. **Authentication Not Implemented**: Currently, no user authentication or role-based access control is implemented. All users have access to all project data.
2. **Basic Form Validation**: The form checks for non-empty fields only. Further validation (like date range validation) can be added if required.
3. **Simple Error Messages**: Form validation only shows simple “Field is required” messages for now.
4. **MongoDB on Default Port**: Assumes that MongoDB is running on port **27017**.
5. **Static Token for API Calls**: For simplicity, API calls use a hardcoded JWT token in headers (this should be updated in a production app).

### **Limitations**
1. **Limited Error Handling**: If the backend server crashes, the UI does not gracefully handle it.
2. **No Pagination**: The project table does not support pagination. If there are too many projects, it may load slowly.
3. **No Sorting or Filtering**: There is no option to sort or filter projects in the table.
4. **Single User Role**: There is no distinction between admin users and normal users.

---

## **Conclusion**
By following this README, you should be able to **run the project locally** and understand the key components of the app. If you encounter any issues or have questions, feel free to create an issue in the repository or reach out to the maintainer.

Happy Coding! 🚀

