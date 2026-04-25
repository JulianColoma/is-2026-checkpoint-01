import os
import psycopg2
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)

CORS(app, resources={r"/api/*": {"origins": "*"}})

DB_CONFIG = {
    "host": "database",
    "port": int(os.getenv("DB_PORT", 5432)),
    "user": os.getenv("DB_USER"),
    "password": os.getenv("DB_PASSWORD"),
    "dbname": os.getenv("DB_NAME"),
}

def get_db_connection():
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        return conn
    except psycopg2.Error as e:
        print(f"Error de conexión a la base de datos: {e}")
        return None

@app.route("/api/health", methods=["GET"])
def health_check():
    return jsonify({
        "status": "healthy",
        "service": "teamboard-backend",
        "message": "El servicio está activo"
    }), 200
    
@app.route("/api/info", methods=["GET"])
def get_info():
    return jsonify({
        "service": "teamboard-backend",
        "version": "1.0.0",
        "description": "API REST para TeamBoard App",
        "endpoints": [
            "/api/health",
            "/api/team",
            "/api/info"
        ],
        "maintainer": "Hajime Shiroma"
    }), 200
    
@app.route("/api/team", methods=["GET"])
def get_team():
    conn = get_db_connection()
    if conn is None:
        return jsonify({
            "error": "No se pudo conectar a la base de datos",
            "team": []
        }), 503
    try:
        cursor = conn.cursor()
        cursor.execute("SELECT nombre, apellido, legajo, feature, servicio, estado FROM members ORDER BY legajo")
        rows = cursor.fetchall()
        members = []
        for row in rows:
            members.append({
                "nombre": row[0],
                "apellido": row[1],
                "legajo": row[2],
                "feature": row[3],
                "servicio": row[4],
                "estado": row[5]
            })
        cursor.close()
        conn.close()
        return jsonify(members), 200
    except psycopg2.Error as e:
        print(f"Error al consultar la base de datos: {e}")
        return jsonify([]), 500

if __name__ == "__main__":
    port = int(os.getenv("BACKEND_PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)