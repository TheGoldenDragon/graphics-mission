/**
 * Created by Robert on 1-12-2016.
 */

function onKeyDown(event) {
    event.preventDefault();
    if (ballsRoll())
        return;

    switch (event.keyCode) {
        case 32:
            if (shotspeed >= 60) { break };
            shotspeed += 1;
            break;
        case 37:
            whiteball.direction.x = -1; //down
            whiteball.direction.y = 0;
            whiteball.direction.z = 0;
            whiteball.ball.speed = 90;
            break;
        case 38:
            whiteball.direction.x = 0;
            whiteball.direction.y = 0;
            whiteball.direction.z = -1; //up
            whiteball.ball.speed = 90;
            break;
        case 39:
            whiteball.direction.x = 1; //right
            whiteball.direction.y = 0;
            whiteball.direction.z = 0;
            whiteball.ball.speed = 90;
            break;
        case 40:
            whiteball.direction.x = 0;
            whiteball.direction.y = 0;
            whiteball.direction.z = 1; //left
            whiteball.ball.speed = 90;
            break;
    }
}

function onKeyUp(event) {
    event.preventDefault();
    if (ballsRoll())
        return;

    switch (event.keyCode) {
        case 32:
            shootBall();
            break;
    }
}

function onDocumentMouseMove(event) {
    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}
