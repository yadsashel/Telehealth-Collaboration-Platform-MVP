import os
import sys
from datetime import datetime  # Correctly import datetime
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from flask import Flask, jsonify
from flask_cors import CORS
from config.database_config import get_db_connection

app = Flask(__name__)
CORS(app)  # Enable CORS for all origins

# Utility function to serialize database rows
def serialize_row(row):
    def format_datetime(dt):
        if isinstance(dt, datetime):
            return dt.strftime('%Y-%m-%d %H:%M:%S')
        return None

    return {
        'name': row[0],
        'age': row[1],
        'gender': row[2],
        'date': format_datetime(row[3]),
        'time': format_datetime(row[4]),
        'reason': row[5]
    }

# Route to get all consultations
@app.route('/api/get_consultations', methods=['GET'])
def get_consultations():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute('SELECT name, age, gender, date, time, reason FROM appointments')
        appointments = cursor.fetchall()

        conn.close()

        # Convert the appointments into a list of dictionaries
        appointments_list = [serialize_row(row) for row in appointments]

        return jsonify(appointments_list), 200
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'message': 'Error fetching consultations'}), 500

if __name__ == '__main__':
    app.run(port=5001, debug=True)
