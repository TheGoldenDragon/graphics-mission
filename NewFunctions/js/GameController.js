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

   // document.getElementById("currentplayer").innerHTML = "Player: " + this.currentPlayer;
    document.getElementById("currentturn").innerHTML = "" + this.currentTurnNumber;
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
