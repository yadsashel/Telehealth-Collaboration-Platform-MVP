document.addEventListener('DOMContentLoaded', function() {
    const times = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM'];
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    
    const tbody = document.querySelector('tbody');
    
    times.forEach(time => {
        let row = document.createElement('tr');
        let timeCell = document.createElement('td');
        timeCell.textContent = time;
        row.appendChild(timeCell);
        
        days.forEach(day => {
            let cell = document.createElement('td');
            cell.classList.add('patient-cell');
            // Placeholder content, can be replaced with actual data
            cell.innerHTML = `
                <div class="patient-info">
                    <img src="/images/profile-placeholder.png" alt="Profile Picture">
                    <span>John Doe</span>
                </div>
                <div>Age: 30</div>
                <div>Gender: Male</div>
                <div>Diagnostic: Flu</div>
                <div>Phone: 123-456-7890</div>
                <div>Address: 123 Main St</div>
            `;
            row.appendChild(cell);
        });
        
        tbody.appendChild(row);
    });
});