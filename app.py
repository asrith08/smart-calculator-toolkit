from flask import Flask, render_template, send_from_directory, make_response
app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")


@app.route('/sw.js')
def serve_sw():
    return send_from_directory(app.root_path, 'sw.js', mimetype='application/javascript')
    response = make_response(send_from_directory('.', 'sw.js'))
    response.headers['Content-Type'] = 'application/javascript'
    return response

@app.route('/manifest.json')
def serve_manifest():
    return send_from_directory('.', 'manifest.json')

if __name__ == "__main__":
    app.run(debug=True)