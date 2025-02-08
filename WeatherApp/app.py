from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

API_KEY = "ff1804e2f9ad42c9952151316250601"

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/get_weather', methods=['POST'])
def get_weather():
    location = request.json.get('location')
    if not location:
        return jsonify({"error": "Location is required"}), 400

    url = "http://api.weatherapi.com/v1/current.json"
    params = {
        "key": API_KEY,
        "q": location
    }
    
    response = requests.get(url, params=params)

    if response.status_code == 200:
        data = response.json()
        return jsonify({
            "location": data["location"]["name"],
            "temperature": data["current"]["temp_c"],
            "condition": data["current"]["condition"]["text"]
        })
    else:
        return jsonify({"error": "Failed to fetch weather data"}), response.status_code

if __name__ == '__main__':
    app.run(debug=True)


