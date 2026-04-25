import os
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)

CORS(app, resources={r"/api/*": {"origins": "*"}})

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

if __name__ == "__main__":
    port = int(os.getenv("BACKEND_PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)