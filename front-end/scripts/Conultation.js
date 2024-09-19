function loadConsultationHistory() {
    fetch('/getConsultationHistory') // Assuming there's an endpoint for fetching consultation history
        .then(response => response.json())
        .then(data => {
            const historyContainer = document.getElementById('consultation-history');
            historyContainer.innerHTML = ''; // Clear existing entries
            data.records.forEach(record => {
                const recordItem = document.createElement('div');
                recordItem.classList.add('history-item');

                recordItem.innerHTML = `
                    <p><span>Name:</span> ${record.name}</p>
                    <p><span>Contact:</span> ${record.contact}</p>
                    <p><span>Date:</span> ${record.date}</p>
                    <p><span>Time:</span> ${record.time}</p>
                    <p><span>Reason:</span> ${record.reason}</p>
                `;
                historyContainer.appendChild(recordItem);
            });
        })
        .catch(error => {
            console.error('Error fetching consultation history:', error);
        });
}