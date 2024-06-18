document.addEventListener('DOMContentLoaded', () => {
    const expenseNameInput = document.getElementById('expense-name');
    const expenseAmountInput = document.getElementById('expense-amount');
    const expenseDateInput = document.getElementById('expense-date');
    const addExpenseBtn = document.getElementById('add-expense-btn');
    const expenseList = document.getElementById('expense-list');
    const totalAmountSpan = document.getElementById('total-amount');

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    const renderExpenses = () => {
        expenseList.innerHTML = '';
        let totalAmount = 0;

        expenses.forEach((expense, index) => {
            const expenseItem = document.createElement('li');
            expenseItem.className = 'expense-item';
            expenseItem.innerHTML = `
                ${expense.name} - $${expense.amount} - ${expense.date}
                <div>
                    <button class="edit-btn" onclick="editExpense(${index})">Edit</button>
                    <button onclick="deleteExpense(${index})">Delete</button>
                </div>
            `;
            expenseList.appendChild(expenseItem);
            totalAmount += parseFloat(expense.amount);
        });

        totalAmountSpan.textContent = totalAmount.toFixed(2);
        localStorage.setItem('expenses', JSON.stringify(expenses));
    };

    const addExpense = () => {
        const expenseName = expenseNameInput.value.trim();
        const expenseAmount = parseFloat(expenseAmountInput.value);
        const expenseDate = expenseDateInput.value;

        if (expenseName && !isNaN(expenseAmount) && expenseDate) {
            expenses.push({
                name: expenseName,
                amount: expenseAmount,
                date: expenseDate
            });
            expenseNameInput.value = '';
            expenseAmountInput.value = '';
            expenseDateInput.value = '';
            renderExpenses();
        } else {
            alert('Please fill in all fields.');
        }
    };

    window.editExpense = (index) => {
        const expense = expenses[index];
        expenseNameInput.value = expense.name;
        expenseAmountInput.value = expense.amount;
        expenseDateInput.value = expense.date;
        deleteExpense(index);
    };

    window.deleteExpense = (index) => {
        expenses.splice(index, 1);
        renderExpenses();
    };

    addExpenseBtn.addEventListener('click', addExpense);

    renderExpenses();
});
