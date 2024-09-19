# db_config.py
import mysql.connector

def get_db_connection():
    connection = mysql.connector.connect(
        host='localhost',
        user='root',
        password='2002@Yad',
        database='telehealth_db'
    )
    return connection
