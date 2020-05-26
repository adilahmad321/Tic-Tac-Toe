var boxes = document.getElementsByClassName("box");
var isMultiplayer = true;
var isCompTurn = true;

var situation = [];
var turn = (id, player) => {
    situation[id] = player;
    return result();
}
var result = () => {
    let curr = true;
    if (!player){
        curr = false;
    }
    if (situation[0] == curr){
        if (situation[1] == curr){
            if (situation[2] == curr){
                return true;
            }
        }
        if (situation[3] == curr){
            if (situation[6] == curr){
                return true;
            }
        }
        if (situation[4] == curr){
            if (situation[8] == curr){
                return true;
            }
        }
    }
    if (situation[1] == curr){
        if (situation[4] == curr){
            if (situation[7] == curr){
                return true;
            }
        }
    }
    if (situation[2] == curr){
        if (situation[5] == curr){
            if (situation[8] == curr){
                return true;
            }
        }
        if (situation[4] == curr){
            if (situation[6] == curr){
                return true;
            }
        }
    }
    if (situation[3] == curr){
        if (situation[4] == curr){
            if (situation[5] == curr){
                return true;
            }
        }
    }
    if (situation[6] == curr){
        if (situation[7] == curr){
            if (situation[8] == curr){
                return true;
            }
        }
    }
    return false;
}
var isTie = () => {
    for (var c = 0; c < 9; c++){
        if (availability(c)){
            return false;
        }   
    }
    return true;
}
var availability = (n) => {
    if (situation[n] == null){
        return true;
    }
}
var reset = () => {
    for (var i = 0; i < 9; i++){
        situation[i] = null;
        boxes[i].innerHTML = "";
    }
}

var player = true;
var resultOutput = document.getElementById("result");
for (var i = 0; i < 9; i++){
    boxes[i].classList.add("text-center");
    boxes[i].addEventListener("click", (e) => {
        let id = e.target.id.substr(1);
        if (isMultiplayer){
            if (availability(id)){
                let move, name;
                if (player){
                    move = "X";
                }
                else{
                    move = "O";
                }
                e.target.innerHTML = move;
                if(turn(id, player)){
                    if (player){
                        name = "Player 1";
                    }
                    if (!player){
                        name = "Player 2";
                    }
                    resultOutput.innerHTML = name + " has WON !";
                    for (var i = 0; i < 9; i++){
                        turn(i, "GameOver");
                    }
                }
                else if (isTie()){
                    resultOutput.innerHTML = "It's a Tie";
                }
                if (player){
                    player = false;
                }
                else {
                    player = true;
                }
            }
        }
        else{
            if (availability(id)){
                player = false;
                e.target.innerHTML = "O";
                if(turn(id, player)){
                    result.innerHTML = "Player has Won !";
                    for (var i = 0; i < 9; i++){
                        turn(i, "GameOver");
                    }
                }
                else{
                    isCompTurn = true;
                    vsComputer();
                }
            }
        }
    });
}

var multiplayer = document.getElementById("multi");
multiplayer.checked = true;
var playagain = document.getElementById("again");
playagain.addEventListener("click", () => {
    if (multiplayer.checked){
        reset();
        resultOutput.innerHTML = "";
        player = true;
    }
    else{
        reset();
        resultOutput.innerHTML = "";
        isMultiplayer = false;
        vsComputer();
    }
});

function vsComputer(){ 
    let move;
    player = true;
    let bestScore = -Infinity;
    for (var b = 0; b < 9; b++){
        if (availability(b)){
            turn(b, player);
            let score = minimax(false);
            turn(b, null);
            if (score > bestScore){
                bestScore = score;
                move = b;
            }
        }
    }
    player = true;
    boxes[move].innerHTML = "X";
    if (turn(move, player)){
        resultOutput.innerHTML = "Computer has Won !";
        for (var i = 0; i < 9; i++){
            turn(i, "GameOver");
        }
    }
    isCompTurn = false;
}

let scores = {"X": 1, "O": -1, "Tie": 0}

function minimax(isMaximizing){
    let output = result();
    if (isTie()){
        return scores["Tie"];
    }
    if (output){
        if(player){
            return scores["X"];
        }
        else{
            return scores["O"];
        }
    }
    if (isMaximizing){
        player = true;
        let bestScore = -Infinity;
        for (var d = 0; d < 9; d++){
            if (availability(d)){
                turn(d, player);
                let score = minimax(false);
                turn(d, null);
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    }
    else {
        player = false;
        let bestScore = Infinity;
        for (var e = 0; e < 9; e++){
            if (availability(e)){
                turn(e, player);
                let score = minimax(true);
                turn(e, null);
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}