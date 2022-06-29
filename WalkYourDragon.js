//Set variables to be used by game loop
var FPS = 10, now, then = Date.now(), interval = 1000/FPS, delta;

//Set variables to be used by game
var gameSpeed = 1, gameCount = 0, highscore = 0;

if(!isNaN(parseInt(localStorage.getItem("score")))) {
    gameCount = parseInt(localStorage.getItem("score"))   
}

events = [
    ["I'm hungry.", "Here's some food"],
    ["I don't want to walk anymore!", "C'mon let's go!"],
    ["I'm just trolling you", "Silly Hydro"],
    ["I saw gbrie in the distance", "AYO"],
    ["I got distracted by some new alpha", "Fair"],
    ["I got distracted by Fujin", "Classic"],
    ["I stopped to watch Kurama Gang go by", "Gang gang"],
    ["I have a stone in my shoe", "Sort it out"],
    ["My shoe laces are untied", "You don't have shoes"],
    ["I was frozen by True Dragon Arctic", "Get warm"],
    ["I'm too scared to continue", "You got this!"],
    ["I'm loafing about", "Stop it!"],
    ["I want to take it slower", "Okay"],
    ["I want to walk a bit faster", "Sure"],
    ["I'm lost...", "I know the way"],
    ["I want to go shopping", "No time"],
    ["Wen?", "Soon"],
    ["Can the devs do something?", "Yeah"],
    ["What's the gas price", "Very low!"],
    ["What's the gas price", "Wow its high"],
    ["What's the gas price", "Pretty normal"],
    ["I'm judging your hidden folder", "Oh no"],
    ["I'm degening into a free mint", "Not now"],
    ["I'm doing my own research", "Good Dragon"],
    ["I need to go to the toilet", "Wut"],
    ["I'm lonely", "You got me"],
    ["I'm excited for pixel to launch", "Me too!"],
    ["I'm excited for 3D suits", "Soon"],
    ["I found a Doodle in my wallet after NFT NYC", "hmm.."],
    ["I can hear faint crying in the distance", "Okay.."],
    ["I can hear a creepy laugh nearby", "Okay.."],
    ["Which came first, the universe or Fujin?", "Deep"],
    ["I think I just saw Kurama v2 fly overhead", "Sure"],
    ["Can I moonwalk the rest of the way", "No"],
    ["I'm just polishing my chip collection", "Cute"],
    ["I miss Berserk", "Me too"],
    ["My feet hurt", "Get a grip"],
    ["I just heard a twig break nearby", "Probably nothing"],
    ["How high can jump?", "Not very"],
    ["How low can I go?", "Limbo"],
    ["What's up?", "The sky"],
    ["I'm scared of King Omni", "Me too"],
    ["I don't want to join Undead's legoin", "It won't be so bad"],
    ["Where did the anomalies come from?", "No idea"],
    ["Are Fujin and Anubis siblings?", "Dunno"],
    ["Where are the other True Dragons?", "Chilling"],
    ["Are we there yet?", "No"],
    ["How much further?", "Far"],
    ["USGMEN is cool", "Sure is"],
    ["Is it FAM FRIDAY yet?", "Retweet"],
    ["Are you part of the Monster Suit discord?", "Is this advertising?"]
]


class dragon {
    constructor() {
        this.sprite = document.getElementById("dragonImage")
        this.spriteList = [
            "0.png",
            "1.png",
            "2.png"
        ]
        this.currentSprite = 0;
        this.sprite.src = this.currentSprite + ".png"
        this.state = "IDLE"
    }
    switchState() {
        if(this.state == "IDLE") {
            this.startWalking()
        }
        else if(this.state == "WALKING") {
            this.stopWalking()
        }
    }
    stopWalking() {
        this.state = "IDLE"
        this.currentSprite = 0
        this.sprite.src = this.currentSprite + ".png"

        localStorage.setItem("score", gameCount.toString())

        let x = events[Math.floor(Math.random() * events.length)]
        document.getElementById("eventText").innerText = x[0]
        document.getElementById("eventAction").innerText = x[1]

        document.getElementById("eventHidden").id = "eventVisible"
    }
    startWalking() {
        this.state = "WALKING"
        this.currentSprite = 1
        FPS++;
        document.getElementById("eventVisible").id = "eventHidden"
    }
    draw() {
        this.sprite.src = this.currentSprite + ".png"
        if(this.state == "WALKING") {
            if(this.currentSprite == 1) {
                this.currentSprite = 2
            }
            else {
                this.currentSprite = 1
            }
        }
    }
    update() {
        if(this.state == "WALKING") {
            gameCount += 1;
            if((Math.random() * FPS*3) > FPS*3 - 2) {
                this.stopWalking()
            }
        }  
    }

}

var hydro = new dragon();

function updateHighscore() {
    if((gameCount/60) > highscore) {
        highscore = Math.floor(gameCount/60);
        localStorage.setItem('highscore', highscore);
        document.getElementById("highscore").innerHTML = highscore;
    }
}

function preloadImage(url)
{
    var img=new Image();
    img.src=url;
}

//Set up game
function initGame() {
    highscore = localStorage.getItem('highscore');
    document.getElementById("highscore").innerHTML = highscore;

    preloadImage("0.png")
    preloadImage("1.png")
    preloadImage("2.png")

    drawGame();
}
  
//Draw the game
function drawGame() {
    requestAnimationFrame(drawGame);
    now = Date.now();
    delta = now - then;
    if (delta > interval) {
        hydro.draw();
        
        updateGame();
        then = now - (delta % interval);
    }
}
  
//Update the game
function updateGame() {
    hydro.update();
    document.getElementById("score").innerHTML = Math.floor(gameCount) + " steps"
}

function TestLog() {
    console.log("TEST")
}
  
//Start the game
window.onload = initGame();
