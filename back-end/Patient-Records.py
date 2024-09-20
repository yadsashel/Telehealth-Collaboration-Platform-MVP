import os
import sys
from datetime import datetime, time
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from flask import Flask, jsonify, request
from flask_cors import CORS
from config.database_config import get_db_connection  # Your database config

app = Flask(__name__)
CORS(app)

def serialize_row(row):
    return {
        'name': row[0],
        'age': row[1],
        'gender': row[2],
        'date': row[3].strftime('%Y-%m-%d') if isinstance(row[3], datetime) else None,
        'time': row[4].strftime('%I:%M %p') if isinstance(row[4], time) else 'No time provided',
        'reason': row[5]
    }

@app.route('/api/get_patient_records', methods=['GET'])
def get_patient_records():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute('SELECT name, age, gender, date, time, reason FROM appointments')
        records = cursor.fetchall()

        conn.close()

        # Convert records into a list of dictionaries
        records_list = [serialize_row(row) for row in records]

        return jsonify(records_list), 200
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'message': 'Error fetching patient records'}), 500

@app.route('/api/update_patient_record', methods=['POST'])
def update_patient_record():
    data = request.get_json()
    if not data:
        return jsonify({'message': 'Invalid data'}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        update_query = """
        UPDATE appointments
        SET name = %s, age = %s, gender = %s, date = %s, time = %s, reason = %s
        WHERE id = %s
        """
        cursor.execute(update_query, (data['name'], data['age'], data['gender'], data['date'], data['time'], data['reason'], data['id']))
        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({'message': 'Patient record updated successfully!'}), 200
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'message': 'Error updating patient record'}), 500

if __name__ == '__main__':
    app.run(port=5001, debug=True)