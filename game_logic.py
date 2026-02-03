import random

SITUATIONS = [
    {
        "map": "ascent",
        "text": "1v2 post-plant on Ascent (A site)",
        "weapon": "Vandal",
        "abilities": ["Smoke", "Flash"],
        "ideal_path": ["smoke", "push", "peek", "hold"]
    },
    {
        "map": "bind",
        "text": "Eco retake on Bind (B site)",
        "weapon": "Spectre",
        "abilities": ["Flash"],
        "ideal_path": ["flash", "push", "plant", "hold"]
    },
    {
        "map": "haven",
        "text": "1v1 clutch on Haven (C site)",
        "weapon": "Phantom",
        "abilities": ["Smoke"],
        "ideal_path": ["smoke", "tap", "peek", "hold"]
    }
]

STEP_FEEDBACK = {
    "smoke": "Good vision control.",
    "flash": "Creates advantage.",
    "push": "Strong aggression.",
    "peek": "Risky but impactful.",
    "plant": "Objective secured.",
    "hold": "Smart time play.",
    "tap": "Forces enemy reaction."
}

def get_situation():
    return random.choice(SITUATIONS)

def evaluate_path(player_path, ideal_path):
    score = 0
    feedback = []

    for i, step in enumerate(player_path):
        feedback.append(STEP_FEEDBACK.get(step, "Risky move."))
        if i < len(ideal_path) and step == ideal_path[i]:
            score += 25

    if score >= 75:
        result = "🔥 GREAT PLAY – CLUTCH WON"
        ending = "win"
    elif score >= 50:
        result = "⚠ DECENT PLAY"
        ending = "win"
    else:
        result = "❌ ROUND LOST"
        ending = "fail"

    return score, result, feedback, ending
