document.addEventListener('DOMContentLoaded', () => {
    // Fetch patient records dynamically from the backend
    fetch('/api/getPatientRecords')
        .then(response => response.json())
        .then(data => {
            const records = data.records; // Assuming the API returns an object with a 'records' array
            const recordsList = document.getElementById('records-list');

            records.forEach(record => {
                const recordItem = document.createElement('div');
                recordItem.classList.add('record-item');

                recordItem.innerHTML = `
                    <p><span>Name:</span> ${record.name}</p>
                    <p><span>Contact:</span> ${record.contact}</p>
                    <p><span>Date:</span> ${record.date}</p>
                    <p><span>Time:</span> ${record.time}</p>
                    <p><span>Reason:</span> ${record.reason}</p>
                    <button class="verify-button">Verify and Submit</button>
                `;

                // Add event listener for the verify button
                recordItem.querySelector('.verify-button').addEventListener('click', () => {
                    submitToDoctor(record);
                });

                recordsList.appendChild(recordItem);
            });
        })
        .catch(error => {
            console.error('Error fetching patient records:', error);
        });
});

// Function to submit the verified data to the doctor's dashboard
function submitToDoctor(record) {
    // Simulate an API call to send data to the doctor's dashboard
    fetch('/api/submitAppointment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(record)
    })
    .then(response => response.json())
    .then(data => {
        alert('Appointment submitted successfully!');
        // Optionally remove the record from the nurse's view or update the UI
    })
    .catch(error => {
        console.error('Error submitting appointment:', error);
    });
}