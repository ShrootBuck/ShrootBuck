import flask, os

app = flask.Flask(
    __name__, static_url_path="/", static_folder="dist/shroot-buck/browser"
)


@app.errorhandler(404)
def notFound(error):
    return flask.send_from_directory("dist/shroot-buck/browser", "index.html")


@app.after_request
def add_no_cache_headers(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "0"
    return response


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
