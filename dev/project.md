Of course. Here is a well-structured, random project proposal designed to test the full capabilities of the Ethco Coder system. You can save this directly as `dev/project.md`.

***

### `dev/project.md`

# **Project Proposal: "Zenith" Personal Finance Dashboard**

## **1. Vision & Overview**

"Zenith" is a modern, clean, and intuitive web application designed to help users take control of their financial lives. It provides a beautiful and simple interface for tracking income and expenses, visualizing spending habits, and understanding their overall financial health. The application prioritizes a seamless user experience, powerful data visualization, and absolute security.

The target user is anyone who wants to move beyond simple spreadsheets and gain actionable insights from their financial data without the complexity of traditional accounting software.

---

## **2. Core Features**

### **F1: Secure User Authentication**
- **F1.1:** Users must be able to create a new account using an email and a secure password.
- **F1.2:** Users must be able to log in to their existing account.
- **F1.3:** The system must implement secure session management (e.g., JWT).
- **F1.4:** Users must be able to log out, terminating their session.
- **F1.5:** All user-specific data must be strictly isolated and accessible only to the authenticated owner.

### **F2: The Dashboard**
- **F2.1:** Upon logging in, the user is presented with a central dashboard.
- **F2.2:** The dashboard must display a "Key Metrics" card showing:
    - Total Income (current month)
    - Total Expenses (current month)
    - Net Balance (Income - Expenses for the current month)
- **F2.3:** A line chart visualizing income vs. expenses over the last 30 days.
- **F2.4:** A list or table displaying the 5 most recent transactions (both income and expenses).
- **F2.5:** A "Quick Add" form to rapidly add a new transaction (income or expense) directly from the dashboard.

### **F3: Transaction Management**
- **F3.1:** A dedicated "Transactions" page where users can view all their transactions in a paginated table or list.
- **F3.2:** The transaction view must be filterable by type (income/expense), date range, and category.
- **F3.3:** Users must be able to add a new transaction, providing the following details:
    - Type (Income or Expense)
    - Amount
    - Date
    - Category
    - A short description (optional)
- **F3.4:** Users must be able to edit the details of any existing transaction.
- **F3.5:** Users must be able to delete any transaction.

### **F4: Category Management**
- **F4.1:** Users need a dedicated page to manage their custom categories for income and expenses.
- **F4.2:** Users can add new categories (e.g., "Salary", "Groceries", "Utilities").
- **F4.3:** Users can edit the names of their custom categories.
- **F4.4:** Users can delete categories. If a category with associated transactions is deleted, the system should either re-categorize them to "Uncategorized" or prevent deletion. The former is preferred.
- **F4.5:** The system should provide a few default categories upon user registration (e.g., Salary, Rent, Groceries, Transport, Entertainment).

### **F5: Reporting & Analytics**
- **F5.1:** A dedicated "Reports" page for data visualization.
- **F5.2:** The page must feature a pie chart or donut chart showing the breakdown of expenses by category for a selectable time period (e.g., current month, last 3 months, current year).
- **F5.3:** The page must feature a bar chart comparing total monthly income against total monthly expenses over the last 12 months.

---

## **3. Test Requirements (Acceptance Criteria)**

### **TR1: User Authentication**
- [ ] A user can successfully register for an account and then log in.
- [ ] A logged-in user can successfully log out.
- [ ] A user cannot access another user's financial data.
- [ ] Password hashing must be implemented and verified.

### **TR2: Dashboard**
- [ ] After logging in, the dashboard is the first page shown.
- [ ] The "Key Metrics" card accurately reflects the current month's income, expenses, and balance.
- [ ] The line chart on the dashboard correctly displays data for the last 30 days.
- [ ] The five most recently added transactions appear in the "Recent Transactions" list.
- [ ] Adding a transaction via the "Quick Add" form successfully creates a new record and updates the dashboard metrics.

### **TR3: Transaction Management**
- [ ] A user can navigate to the "Transactions" page and view all their records.
- [ ] Filtering transactions by "expense" correctly hides all income records.
- [ ] A user can create a new income transaction and a new expense transaction, and they appear correctly in the list.
- [ ] A user can edit an existing transaction's amount, and the change is saved.
- [ ] A user can delete a transaction, and it is permanently removed from the list.

### **TR4: Category Management**
- [ ] A user can create a new category named "Subscriptions", and it becomes available in the category dropdown when adding a new transaction.
- [ ] A user can rename the "Groceries" category to "Food & Drink".
- [ ] A user can delete a category. Any transactions assigned to it are reassigned to an "Uncategorized" category.
- [ ] New users start with a pre-defined set of default categories.

### **TR5: Reporting & Analytics**
- [ ] The expense breakdown pie chart on the "Reports" page correctly calculates and displays percentages for each category.
- [ ] Changing the date filter on the reports page updates all charts with the new data.
- [ ] The income vs. expense bar chart correctly displays 12 bars representing the last 12 months of data.
