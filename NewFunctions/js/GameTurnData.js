/**
 * Created by Robert on 4-12-2016.
 */

var turnNumber;
var currentPlayer;
var ballsCollided = [];
var ballsPotted = [];

function GameTurnData(){
    this.turnNumber = gameController.currentTurnNumber;
    this.currentPlayer = gameController.currentPlayer;

    console.log("new");

    //1 of meer ballen met breakshot erin, speler 1 mag kiezen
    //anders mag speler 2 kiezen

    /*f
     ouls zijn o.a.:
     met
     de witte bal geen andere bal raken
     met
     de witte bal als eerste een bal van je tegenstander raken
     met
     de witte bal als eerste de zwarte bal raken
     */

}



GameTurnData.prototype.BallHit = function (sender, receiver){
    var info = { sender: sender.name, receiver: receiver.name}
    ballsCollided.push(info);
}

GameTurnData.prototype.BallPotted = function (ball){
    var info = { ball: ball.name}
    ballsPotted.push(info);
}

GameTurnData.prototype.AsignBallGroup = function(ballHit){

}

GameTurnData.prototype.GetBallsCollided = function(){
    return ballsCollided;
}

GameTurnData.prototype.GetBallsPotted = function(){
    return ballsPotted;
}

GameTurnData.prototype.printData = function(){
    console.log(this);
    console.log(ballsCollided);

}
