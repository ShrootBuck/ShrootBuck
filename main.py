import flask

app = flask.Flask(__name__, static_folder="app/dist/app", static_url_path="")


@app.route("/")
def index():
    return flask.send_from_directory("app/dist/app", "index.html")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=False)
