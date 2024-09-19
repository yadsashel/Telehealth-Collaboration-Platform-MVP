document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('appointmentForm').addEventListener('submit', async function (e) {
        e.preventDefault();

        const appointmentData = {
            name: document.getElementById('name').value,
            age: document.getElementById('age').value,
            gender: document.getElementById('gender').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            reason: document.getElementById('reason').value,
        };

        console.log("Form submitted!");
        console.log("Appointment Data:", appointmentData);

        try {
            const response = await fetch('http://127.0.0.1:5000/api/schedule_appointment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(appointmentData)
            });

            console.log(response); 
            const result = await response.json();
            console.log(result.message);

            addToConsultationHistory(appointmentData);

        } catch (error) {
            console.error('Error:', error);
        }
    });

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

        consultationHistory.appendChild(appointmentCard);
    }
});