const ctx = document.getElementById("canvas").getContext("2d");
const r3 = Math.sqrt(3);
const positions = [
    [130, 200, 270].map(a => [a, 200 - 70 * r3]),
    [95, 165, 235, 305].map(a => [a, 200 - 35 * r3]),
    [60, 130, 200, 270, 340].map(a => [a, 200]),
    [95, 165, 235, 305].map(a => [a, 200 + 35 * r3]),
    [130, 200, 270].map(a => [a, 200 + 70 * r3])
];
const colors = {
    0: "#232",
    2: "#454",
    4: "#676", // 6-7!!!
    8: "#595",
    16: "#4a4",
    32: "#2a2",
    64: "#550",
    128: "#740",
    256: "#930",
    512: "#906",
    1024: "#737",
    2048: "#a0a",
    4096: "#33a",
    8192: "#388",
    16384: "#883"
};
const keys = ["KeyD", "KeyX", "KeyZ", "KeyA", "KeyW", "KeyE"];

ctx.font = "12px monospace";
ctx.textAlign = "center";
ctx.textBaseline = "middle";

var tiles = [
      [0,0,0],
     [0,0,2,0],
    [0,0,0,0,0],
     [0,2,0,0],
      [0,0,0]
];

if(!localStorage.score) localStorage.score = "0";
if(!localStorage.game) localStorage.game = JSON.stringify(tiles);
if(!localStorage.best) localStorage.best = "0";
var playerScore = parseInt(localStorage.score);
var best = parseInt(localStorage.best);
tiles = JSON.parse(localStorage.game);

function slide(row) {
    var len = row.length;
    row = row.filter(a => a);
    for(var i = row.length - 1; i >= 0; i--) {
        if(row[i] == row[i - 1]) {
            row[i] *= 2;
            row.splice(i - 1, 1);
            i--;
        }
    }
    return [...new Array(len - row.length).fill(0), ...row];
}

function rotate(b) { // b is for board, but i'll type it a lot
    return [
        [b[2][0], b[1][0], b[0][0]],
        [b[3][0], b[2][1], b[1][1], b[0][1]],
        [b[4][0], b[3][1], b[2][2], b[1][2], b[0][2]],
        [b[4][1], b[3][2], b[2][3], b[1][3]],
        [b[4][2], b[3][3], b[2][4]]
    ]
}

const slideAll = (board) => board.map(slide);

function score(board) {
    let total = 0;
    for(var row of board) {
        row = row.filter(a => a);
        for(var i = 0; i < row.length - 1; i++) {
            if(row[i] == row[i + 1]) {
                total += row[i];
                i++;
            }
        }
    }
    return 2 * total;
}
function circle(x, y, color) {
    ctx.fillStyle = color || "black";
    ctx.beginPath();
    ctx.arc(x, y, (color == "#232" ? 32 : 30), 0, 2 * Math.PI);
    ctx.fill()
}

function display() {
    ctx.fillStyle = "#020";
    ctx.fillRect(0, 169, 400, 62);
    for(var i = 0; i < 5; i++) {
        for(var j = 0; j < tiles[i].length; j++) {
            var pos = positions[i][j];
            circle(pos[0], pos[1], "#454");
            if(tiles[i][j] == 0) continue;
            circle(pos[0], pos[1], colors[tiles[i][j]]);
            ctx.fillStyle = "white";
            ctx.fillText(tiles[i][j], pos[0], pos[1]);
        }
    }
    document.getElementById("score").textContent = playerScore;
    document.getElementById("best").textContent = best;
}

function checkGameOver() {
    let b = structuredClone(tiles);
    for(var i = 0; i < 6; i++) {
        b = rotate(b);
        if(JSON.stringify(slideAll(b)) != JSON.stringify(b)) return false;
    }
    return true;
}

function play(rc) { // Rotation count
    for(var i = 0; i < 6 - rc; i++) {
        tiles = rotate(tiles);
    }

    if(JSON.stringify(tiles) != JSON.stringify(slideAll(tiles))) {
        playerScore += score(tiles);
        localStorage.score = playerScore;
        if(playerScore > best) {
            best = playerScore;
            localStorage.best = playerScore;
        }
        tiles = slideAll(tiles);
        var empty = [];
        for(var i = 0; i < tiles.length; i++) {
            for(var j = 0; j < tiles[i].length; j++) {
                if(tiles[i][j] == 0) empty.push([i, j]);
            }
        }
        var place = empty[Math.floor(Math.random() * empty.length)];
        tiles[place[0]][place[1]] = (Math.random() < 0.1 ? 4 : 2);
    }

    for(var i = 0; i < rc; i++) {
        tiles = rotate(tiles);
    }
    localStorage.game = JSON.stringify(tiles);
    display();
    if(checkGameOver()) setTimeout(() => {
        ctx.fillStyle = "#020";
        ctx.fillRect(0, 169, 400, 62);
        ctx.fillStyle = "white";
        ctx.fillText("Game Over!", 200, 200);
    }, 2000);
}

document.addEventListener("keydown", (e) => {
    if(keys.includes(e.code)) play(keys.indexOf(e.code));
})

display();

function toggle(b) {
    document.getElementById("game").style.display = b ? "none" : "block";
    document.getElementById("help").style.display = b ? "block" : "none";
}

function reset() {
    if(confirm("Are you sure?")) tiles = [
        [0,0,0],
        [0,0,2,0],
        [0,0,0,0,0],
        [0,2,0,0],
        [0,0,0]
    ];
    localStorage.game = JSON.stringify(tiles);
    localStorage.score = 0;
    playerScore = 0;
    display();
}