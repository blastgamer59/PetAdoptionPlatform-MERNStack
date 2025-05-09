# 🐾 Pet Adoption Platform

A full-stack web application that connects users with adoptable pets. Users can browse available pets, add them to a favorites list, and schedule meetings for adoption. Built with the **MERN** stack (MongoDB, Express.js, React, Node.js) and styled using **Tailwind CSS**.

---

## 📌 Introduction

This platform helps potential pet adopters easily find and connect with their future furry companions. Users can explore a list of pets, save their favorites, and schedule appointments. Upon booking, an email with meeting details is automatically sent to the user.

---

## ✨ Features

* View a list of available pets with images and details
* Add pets to a personalized favorites list
* Fill out an adoption form to request a meeting
* Receive an email confirmation with meeting date and time
* Admins can check the application and view user favorites

---

## 🛠 Tech Stack

* **Frontend:** React.js, Tailwind CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Email Service:** (e.g., Nodemailer)
* **State Management:** Context API or Redux (confirm if used)
* **Authentication:** Used Firebase for safe authentication

---

## ⚙️ Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/pet-adoption-platform.git
cd pet-adoption-platform
```

2. **Install dependencies**

```bash
# For backend
cd backend
npm install

# For frontend
cd ../frontend
npm install
```

3. **Run the development servers**

```bash
# Start backend
cd backend
npm start

# Start frontend
cd ../frontend
npm start
```



## 🚀 Usage

1. Navigate to the homepage to browse available pets.
2. Click the ❤️ icon to add pets to your favorites.
3. Go to your favorites list to review your selections.
4. Fill out the adoption form to request a meeting.
5. Check your email for confirmation of the scheduled time.

---

## 🔗 API Overview

| Endpoint                 | Method | Description                                 |
| ------------------------ | ------ | ------------------------------------------- |
| `/api/pets`              | GET    | Get list of all available pets              |
| `/api/favorites`         | POST   | Add a pet to user’s favorites               |
| `/api/favorites/:userId` | GET    | Get user’s favorite pets                    |
| `/api/adoption`          | POST   | Submit adoption form and schedule a meeting |




## 🧪 Examples

* **Pet Listing Page**: Displays pets with names, breeds, and photos.
* **Favorites Page**: Shows pets user has liked.
* **Adoption Form**: User inputs details and picks a time slot.
* **Email Notification**: Sample confirmation sent via email after form submission.

## 🌐 Live Demo
🔗 Live Demo: https://petsadoptionplatform.netlify.app/




