/* ========== MODE SWITCH ========== */
function showMode(mode) {
    document.getElementById("strategy-mode").style.display =
        mode === "strategy" ? "block" : "none";
    document.getElementById("aim-mode").style.display =
        mode === "aim" ? "block" : "none";
}

/* ========== STRATEGY MODE ========== */
let path = [];

function hideAllImages() {
    document.querySelectorAll("#action-box img")
        .forEach(img => img.style.display = "none");
}

function showImage(step) {
    hideAllImages();
    const img = document.getElementById(`img-${step}`);
    if (img) img.style.display = "block";
}

function choose(step) {
    if (path.length >= 5) return;
    path.push(step);
    showImage(step);

    document.getElementById("path").innerHTML =
        "<b>Your Plan:</b> " + path.join(" → ");
}

function finish() {
    fetch("/evaluate", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({path})
    })
    .then(res => res.json())
    .then(data => {
        showImage(data.ending);

        document.getElementById("result").innerHTML = `
            <p><b>${data.result}</b></p>
            <p>Score: ${data.score} / 100</p>
            <ul>${data.feedback.map(f => `<li>${f}</li>`).join("")}</ul>
        `;
    });
}

function replayStrategy() {
    path = [];
    hideAllImages();
    document.getElementById("path").innerHTML = "";
    document.getElementById("result").innerHTML = "";
}

/* ========== AIM PRACTICE (30s, FIXED) ========== */
let hits = 0;
let spawnInterval = null;
let gameTimeout = null;

function startAim() {
    const area = document.getElementById("aim-area");
    area.innerHTML = "";
    hits = 0;
    document.getElementById("hits").innerText = hits;

    clearInterval(spawnInterval);
    clearTimeout(gameTimeout);

    spawnInterval = setInterval(spawnTarget, 700);

    gameTimeout = setTimeout(endAimGame, 30000);
}

function spawnTarget() {
    const area = document.getElementById("aim-area");
    if (!area) return;

    const target = document.createElement("div");
    target.className = "target";

    const maxX = area.clientWidth - 30;
    const maxY = area.clientHeight - 30;

    target.style.left = Math.random() * maxX + "px";
    target.style.top = Math.random() * maxY + "px";

    const timeout = setTimeout(() => {
        target.remove();
    }, 2000);

    target.onclick = () => {
        clearTimeout(timeout);
        target.remove();
        hits++;
        document.getElementById("hits").innerText = hits;
    };

    area.appendChild(target);
}

function endAimGame() {
    clearInterval(spawnInterval);

    document.getElementById("aim-area").innerHTML = `
        <h3>🎯 Time's Up!</h3>
        <p><b>Final Score:</b> ${hits}</p>
        <p>Click Start / Replay to try again</p>
    `;
}
