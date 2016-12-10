/**
 * Created by Robert on 3-12-2016.
 */
var players = [
    {name: "player1", score: 0, ballGroup: "null"},
    {name: "player2", score: 0, ballGroup: "null"}
];

var simulationRunning;
var currentTurnNumber;
var ballsScored = [];
var turnHistoryData = [];

function GameController(){
    this.simulationRunning = false;
    this.currentTurnNumber = 1;
    this.currentPlayer = 1;

    //1 of meer ballen met breakshot erin, speler 1 mag kiezen
    //anders mag speler 2 kiezen

    /*
    fouls zijn o.a.:
    met
    de witte bal geen andere bal raken
    met
    de witte bal als eerste een bal van je tegenstander raken
    met
    de witte bal als eerste de zwarte bal raken
    een
    bal van tafel af spelen (anders dan in een pocket)
    */

}

GameController.prototype.Update = function (){
    if(this.currentPlayer != 1) {
        document.getElementById('arrow-right').style.borderRightColor = 'yellow';
        document.getElementById('arrow-left').style.borderLeftColor = 'black';
    }
    else if(this.currentPlayer == 1){
        document.getElementById('arrow-right').style.borderRightColor = 'black';
        document.getElementById('arrow-left').style.borderLeftColor = 'yellow';
    }

    document.getElementById("currentturn").innerHTML = "" + this.currentTurnNumber;


    /* //this is a test
var bool = true;
    if(this.currentTurnNumber == 5) {
        this.balls1solid();
        this.balls2solid();
    }
    if(this.currentTurnNumber == 2) {
        this.balls1striped();
        this.balls2striped();
    }

/*
    /*
    If player 1 has solidballs this:
            this.balls1solid();
    if player 1 has stripedballs this:
            this.balls1striped();
     if player 2 has solidballs this:
            this.balls2solid();
     if player 2 has stripedballs this:
            this.balls2striped();

    When black ball has to be potted, use the opposite, so if player2 has all striped balls in and pots the black ball then use this.balls2solid();
    balls1 spawns left, meant for player1.
    balls2 spawns right, meant for player2.

      */
    // removed this for new implementations
    // document.getElementById("currentplayer").innerHTML = "Player: " + this.currentPlayer;
    // document.getElementById("currentplayertarget").innerHTML = this.currentPlayer == 1 ? "Target: " + players[0].ballGroup : "Target: " + players[1].ballGroup;

    if (turnHistoryData.length == 0)
        turnHistoryData.push(new GameTurnData());

    if (this.simulationRunning == true){
        if(!BallsRoll()){
            //Turning simulation off
            this.simulationRunning = false;

            //Show collected turn data
            this.GetCurrentTurn().printData();

            //Decide what to do with collected turn info
            this.TurnEndHandler()
        }
    }
    else{
        if(BallsRoll()){
            //Turning simulation on
            this.simulationRunning = true;
        }
    }
}

GameController.prototype.TurnEndHandler = function(){
    var thisTurn = this.GetCurrentTurn();

    //for the breakshot turn
    if (thisTurn.turnNumber == 1){
        //if the player misses the breakshot
        console.log(thisTurn.GetBallsCollided().length);
        if (thisTurn.GetBallsCollided().length == 0){
            whiteball.Reset();
            return;
        }
        else{
            //if the player potted 1 or more balls
            if (thisTurn.GetBallsPotted().length > 0){
                this.AsignBallGroup(thisTurn); // asign the player to the group of the first potted ball (striped or solid)
                this.DeactivatePottedBalls();
            }
            else{
                this.NextPlayerTurn();
            }
        }
    }
    //for every turn after the breakshot
    else{
        //if the player does not pot any balls switch to other player OR if the player hits the wrong ballgroup first OR if the player hits the blackball first
        if (thisTurn.GetBallsPotted().length == 0){
            this.NextPlayerTurn();
        }
        //if the table is still 'open', and the player potted a ball, asign the player to the group of the first potted ball (striped or solid)
        else if (players[0].ballGroup == "null" || players[1].ballGroup == "null"){
            this.AsignBallGroup(thisTurn); // asign the player to the group of the first potted ball (striped or solid)
            this.DeactivatePottedBalls(thisTurn);
        }
        //if the table is 'closed'
        else{
            this.DeactivatePottedBalls(thisTurn);
        }
    }


    this.currentTurnNumber++;
    turnHistoryData.push(new GameTurnData()); //Create a new object to register turn data
}

GameController.prototype.DeactivatePottedBalls = function (turn){
    var tempBallsPotted = turn.GetBallsPotted();
    for(var i = 0; i < tempBallsPotted.length; i++) {
        if (tempBallsPotted[i].name == "whiteball"){
            tempBallsPotted[i].ball.position = new THREE.Vector3(0,0,0);//tempBallsPotted[i].defaultPos;
            continue;
        }

        tempBallsPotted[i].isPotted = true;
    }

}

GameController.prototype.GetCurrentTurn = function(){
    return turnHistoryData[this.currentTurnNumber - 1];
}

GameController.prototype.NextPlayerTurn = function (){
    this.currentPlayer = this.currentPlayer == 1 ? 2 : 1;
}

GameController.prototype.AsignBallGroup = function(turn){
    var ballsPotted = turn.GetBallsPotted();
    if (turn.currentPlayer == 1){
        players[0].ballGroup = ballsPotted[0].ballGroup;
        players[1].ballGroup = players[0].ballGroup == "striped" ? "solid" : "striped";
    }
    else{
        players[1].ballGroup = ballsPotted[0].ballGroup;
        players[0].ballGroup = players[0].ballGroup == "striped" ? "solid" : "striped";
    }

    //players[0].ballGroup = turn.currentPlayer == 1 ? turn.GetBallsPotted()[0].ballGroup : turn.GetBallsPotted()[1].ballGroup;
}

GameController.prototype.balls1solid = function (){
    var balls1 = document.createElement('div');
    balls1.className = 'balls1';
    var solid = document.createElement('div');
    solid.className = 'solid';
    balls1.appendChild(solid);
    document.getElementById('balls').appendChild(balls1);
}

GameController.prototype.balls1striped = function (){
    var balls1 = document.createElement('div');
    balls1.className = 'balls1';
    var stripedbg = document.createElement('div');
    var striped = document.createElement('div');
    stripedbg.className = 'striped-bg';
    striped.className = 'striped';
    balls1.appendChild(stripedbg);
    balls1.appendChild(striped);
    document.getElementById('balls').appendChild(balls1);
}

GameController.prototype.balls2solid = function (){
    var balls2 = document.createElement('div');
    balls2.className = 'balls2';
    var solid = document.createElement('div');
    solid.className = 'solid';
    balls2.appendChild(solid);
    document.getElementById('balls').appendChild(balls2);
}

GameController.prototype.balls2striped = function (){
    var balls2 = document.createElement('div');
    balls2.className = 'balls2';
    var stripedbg = document.createElement('div');
    var striped = document.createElement('div');
    stripedbg.className = 'striped-bg';
    striped.className = 'striped';
    balls2.appendChild(stripedbg);
    balls2.appendChild(striped);
    document.getElementById('balls').appendChild(balls2);
}
