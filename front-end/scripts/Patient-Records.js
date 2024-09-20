document.addEventListener('DOMContentLoaded', function () {
    fetchPatientRecords();

    async function fetchPatientRecords() {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/get_patient_records');
            if (!response.ok) throw new Error('Network response was not ok');
            const records = await response.json();
            displayRecords(records);
        } catch (error) {
            console.error('Error fetching records:', error);
        }
    }

    function displayRecords(records) {
        const recordsList = document.getElementById('records-list');
        recordsList.innerHTML = '';

        records.forEach(record => {
            const recordCard = document.createElement('div');
            recordCard.classList.add('record-card');
            recordCard.innerHTML = `
                <input type="text" value="${record.name}" data-id="${record.id}" class="name" />
                <input type="number" value="${record.age}" class="age" />
                <select class="gender">
                    <option value="male" ${record.gender === 'male' ? 'selected' : ''}>Male</option>
                    <option value="female" ${record.gender === 'female' ? 'selected' : ''}>Female</option>
                    <option value="other" ${record.gender === 'other' ? 'selected' : ''}>Other</option>
                </select>
                <input type="date" value="${record.date}" class="date" />
                <input type="time" value="${record.time}" class="time" />
                <textarea class="reason">${record.reason}</textarea>
                <button class="edit-button">Edit</button>
                <button class="delete-button">Delete</button>
            `;

            const editButton = recordCard.querySelector('.edit-button');
            editButton.addEventListener('click', () => editRecord(recordCard));

            const deleteButton = recordCard.querySelector('.delete-button');
            deleteButton.addEventListener('click', () => deleteRecord(record.id));

            recordsList.appendChild(recordCard);
        });
    }

    function editRecord(recordCard) {
        const id = recordCard.querySelector('.name').dataset.id;
        const name = recordCard.querySelector('.name').value;
        const age = recordCard.querySelector('.age').value;
        const gender = recordCard.querySelector('.gender').value;
        const date = recordCard.querySelector('.date').value;
        const time = recordCard.querySelector('.time').value;
        const reason = recordCard.querySelector('.reason').value;

        const updatedData = {
            id: id,
            name: name,
            age: age,
            gender: gender,
            date: date,
            time: time,
            reason: reason
        };

        updatePatientRecord(updatedData);
    }

    async function updatePatientRecord(data) {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/update_patient_record', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) throw new Error('Network response was not ok');
            const result = await response.json();
            console.log(result.message);
            fetchPatientRecords(); // Refresh records after update
        } catch (error) {
            console.error('Error updating record:', error);
        }
    }

    async function deleteRecord(id) {
        // Implement the delete functionality
        console.log(`Delete record with ID: ${id}`);
        // Add your deletion logic here
    }
});