from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)  

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/contactDB")
client = MongoClient(MONGO_URI)
db = client["contactDB"]
collection = db["messages"]

@app.route("/submit", methods=["POST"])
def submit():
    try:
        data = request.json
        name = data.get("name")
        email = data.get("email")
        message = data.get("message")

        if not name or not email or not message:
            return jsonify({"success": False, "message": "All fields are required"}), 400

        collection.insert_one({"name": name, "email": email, "message": message})
        return jsonify({"success": True, "message": "Message received!"}), 201

    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
