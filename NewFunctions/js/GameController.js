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
    {value: 1, name: "ball1"},
    {value: 2, name: "ball2"},
    {value: 3, name: "ball3"},
    {value: 4, name: "ball4"},
    {value: 5, name: "ball5"},
    {value: 6, name: "ball6"},
    {value: 7, name: "ball7"}
];

var solidBallTargets = [
    {value: 9, name: "ball9"},
    {value: 10, name: "ball10"},
    {value: 11, name: "ball11"},
    {value: 12, name: "ball12"},
    {value: 13, name: "ball13"},
    {value: 14, name: "ball14"},
    {value: 15, name: "ball15"}
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
        //if the player misses the breakshot he has to retry
        if (thisTurn.GetBallsCollided().length == 0){
            return; // prevents going to a new turn
        }
        else{
            //if the player potted 1 or more balls
            if (thisTurn.GetBallsPotted().length > 0){
                this.AsignBallGroup(); // asign the player to the group of the first potted ball (striped or solid)

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

        }
        //if the table is 'closed'
        else{

        }
    }
    this.currentTurnNumber++;
    turnHistoryData.push(new GameTurnData()); //Create a new object to register turn data
}

GameController.prototype.GetCurrentTurn = function(){
    return turnHistoryData[this.currentTurnNumber - 1];
}

GameController.prototype.NextPlayerTurn = function (){
    this.currentPlayer = this.currentPlayer == 1 ? 2 : 1;
}


GameController.prototype.AsignBallGroup = function(ballHit){

}
