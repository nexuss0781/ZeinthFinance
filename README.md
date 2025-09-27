# Zenith Personal Finance Dashboard

"Zenith" is a modern, clean, and intuitive web application designed to help users take control of their financial lives. It provides a beautiful and simple interface for tracking income and expenses, visualizing spending habits, and understanding their overall financial health.

## Features

*   **Secure User Authentication:** Register, login, and logout with secure JWT-based authentication.
*   **Dashboard:** Overview of current month's income, expenses, net balance, a 30-day income vs. expense chart, and recent transactions. Includes a quick add transaction form.
*   **Transaction Management:** View, add, edit, and delete transactions. Filter transactions by type, date range, and category.
*   **Category Management:** Create, edit, and delete custom categories for income and expenses. Default categories are provided for new users.
*   **Reporting & Analytics:** Visualize expense breakdown by category (pie chart) and monthly income vs. expenses (bar chart) with date filtering.

## Technology Stack

### Backend
*   **Python:** Flask
*   **Database:** PostgreSQL
*   **ORM:** SQLAlchemy
*   **Migrations:** Flask-Migrate (Alembic)
*   **Authentication:** JWT

### Frontend
*   **JavaScript:** React (Vite)
*   **UI Library:** Material-UI
*   **Charting:** Recharts
*   **HTTP Client:** Axios
*   **Routing:** React Router

## Setup and Installation

### Prerequisites
*   Docker and Docker Compose (recommended for easy setup)
*   Python 3.9+
*   Node.js (LTS) & npm

### Using Docker (Recommended)

1.  **Build and Run the Docker Containers:**
    ```bash
    docker-compose up --build
    ```
    This will build the Docker images, set up the PostgreSQL database, run migrations, and start both the Flask backend and the React frontend.

2.  **Access the Application:**
    Open your browser and navigate to `http://localhost:5000` (or the port you configured).

### Manual Setup

#### 1. Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd dev
    ```
2.  **Create a Python virtual environment and activate it:**
    ```bash
    python -m venv venv
    source venv/bin/activate
    ```
3.  **Install Python dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
4.  **Set up PostgreSQL Database:**
    Ensure you have a PostgreSQL server running. Update the `SQLALCHEMY_DATABASE_URI` in `dev/config.py` with your database credentials.

5.  **Initialize and run database migrations:**
    ```bash
    flask db init
    flask db migrate -m "Initial migration"
    flask db upgrade
    ```
6.  **Run the Flask backend:**
    ```bash
    export FLASK_APP=app.py
    flask run
    ```
    The backend API will be available at `http://localhost:5000/api`.

#### 2. Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd dev/frontend
    ```
2.  **Install Node.js dependencies:**
    ```bash
    npm install
    ```
3.  **Start the React development server:**
    ```bash
    npm run dev
    ```
    The frontend application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Usage

1.  **Register a new account** or log in with existing credentials.
2.  **Explore the Dashboard** to see your financial overview.
3.  **Manage your transactions** on the Transactions page.
4.  **Customize your categories** on the Categories page.
5.  **View financial reports** on the Reports page.

## Contributing

Feel free to fork the repository and submit pull requests.

## License

This project is licensed under the MIT License.
