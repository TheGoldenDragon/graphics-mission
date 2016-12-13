/**
 * Created by robert on 09-Dec-16.
 */

var name;
var defaultPos;
var ballGroup;
var isPotted;

function Ball(name, ballGroup, texture, position) // Constructor
{
    this.ball = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 20));
    this.ball.material = texture;
    this.ball.position.x = position.x;
    this.ball.position.y = position.y;
    this.ball.position.z = position.z;
    this.ball.speed = 0;
    this.ball.rotation.y = -1.5;
    this.ball.receiveShadow = true;
    this.ball.castShadow = true;

    this.defaultPos = new THREE.Vector3(position.x,position.y,position.z);
    this.direction = new THREE.Vector3(0, 0, 0);
    this.name = name;
    this.ballGroup = ballGroup;
    this.isPotted = false;

    scene.add(this.ball);
}

Ball.prototype.Reset = function(){
    this.ball.position.x = this.defaultPos.x;
    this.ball.position.y = this.defaultPos.y;
    this.ball.position.z = this.defaultPos.z;

    this.ball.speed = 0;
    this.ball.rotation.y = -1.5;
    this.direction = new THREE.Vector3(0, 0, 0);

    this.isPotted = false;
}


Ball.prototype.CalculateSpeed = function(){
    if (this.ball.speed > 0) {
        this.ball.speed -= 0.1;
    }
    if (this.ball.speed <= 0){
        this.ball.speed = 0;
        this.direction = new THREE.Vector3(0,0,0);
    }
}

Ball.prototype.OutOfBounds = function(){
    //Check if the ball is near any border
    if (this.ball.position.z < 40.6 && this.ball.position.z > -41.1 && this.ball.position.x < 22 && this.ball.position.x > -22)
        return; //if not, return

    //Left border
    if (this.ball.position.x < -22){
        if ((this.ball.position.z > 0.9 && this.ball.position.z < 40.1) || (this.ball.position.z > -40.6 && this.ball.position.z < -1.6)){
            if (this.direction.x < 0)
                this.direction.x *= -1; //right
            this.ball.speed *= 0.75;

            return;
        }
    }
    //Right border
    if (this.ball.position.x > 22){
        if ((this.ball.position.z > 0.9 && this.ball.position.z < 40.1) || (this.ball.position.z > -40.6 && this.ball.position.z < -1.6)){
            if (this.direction.x > 0)
                this.direction.x *= -1; //left
            this.ball.speed *= 0.75;

            return;
        }
    }

    //Top border
    if (this.ball.position.z < -41.1){
        if (this.ball.position.x > -21.1 && this.ball.position.x < 20.7){
            if (this.direction.z < 0)
                this.direction.z *= -1; //down
            this.ball.speed *= 0.75;

            return;
        }
    }

    //Bottom border
    if (this.ball.position.z > 40.6){
        if (this.ball.position.x > -21.1 && this.ball.position.x < 20.7){
            if (this.direction.z > 0)
                this.direction.z *= -1; //up
            this.ball.speed *= 0.75;

            return;
        }
    }

    //Ball potted
    gameController.GetCurrentTurn().BallPotted(this);
    this.ball.speed = 0;
    this.ball.position.set(0,-10,0);
    //scene.remove(ball.ball);
}
