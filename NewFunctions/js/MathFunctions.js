/**
 * Created by Robert on 1-12-2016.
 */

function CalculatePos(ball, clockDeltaTime) {
    var oldPos = new THREE.Vector3(ball.ball.position.x, ball.ball.position.y, ball.ball.position.z);

    var translateX = ball.ball.speed * ball.direction.x;
    var translateY = ball.ball.speed * ball.direction.y;
    var translateZ = ball.ball.speed * ball.direction.z;

    var newPos = new THREE.Vector3(ball.ball.position.x + translateX, ball.ball.position.y + translateY, ball.ball.position.z + translateZ);

    var distanceVector = GetDistanceVector(newPos, oldPos);
    var distance = Math.sqrt(distanceVector.x * distanceVector.x + distanceVector.y * distanceVector.y + distanceVector.z * distanceVector.z);
    var directionNormal = GetVectorNormal(distanceVector, distance);

    translateX = ball.ball.speed * directionNormal.x;
    translateY = ball.ball.speed * directionNormal.y;
    translateZ = ball.ball.speed * directionNormal.z;

    ball.ball.position.x += translateX * clockDeltaTime;
    ball.ball.position.y += 0 * clockDeltaTime;
    ball.ball.position.z += translateZ * clockDeltaTime;

    return ball.ball.position;
}

function CalculateDirection(ball1, ball2) {
    //fills in the direction of the ball when collision happens
    return new THREE.Vector3(ball1.ball.position.y - ball1.ball.position.x, ball2.ball.position.y - ball2.ball.position.x, 0).normalize()
}

function UpdateDirection(ballDirection, impulseVector, add) {
    var newX, newZ;
    if (add == false) {
        newX = ballDirection.x - impulseVector.x;
        //this.dirXYZ.y -= impulseVector.y;
        newZ = ballDirection.z - impulseVector.z;
    }
    else {
        newX = ballDirection.x + impulseVector.x;
        //this.dirXYZ.y += impulseVector.y;
        newZ = ballDirection.z + impulseVector.z;
    }
    return new THREE.Vector3(newX, 0, newZ);
}



function GetDistanceVector(ball1, ball2) {
    var deltaX = ball1.x - ball2.x;
    var deltaY = ball1.y - ball2.y;
    var deltaZ = ball1.z - ball2.z;

    return new THREE.Vector3(deltaX, deltaY, deltaZ);
}

function GetVectorNormal(vector, distance) {
    var normalX = vector.x / distance;
    var normalY = vector.y / distance;
    var normalZ = vector.z / distance;
    return new THREE.Vector3(normalX, normalY, normalZ);
}

function GetObjectVelocityDelta(ball1, ball2) {
    var deltaX = ball2.direction.x * ball2.ball.speed * frameDeltaTime - ball1.direction.x - ball1.ball.speed * frameDeltaTime;
    var deltaY = ball2.direction.y * ball2.ball.speed * frameDeltaTime - ball1.direction.y - ball1.ball.speed * frameDeltaTime;
    var deltaZ = ball2.direction.z * ball2.ball.speed * frameDeltaTime - ball1.direction.z - ball1.ball.speed * frameDeltaTime;
    return new THREE.Vector3(deltaX, deltaY, deltaZ);
}

function GetDotProduct(vector1, vector2) {
    var X = vector1.x * vector2.x
    var Y = vector1.y * vector2.y
    var Z = vector1.z * vector2.z
    return (X + Y + Z)
}

function GetImpulseVector(impulseStrength, vectorNormal) {
    var x = vectorNormal.x * impulseStrength;
    var y = vectorNormal.y * impulseStrength;
    var z = vectorNormal.z * impulseStrength;
    return new THREE.Vector3(x, y, z);
}


