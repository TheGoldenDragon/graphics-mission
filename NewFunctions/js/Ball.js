/**
 * Created by robert on 09-Dec-16.
 */

var defaultPos;
var ballGroup;

function Ball(name, ballGroup, texture, position) // Constructor
{
    this.ball = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 20));
    this.name = name;
    this.ballGroup = ballGroup;
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

    scene.add(this.ball);
}

Ball.prototype.Reset = function(){
    console.log("hi");
    this.ball.position.x = this.defaultPos.x;
    this.ball.position.y = this.defaultPos.y;
    this.ball.position.z = this.defaultPos.z;
}