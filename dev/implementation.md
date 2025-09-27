### `dev/implementation.md`

# **Implementation Plan: "Zenith" Personal Finance Dashboard**

This document outlines the technical implementation strategy for the Zenith application, detailing the chosen technology stack, architecture, and step-by-step plan for each feature.

---

## **1. Technology Stack & Architecture**

*   **Backend:** Python with the Flask framework. It's lightweight, robust, and well-suited for a project of this scale.
    *   **Database:** PostgreSQL will be used for its reliability and rich feature set.
    *   **ORM:** SQLAlchemy will serve as the Object-Relational Mapper for elegant and safe database interactions.
    *   **Migrations:** Flask-Migrate (using Alembic) will manage all database schema changes.
    *   **API:** A RESTful API will be built using Flask-RESTful for clear and structured communication with the frontend.
    *   **Authentication:** JSON Web Tokens (JWT) will be implemented for secure, stateless session management.

*   **Frontend:** A modern single-page application (SPA) will be built using React.
    *   **UI Library:** Material-UI will be used for its comprehensive set of beautiful, pre-built components, ensuring a professional and consistent look and feel.
    *   **Charting:** Recharts will be used to create the required data visualizations (line, bar, pie charts) due to its simplicity and power.
    *   **State Management:** React's native Context API will be used for managing global state like user authentication.
    *   **HTTP Client:** Axios will be used for making API requests to the backend.

*   **Containerization:** The entire application will be containerized using Docker. A single `Dockerfile` will set up the Python backend environment, install all dependencies, build the React frontend, and serve the final application.

---

## **2. Feature Implementation Details**

### **F1: Secure User Authentication**

1.  **Database Model:** Create a `User` model with fields for `id`, `email`, and `password_hash`.
2.  **Password Hashing:** Use the `werkzeug.security` library to hash passwords upon user registration and verify them during login.
3.  **API Endpoints:**
    *   `POST /api/auth/register`: Accepts email and password, creates a new user, and returns a JWT.
    *   `POST /api/auth/login`: Accepts email and password, verifies credentials, and returns a JWT.
    *   `POST /api/auth/logout`: This will be handled on the frontend by simply deleting the stored JWT.
4.  **Frontend Logic:**
    *   Create dedicated pages for "Register" and "Login".
    *   Store the received JWT in the browser's `localStorage`.
    *   Create a global `AuthContext` to provide user information and authentication status to the entire app.
    *   Implement a "private route" component that redirects unauthenticated users to the login page.

### **F2: The Dashboard**

1.  **Backend API Endpoints:**
    *   `GET /api/dashboard/metrics`: Calculates and returns the total income, total expenses, and net balance for the current month for the authenticated user.
    *   `GET /api/dashboard/chart`: Returns data points for the income vs. expenses line chart for the last 30 days.
    *   `GET /api/dashboard/recent-transactions`: Fetches the 5 most recent transactions for the user.
2.  **Frontend Components:**
    *   **`DashboardPage`:** The main container component.
    *   **`KeyMetricsCard`:** A component to fetch and display the data from `/api/dashboard/metrics`.
    *   **`IncomeExpenseChart`:** A Recharts line chart component to visualize data from `/api/dashboard/chart`.
    *   **`RecentTransactionsList`:** A component to display the latest transactions.
    *   **`QuickAddForm`:** A simple form that posts to the transaction creation endpoint (`POST /api/transactions`). On successful submission, it will trigger a refresh of the dashboard data.

### **F3: Transaction Management**

1.  **Database Model:** Create a `Transaction` model with fields for `id`, `user_id` (foreign key), `type` (income/expense), `amount`, `date`, `category_id` (foreign key), and `description`.
2.  **Backend API Endpoints:**
    *   `GET /api/transactions`: Fetches all transactions for the authenticated user. It will support query parameters for filtering (`type`, `startDate`, `endDate`, `category`).
    *   `POST /api/transactions`: Creates a new transaction.
    *   `PUT /api/transactions/<id>`: Updates an existing transaction.
    *   `DELETE /api/transactions/<id>`: Deletes a transaction.
3.  **Frontend Components:**
    *   **`TransactionsPage`:** The main page containing the filter controls and the transaction list.
    *   **`TransactionTable`:** A detailed table displaying all transactions with columns for each field.
    *   **`TransactionFilterBar`:** A component with dropdowns and date pickers to control the filtering logic.
    *   **`TransactionModal`:** A dialog/modal for adding or editing a transaction.

### **F4: Category Management**

1.  **Database Model:** Create a `Category` model with fields for `id`, `user_id` (foreign key), and `name`.
2.  **Backend Logic:**
    *   When a new user registers, a script will automatically populate their account with a set of default categories.
    *   Implement the logic for re-assigning transactions to an "Uncategorized" category when a category is deleted.
3.  **API Endpoints:**
    *   `GET /api/categories`: Fetches all categories for the user.
    *   `POST /api/categories`: Creates a new category.
    *   `PUT /api/categories/<id>`: Renames a category.
    *   `DELETE /api/categories/<id>`: Deletes a category.
4.  **Frontend Components:**
    *   **`CategoriesPage`:** A page to display and manage categories.
    *   **`CategoryList`:** A list displaying categories with "Edit" and "Delete" buttons.
    *   **`AddCategoryForm`:** A form for creating new categories.

### **F5: Reporting & Analytics**

1.  **Backend API Endpoints:**
    *   `GET /api/reports/expense-breakdown`: Calculates and returns the total spending per category for a given time period.
    *   `GET /api/reports/income-expense-summary`: Returns the total income and total expenses for each of the last 12 months.
2.  **Frontend Components:**
    *   **`ReportsPage`:** The main container for all charts and report filters.
    *   **`ExpensePieChart`:** A Recharts pie chart component to visualize the expense breakdown.
    *   **`MonthlySummaryChart`:** A Recharts bar chart to compare income and expenses over time.
    *   **`ReportFilters`:** Components to allow the user to select the time period for the reports.

---
