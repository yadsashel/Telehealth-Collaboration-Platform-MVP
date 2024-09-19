document.addEventListener('DOMContentLoaded', function() {
    fetchAndDisplayConsultations();
});

function fetchAndDisplayConsultations() {
    fetch('http://127.0.0.1:5001/api/get_consultations')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('history-container');
            container.innerHTML = ''; // Clear any existing content

            if (data.length === 0) {
                container.innerHTML = '<p>No recent appointments in the last 24 hours.</p>';
                return;
            }

            data.forEach(item => {
                const div = document.createElement('div');
                div.className = 'consultation-item';
                div.innerHTML = `
                    <p><span class="label">Name:</span> <span class="value">${item.name}</span></p>
                    <p><span class="label">Age:</span> <span class="value">${item.age}</span></p>
                    <p><span class="label">Gender:</span> <span class="value">${item.gender}</span></p>
                    <p><span class="label">Date:</span> <span class="value">${item.date}</span></p>
                    <p><span class="label">Time:</span> <span class="value">${item.time || 'N/A'}</span></p>
                    <p><span class="label">Reason:</span> <span class="value">${item.reason}</span></p>
                `;
                container.appendChild(div);
            });
        })
        .catch(error => {
            console.error('Error fetching consultations:', error);
            const container = document.getElementById('history-container');
            if (container) {
                container.innerHTML = '<p>Error fetching consultations. Please try again later.</p>';
            }
        });
}