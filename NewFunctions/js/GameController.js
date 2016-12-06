/**
 * Created by Robert on 3-12-2016.
 */
var players = [
    {name: "player1", score: 0},
    {name: "player2", score: 0}
];

var simulationRunning;
var currentTurnNumber;
var ballsScored = [];
var turnHistoryData = [];

var stripedBallTargets = [
    {value: 1, name: "ball1", potted: "no"},
    {value: 2, name: "ball2", potted: "no"},
    {value: 3, name: "ball3", potted: "no"},
    {value: 4, name: "ball4", potted: "no"},
    {value: 5, name: "ball5", potted: "no"},
    {value: 6, name: "ball6", potted: "no"},
    {value: 7, name: "ball7", potted: "no"}
];

var solidBallTargets = [
    {value: 9, name: "ball9", potted: "no"},
    {value: 10, name: "ball10", potted: "no"},
    {value: 11, name: "ball11", potted: "no"},
    {value: 12, name: "ball12", potted: "no"},
    {value: 13, name: "ball13", potted: "no"},
    {value: 14, name: "ball14", potted: "no"},
    {value: 15, name: "ball15", potted: "no"}
];

var player1Target;
var player2Target;

function GameController(){
    this.simulationRunning = false;
    this.currentTurnNumber = 1;
    this.currentPlayer = 1;
    this.player1Target = null;
    this.player2Target = null;


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
    document.getElementById("currentplayer").innerHTML = "Player: " + this.currentPlayer;
    document.getElementById("currentturn").innerHTML = "Turn: " + this.currentTurnNumber;
    document.getElementById("currentplayertarget").innerHTML = this.currentPlayer == 1 ? "Target: " + this.player1Target : "Target: " + this.player2Target;

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
        if (thisTurn.GetBallsCollided().length == 0){
            if (thisTurn.GetBallsPotted().length == 0)
                return; // prevents going to a new turn
            else{}
                //resetWhiteBall
        }
        else{
            //if the player potted 1 or more balls
            if (thisTurn.GetBallsPotted().length > 0){
                this.AsignBallGroup(); // asign the player to the group of the first potted ball (striped or solid)
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
        else if (this.player1Target == null || this.player2Target == null){
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
    console.log(turn)
    var tempBallsPotted = turn.GetBallsPotted();
    console.log(tempBallsPotted);
    for(i = 0; i < tempBallsPotted.length; i++) {

        for (n = 0; n < solidBallTargets.length; n++) {
            if (tempBallsPotted[i].name == solidBallTargets[n].name){
                solidBallTargets[n].potted = "yes";
                console.log(tempBallsPotted[i].potted);
            }
            console.log(tempBallsPotted[i].name + " " + solidBallTargets[n].name);
        }

        for (n = 0; n < stripedBallTargets.length; n++) {
            if (tempBallsPotted[i].name == stripedBallTargets[n].name){
                stripedBallTargets[n].potted = "yes";
                console.log(tempBallsPotted[i].potted);
            }
            console.log(tempBallsPotted[i].name + " " + solidBallTargets[n].name);

        }
    }

}

GameController.prototype.GetCurrentTurn = function(){
    return turnHistoryData[this.currentTurnNumber - 1];
}

GameController.prototype.NextPlayerTurn = function (){
    this.currentPlayer = this.currentPlayer == 1 ? 2 : 1;
}


GameController.prototype.AsignBallGroup = function(ballHit){

}