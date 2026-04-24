import os
from flask import Flask, jsonify
from flask_cors import CORS
import psycopg2

app = Flask(__name__)
CORS(app) 

def get_db_connection():
    conn = psycopg2.connect(
        host=os.environ.get('POSTGRES_HOST'),
        database=os.environ.get('POSTGRES_DB'),
        user=os.environ.get('POSTGRES_USER'),
        password=os.environ.get('POSTGRES_PASSWORD')
    )
    return conn

@app.route('/api/health')
def health():
    return jsonify({"status": "active"})

@app.route('/api/info')
def info():
    return jsonify({"service": "backend", "version": "1.0"})

@app.route('/api/team')
def get_team():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM members;')
    members = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(members)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)