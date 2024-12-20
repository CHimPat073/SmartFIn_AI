document.getElementById('goalForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get input values
    const goalName = document.getElementById('goalName').value;
    const targetAmount = parseFloat(document.getElementById('targetAmount').value);
    const currentSavings = parseFloat(document.getElementById('currentSavings').value);
    const monthlyContribution = parseFloat(document.getElementById('monthlyContribution').value);
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    // Create a new goal folder (using div for representation)
    const goalFolder = document.createElement('div');
    goalFolder.classList.add('goal-folder');
    goalFolder.innerHTML = `
        <h2>${goalName}</h2>
        <p>Target Amount: $${targetAmount}</p>
        <p>Current Savings: $${currentSavings}</p>
        <p>Monthly Contribution: $${monthlyContribution}</p>
        <p>Start Date: ${startDate}</p>
        <p>End Date: ${endDate}</p>
        <canvas id="${goalName}-chart" width="400" height="200"></canvas>
        <button onclick="updateGoal('${goalName}')">Update Goal</button>
    `;
    document.getElementById('goalList').appendChild(goalFolder);

    // Draw pie chart for the goal
    drawChart(goalName, currentSavings, targetAmount);

    // Reset the form
    document.getElementById('goalForm').reset();
});

function drawChart(goalName, currentSavings, targetAmount) {
    const ctx = document.getElementById(`${goalName}-chart`).getContext('2d');
    const chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Current Savings', 'Remaining Amount'],
            datasets: [{
                data: [currentSavings, targetAmount - currentSavings],
                backgroundColor: ['#36A2EB', '#FF6384'],
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: `Savings Overview for ${goalName}`
                }
            }
        }
    });
}

function updateGoal(goalName) {
    // Implement functionality to update goal information
    alert(`Update functionality for ${goalName} not yet implemented.`);
}
