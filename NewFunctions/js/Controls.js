/**
 * Created by Robert on 1-12-2016.
 */

function OnKeyDown(event) {
    event.preventDefault();
    if (BallsRoll())
        return;

    switch (event.keyCode) {
        case 32:
            if (shotspeed >= 60) { break };
            shotspeed += 1;
            cue.position.z += 0.22;
            document.getElementById('speedmeter').style.width = shotspeed * 5 + 'px';
            break;
    }
}

function OnKeyUp(event) {
    event.preventDefault();
    if (BallsRoll())
        return;

    switch (event.keyCode) {
        case 32:
            ShootBall();
            document.getElementById('speedmeter').style.width = '0px';
            cue.position.z = -4;
            break;
    }
}

function OnDocumentMouseMove(event) {
    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}
