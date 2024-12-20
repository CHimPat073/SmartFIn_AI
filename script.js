const backendUrl = 'http://localhost:3000';

// Add transaction to the table
function addTransactionToTable(transaction) {
    const tableBody = document.getElementById('transaction-table').querySelector('tbody');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${new Date(transaction.date).toLocaleDateString()}</td>
        <td>${transaction.description}</td>
        <td>${transaction.amount.toFixed(2)}</td>
        <td>${transaction.type}</td>
        <td>
            <button class="delete-button" onclick="deleteTransaction('${transaction._id}')">Delete</button>
        </td>
    `;

    tableBody.appendChild(row);
}

// Calculate and display the current balance
function updateBalance(transactions) {
    let balance = 0;

    transactions.forEach((transaction) => {
        if (transaction.type === 'credit') {
            balance += transaction.amount;
        } else if (transaction.type === 'debit') {
            balance -= transaction.amount;
        }
    });

    // Update the balance in the UI
    const balanceElement = document.getElementById('balance'); // Use "balance" instead of "current-balance"
    if (balanceElement) {
        balanceElement.textContent = `₹ ${balance.toFixed(2)}`;
    } else {
        console.error('Balance element not found in the DOM.');
    }
}

// Fetch transactions from backend
async function fetchTransactions() {
    try {
        const response = await fetch(`${backendUrl}/transactions`);
        if (response.ok) {
            const transactions = await response.json();

            // Clear and populate the table
            const tableBody = document.getElementById('transaction-table').querySelector('tbody');
            tableBody.innerHTML = '';
            transactions.forEach(addTransactionToTable);

            // Update balance
            updateBalance(transactions);
        } else {
            console.error('Failed to fetch transactions');
        }
    } catch (error) {
        console.error('Error fetching transactions:', error);
    }
}

// Handle form submission
document.getElementById('transactionForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const description = document.getElementById('description').value.trim();
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;
    const date = document.getElementById('date').value; // Read date input

    if (!description || isNaN(amount) || !type || !date) {
        alert('All fields are required');
        return;
    }

    try {
        const response = await fetch(`${backendUrl}/transactions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ description, amount, type, date }),
        });

        if (response.ok) {
            const newTransaction = await response.json();
            addTransactionToTable(newTransaction);

            // Refresh balance
            const tableBody = document.getElementById('transaction-table').querySelector('tbody');
            const transactions = Array.from(tableBody.rows).map(row => ({
                type: row.cells[3].textContent,
                amount: parseFloat(row.cells[2].textContent),
            }));
            updateBalance(transactions);

            document.getElementById('transactionForm').reset();
        } else {
            alert('Failed to add transaction');
        }
    } catch (error) {
        console.error('Error adding transaction:', error);
    }
});

// Delete a transaction
async function deleteTransaction(id) {
    if (!confirm('Are you sure you want to delete this transaction?')) return;

    try {
        const response = await fetch(`${backendUrl}/transactions/${id}`, { method: 'DELETE' });
        if (response.ok) {
            alert('Transaction deleted successfully');
            fetchTransactions(); // Refresh table and balance
        } else {
            alert('Failed to delete transaction');
        }
    } catch (error) {
        console.error('Error deleting transaction:', error);
    }
}

// Load transactions on page load
window.onload = fetchTransactions;
