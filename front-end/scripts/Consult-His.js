document.addEventListener('DOMContentLoaded', function () {
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
                    <p><span class="label">Time:</span> <span class="value">${item.time || 'No time provided'}</span></p>
                    <p><span class="label">Reason:</span> <span class="value">${item.reason}</span></p>
                `;
                container.appendChild(div); // Append new item
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

function addToConsultationHistory(appointmentData) {
    const consultationHistory = document.getElementById('history-container');

    if (!consultationHistory) {
        console.error("Consultation history container not found!");
        return;
    }

    const appointmentCard = document.createElement('div');
    appointmentCard.classList.add('appointment-card');

    appointmentCard.innerHTML = `
        <h3>Scheduled Appointment</h3>
        <p><strong>Name:</strong> ${appointmentData.name}</p>
        <p><strong>Age:</strong> ${appointmentData.age}</p>
        <p><strong>Gender:</strong> ${appointmentData.gender}</p>
        <p><strong>Date:</strong> ${appointmentData.date}</p>
        <p><strong>Time:</strong> ${appointmentData.time}</p>
        <p><strong>Reason:</strong> ${appointmentData.reason}</p>
    `;

    consultationHistory.insertBefore(appointmentCard, consultationHistory.firstChild); // Prepend new item
} 