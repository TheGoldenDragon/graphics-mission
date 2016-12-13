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
    this.currentTurn = null;

    if(this.currentPlayer == 1) {
        document.getElementById('arrow-right').style.borderRightColor = 'black';
        document.getElementById('arrow-left').style.borderLeftColor = 'yellow';
    }
    else{
        document.getElementById('arrow-right').style.borderRightColor = 'yellow';
        document.getElementById('arrow-left').style.borderLeftColor = 'black';
    }

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

    document.getElementById("currentturn").innerHTML = "" + this.currentTurnNumber;
/*
    If player 1 has solidballs this:
            this.PottedLeftSolid();
    if player 1 has stripedballs this:
            this.PottedLeftStriped();
     if player 2 has solidballs this:
            this.PottedRightSolid();
     if player 2 has stripedballs this:
            this.PottedRightStriped();

    When black ball has to be potted, use the opposite, so if player2 has all striped balls in and pots the black ball then use this.balls2solid();
    balls1 spawns left, meant for player1.
    balls2 spawns right, meant for player2.

      */
    // removed this for new implementations
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
    this.currentTurn = this.GetCurrentTurn();
    var tempBallsPotted = this.currentTurn.GetBallsPotted();
    var tempBallsCollided = this.currentTurn.GetBallsCollided();

    //functions that only need to run once in this function
    var createNewTurn = true; //If false at end of function, do not create a new turn
    var checkPottedBalls = false; //If true at end of function, check all potted balls in the current turn

    //for the breakshot turn
    if (this.currentTurn.turnNumber == 1){
        //if the player misses the breakshot
        if (tempBallsCollided.length == 0){
            whiteball.Reset();
            createNewTurn = false;
        }
        else{
            //if the player potted 1 or more balls
            if (tempBallsPotted.length > 0){
                checkPottedBalls = true;
            }
            else{
                this.NextPlayerTurn();
            }
        }
    }
    //for every turn after the breakshot
    else{
        //Check for possible fouls when hitting balls
        if (tempBallsCollided.length > 0){
            //If the player has a ball group assigned
            if (players[this.currentPlayer - 1].ballGroup != "null"){
                //if the player hits the black ball first
                if (tempBallsCollided[0].receiver.name == "blackball")
                    this.NextPlayerTurn();
                //if the player hits the other ball group first (striped or solid)
                if (tempBallsCollided[0].receiver.ballGroup != players[this.currentPlayer - 1].ballGroup){
                    this.NextPlayerTurn();
                }
            }
        }

        //if the player does not pot any balls switch to other player
        if (tempBallsPotted.length == 0){
            this.NextPlayerTurn();
        }
        //if the player potted a ball
        else{
            checkPottedBalls = true;
        }
    }

    if (checkPottedBalls == true)
        this.CheckPottedBalls();

    if (createNewTurn == true){
        this.currentTurnNumber++;
        turnHistoryData.push(new GameTurnData()); //Create a new object to register turn data
    }
}

GameController.prototype.CheckPottedBalls = function(){
    var tempBallsPotted = this.currentTurn.GetBallsPotted();

    if (players[0].ballGroup == "null" || players[1].ballGroup == "null")
        this.AsignBallGroup();

    for(var i = 0; i < tempBallsPotted.length; i++) {
        if (tempBallsPotted[i].isPotted == true)
            continue;

        tempBallsPotted[i].isPotted = true;

        if (tempBallsPotted[i].name == "whiteball"){
            tempBallsPotted[i].Reset();
            continue;
        }
        if (tempBallsPotted[i].name == "blackball"){
            console.log(this.currentPlayer + " lost");
            continue;
        }

        //Add potted ball icons to UI
        if (tempBallsPotted[i].ballGroup == players[0].ballGroup){
            if (tempBallsPotted[i].ballGroup == "solid"){
                this.PottedLeftSolid();
            }
            else{
                this.PottedLeftStriped();
            }
        }
        else if (tempBallsPotted[i].ballGroup == players[1].ballGroup) {
            if (tempBallsPotted[i].ballGroup == "solid") {
                this.PottedRightSolid();
            }
            else {
                this.PottedRightStriped();
            }
        }
    }
}

GameController.prototype.GetCurrentTurn = function(){
    return turnHistoryData[this.currentTurnNumber - 1];
}

GameController.prototype.NextPlayerTurn = function (){
    this.currentPlayer = this.currentTurn.currentPlayer == 1 ? 2 : 1;

    if(this.currentPlayer == 1) {
        document.getElementById('arrow-right').style.borderRightColor = 'black';
        document.getElementById('arrow-left').style.borderLeftColor = 'yellow';
    }
    else{
        document.getElementById('arrow-right').style.borderRightColor = 'yellow';
        document.getElementById('arrow-left').style.borderLeftColor = 'black';
    }
}

GameController.prototype.AsignBallGroup = function(){
    var ballsPotted = this.currentTurn.GetBallsPotted();

    //if the first ball is the whiteball or the blackball

    if (this.currentTurn.currentPlayer == 1){
        players[0].ballGroup = ballsPotted[0].ballGroup;
        players[1].ballGroup = players[0].ballGroup == "striped" ? "solid" : "striped";
    }
    else{
        players[1].ballGroup = ballsPotted[0].ballGroup;
        players[0].ballGroup = players[0].ballGroup == "striped" ? "solid" : "striped";
    }
}

GameController.prototype.PottedLeftSolid = function (){
    var pottedLeft = document.createElement('div');
    pottedLeft.className = 'pottedLeft';
    var solid = document.createElement('div');
    solid.className = 'solid';
    pottedLeft.appendChild(solid);
    document.getElementById('pottedBalls').appendChild(pottedLeft);
}

GameController.prototype.PottedLeftStriped = function (){
    var pottedLeft = document.createElement('div');
    pottedLeft.className = 'pottedLeft';
    var stripedbg = document.createElement('div');
    var striped = document.createElement('div');
    stripedbg.className = 'striped-bg';
    striped.className = 'striped';
    pottedLeft.appendChild(stripedbg);
    pottedLeft.appendChild(striped);
    document.getElementById('pottedBalls').appendChild(pottedLeft);
}

GameController.prototype.PottedRightSolid = function (){
    var pottedRight = document.createElement('div');
    pottedRight.className = 'pottedRight';
    var solid = document.createElement('div');
    solid.className = 'solid';
    pottedRight.appendChild(solid);
    document.getElementById('pottedBalls').appendChild(pottedRight);
}

GameController.prototype.PottedRightStriped = function (){
    var pottedRight = document.createElement('div');
    pottedRight.className = 'pottedRight';
    var stripedbg = document.createElement('div');
    var striped = document.createElement('div');
    stripedbg.className = 'striped-bg';
    striped.className = 'striped';
    pottedRight.appendChild(stripedbg);
    pottedRight.appendChild(striped);
    document.getElementById('pottedBalls').appendChild(pottedRight);
}
