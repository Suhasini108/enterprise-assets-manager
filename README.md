# 🖥️ Enterprise Assets & Subscription Manager

A responsive web-based application designed to help organizations manage their IT assets and software subscriptions in one place.

The project is built using **HTML5, CSS3, and vanilla JavaScript** without any frontend framework or backend. Asset and subscription data is stored locally in the browser using the **localStorage API**, allowing data to persist even after refreshing the page.

---

## 📸 Project Preview

Add a screenshot of the dashboard here:

```md
![Enterprise Assets & Subscription Manager](screenshot.png)
```

---

## ✨ Features

### 📊 Dashboard

* Provides an overview of enterprise assets.
* Displays asset statistics and information.
* Shows assets based on their departments.
* Displays asset status information such as:

  * Assigned
  * Available
  * Repair
* Provides a centralized dashboard for managing assets and subscriptions.

### 💻 Asset Management

* Add new enterprise assets.
* Edit existing assets.
* Delete assets.
* Search assets using the search bar.
* Filter assets by department.
* Filter assets by status.
* Generate unique asset IDs.
* Store asset information using browser `localStorage`.

Asset records contain information such as:

* Asset ID
* Asset Name
* Category
* Employee
* Department
* Status
* Purchase Date

### 💳 Subscription Management

* Add software and service subscriptions.
* Edit existing subscriptions.
* Delete subscriptions.
* Manage subscriptions through a dedicated subscription section.
* Store subscription information using `localStorage`.
* Track subscription information such as:

  * Subscription name
  * Provider/service
  * Cost
  * Renewal date

### 🔍 Search and Filtering

The application provides search and filtering functionality to quickly find assets.

Search can be performed using information such as:

* Asset name
* Employee
* Department
* Category

Assets can also be filtered using:

* Department
* Status

### ✏️ Edit and Delete

* Edit existing asset records without creating duplicate records.
* Delete unwanted assets.
* Changes are immediately reflected in the dashboard.
* Updated information is saved to local storage.

### 💾 Persistent Local Storage

The application uses the browser's **localStorage API** for data persistence.

This allows the application to:

* Save asset information.
* Save subscription information.
* Load saved information when the application starts.
* Preserve data after browser refreshes.
* Work without a backend or database.

### 🌙 Responsive Interface

The application is designed with responsive CSS so that the interface can be used on:

* 💻 Desktop and laptop screens
* 📱 Mobile screens

---

## 🛠️ Technologies Used

* **HTML5** — Structure and content of the application.
* **CSS3** — Layout, responsive design, forms, tables, dashboard components, and styling.
* **JavaScript (ES6)** — Application logic, DOM manipulation, events, CRUD operations, searching, filtering, and data management.
* **localStorage API** — Client-side data persistence.
* **Git & GitHub** — Version control and project hosting.

---

## 📁 Project Structure

```text
enterprise-assets-manager/
│
├── index.html          # Main HTML structure and dashboard layout
├── style.css           # Global styling, header, sidebar and common components
├── dashboard.css       # Dashboard cards, tables, charts and dashboard styling
├── forms.css           # Forms, modals and form-related styling
│
├── app.js              # Main application logic and asset management
├── storage.js          # localStorage functions for saving and loading data
├── dashboard.js        # Dashboard statistics and visualization logic
├── subscription.js     # Subscription management functionality
├── activity.js         # Activity tracking and recent activity functionality
│
└── README.md           # Project documentation
```

---

## 🚀 Getting Started

No backend server, database, or build tools are required for the current version.

### 1. Clone the repository

```bash
git clone https://github.com/Suhasini108/enterprise-assets-manager.git
```

### 2. Open the project folder

```bash
cd enterprise-assets-manager
```

### 3. Run the application

Open `index.html` in your web browser.

You can also open the project in **VS Code** and use the **Live Server** extension to run the application.

---

## 🧭 How to Use

### Add an Asset

1. Open the dashboard.
2. Click **Add Asset**.
3. Enter the asset details.
4. Save the asset.
5. The new asset appears in the asset table.
6. The information is stored in `localStorage`.

### Edit an Asset

1. Find the required asset in the table.
2. Click **Edit**.
3. Modify the required information.
4. Save the changes.
5. The existing asset is updated instead of creating a new record.

### Delete an Asset

1. Find the asset in the table.
2. Click **Delete**.
3. The asset is removed from the application and local storage.

### Search Assets

Use the search bar to search for assets using:

* Asset name
* Employee
* Department
* Category

### Filter Assets

Use the available filters to display assets based on:

* Department
* Status

### Manage Subscriptions

Navigate to the **Subscriptions** section to:

* Add subscriptions.
* Edit subscription information.
* Delete subscriptions.
* Manage subscription records.
* Store subscription data locally.

---

## 🧠 Key Concepts Implemented

This project demonstrates practical implementation of:

* DOM manipulation
* JavaScript event handling
* Forms and modal dialogs
* CRUD operations
* Search functionality
* Filtering
* JavaScript arrays and objects
* `localStorage`
* JSON data handling
* Dynamic table generation
* Responsive CSS
* Modular JavaScript files
* Dashboard data management
* Git and GitHub version control

---

## 🎯 Project Objective

The main objective of this project is to create a simple and user-friendly platform for managing enterprise IT assets and subscriptions.

The application demonstrates how **HTML, CSS, and vanilla JavaScript** can be used to build a complete client-side management system with CRUD operations, search and filtering, responsive design, and persistent browser storage.

---

## 🔮 Future Improvements

Possible future improvements include:

* Backend integration using Node.js and Express.js.
* Database integration using MySQL or MongoDB.
* User authentication and authorization.
* Admin and employee roles.
* Cloud-based data storage.
* Advanced asset reports and analytics.
* Subscription renewal reminders.
* Email notifications.
* Multi-user access.
* Deployment with a backend server.

---

## 👤 Author

**Suhasini108**

GitHub: [Suhasini108](https://github.com/Suhasini108)
