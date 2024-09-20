import os
import sys
from datetime import datetime, time, timedelta
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

    def format_time(time_obj):
        if isinstance(time_obj, time):
            # Convert time_obj to 12-hour format with AM/PM
            return time_obj.strftime('%I:%M %p')
        elif isinstance(time_obj, timedelta):
            # Handle if time_obj is a timedelta object
            total_seconds = int(time_obj.total_seconds())
            hours, remainder = divmod(total_seconds, 3600)
            minutes, _ = divmod(remainder, 60)
            return f'{hours:02}:{minutes:02}'  # Format as HH:MM
        return 'No time provided'

    return {
        'name': row[0],
        'age': row[1],
        'gender': row[2],
        'date': format_datetime(row[3]),
        'time': format_time(row[4]),  # Use format_time for time field
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