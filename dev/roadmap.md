### `dev/roadmap.md`

# **Development Roadmap: Zenith Finance Dashboard**

This roadmap breaks down the project into logical phases, starting with the core backend setup and progressively building out the features, culminating in a polished, deployable application.

---

### **Phase 1: Backend Foundation & Core API**

*   **Objective:** Establish the complete backend project structure, database, and core authentication.
*   **Tasks:**
    1.  Initialize the Flask project structure (`app.py`, models, routes, etc.).
    2.  Set up the PostgreSQL database and configure SQLAlchemy and Flask-Migrate.
    3.  Define the `User`, `Transaction`, and `Category` database models.
    4.  Implement the full user authentication API (`/api/auth/register`, `/api/auth/login`).
    5.  Create the API endpoints for basic CRUD operations for Transactions and Categories.
    6.  Implement the logic for creating default categories for new users.

---

### **Phase 2: Frontend Scaffolding & Authentication**

*   **Objective:** Set up the React frontend and connect it to the backend's authentication system.
*   **Tasks:**
    1.  Initialize a new React application using `create-react-app`.
    2.  Install frontend dependencies: Material-UI, Recharts, Axios, React Router.
    3.  Structure the frontend project (components, pages, services).
    4.  Build the main application layout, including a navigation bar and a content area.
    5.  Create the "Login" and "Register" pages.
    6.  Implement the `AuthContext` and authentication logic to manage JWTs.
    7.  Create the private route component to protect authenticated pages.

---

### **Phase 3: Core Feature Implementation (Dashboard & Transactions)**

*   **Objective:** Build the main dashboard and the complete transaction management functionality.
*   **Tasks:**
    1.  Develop the backend APIs for all dashboard components (`/api/dashboard/...`).
    2.  Build the `DashboardPage` on the frontend, integrating the `KeyMetricsCard`, `IncomeExpenseChart`, and `RecentTransactionsList`.
    3.  Implement the "Quick Add" transaction form on the dashboard.
    4.  Build the dedicated `TransactionsPage` with a filterable, paginated table of all user transactions.
    5.  Create the `TransactionModal` for adding and editing transactions.
    6.  Connect all frontend components to their respective backend API endpoints.

---

### **Phase 4: Category Management & Reporting**

*   **Objective:** Implement the category management and data visualization features.
*   **Tasks:**
    1.  Build the `CategoriesPage` on the frontend, allowing users to add, edit, and delete their categories.
    2.  Develop the backend APIs for the reporting page (`/api/reports/...`).
    3.  Build the `ReportsPage` on the frontend.
    4.  Integrate the `ExpensePieChart` and `MonthlySummaryChart` using Recharts.
    5.  Add date filter controls to the `ReportsPage` and connect them to the API calls.

---

### **Phase 5: Finalization & Containerization**

*   **Objective:** Polish the application, write the final documentation, and prepare it for deployment.
*   **Tasks:**
    1.  Conduct a full application review for UI/UX consistency and polish.
    2.  Write the `Dockerfile` to containerize the application. This will include:
        *   Setting up the Python environment.
        *   Installing backend and frontend dependencies.
        *   Running the React build process.
        *   Configuring the Flask server to serve the static React files and the API.
    3.  Initialize a Git repository.
    4.  Create a high-quality `README.md` file with project details, setup instructions, and feature overview.
    5.  Generate the `final.md` report to verify all requirements have been met.
