from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/")
def index():
    return "API alpha version!"

@app.route("/users")
def users():
    users = [
        {"id": 1, "name": "John Doe"},
        {"id": 2, "name": "Jane Doe"},
    ]
    return jsonify(users)

if __name__ == "__main__":
    app.run(debug=True)
