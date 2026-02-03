from flask import Flask, render_template, request, jsonify
from game_logic import get_situation, evaluate_path

app = Flask(__name__)
current_situation = get_situation()

@app.route("/")
def home():
    return render_template("index.html", situation=current_situation)

@app.route("/evaluate", methods=["POST"])
def evaluate():
    data = request.json
    score, result, feedback, ending = evaluate_path(
        data["path"],
        current_situation["ideal_path"]
    )
    return jsonify({
        "score": score,
        "result": result,
        "feedback": feedback,
        "ending": ending
    })

@app.route("/next")
def next_round():
    global current_situation
    current_situation = get_situation()
    return jsonify(current_situation)

if __name__ == "__main__":
    app.run(debug=False)
