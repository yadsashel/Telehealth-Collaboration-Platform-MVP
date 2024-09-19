import os, sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from flask import Flask, request, jsonify
from flask_cors import CORS
from config.database_config import get_db_connection  # Import your database config file


app = Flask(__name__)
CORS(app)  # Enable CORS to allow frontend communication

# Route to schedule an appointment
@app.route('/api/schedule_appointment', methods=['POST'])
def schedule_appointment():
    data = request.get_json()  # Get the appointment data from the frontend
    if not data:
        return jsonify({'message': 'Invalid data'}), 400

    name = data.get('name')
    age = data.get('age')
    gender = data.get('gender')
    date = data.get('date')  # Ensure this is in 'YYYY-MM-DD' format
    time = data.get('time')  # Ensure this is in 'HH:MM:SS' format
    reason = data.get('reason')

    # Connect to the MySQL database
    conn = get_db_connection()
    cursor = conn.cursor()

    # Insert appointment data into the appointments table
    insert_query = """
    INSERT INTO appointments (name, age, gender, date, time, reason)
    VALUES (%s, %s, %s, %s, %s, %s)
    """
    cursor.execute(insert_query, (name, age, gender, date, time, reason))
    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({'message': 'Appointment scheduled successfully!'}), 200

if __name__ == '__main__':
    app.run(debug=True)