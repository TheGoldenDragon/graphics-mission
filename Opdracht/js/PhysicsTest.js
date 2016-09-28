var threeObject;
var posX;
var posY;
var posZ;
var speed;
var dirX;
var dirY;
var dirZ;
var clockDelta;

function PhysicsObject(ThreeObject) {
        this.threeObject = ThreeObject;
        this.posX = 0;
        this.posY = 0;
        this.posZ = 0;
        this.speed = 0;
        this.dirX = 0;
        this.dirY = 0;
        this.dirZ = 0;
        this.clockDelta = 0;

    }

    PhysicsObject.prototype.updateData = function (PositionXYZ, DirectionXYZ, ClockDelta) {
        this.posX = PositionXYZ.x;
        this.posY = PositionXYZ.y;
        this.posZ = PositionXYZ.z;
        this.updateSpeed(null); //null - causes ball to slow down
        this.dirX = DirectionXYZ.x;
        this.dirY = DirectionXYZ.y;
        this.dirZ = DirectionXYZ.z;
        this.clockDelta = ClockDelta;

        //debugging
        console.log("Ball info:\n- posX: " + this.posX + "\n- posY: " + this.posY + "\n- posZ: " + this.posZ + "\n- Delta: " + this.clockDelta + "\n- Speed: " + this.speed);
    }

    PhysicsObject.prototype.updateSpeed = function (Speed) {
        if (Speed != null) {
            this.speed = Speed;

        }
        else {
            var currentSpeed = this.speed;

            if (currentSpeed >= 0.2) {
                currentSpeed -= 3 * this.clockDelta;
            }

            if (currentSpeed > 0 && currentSpeed < 0.2) {
                currentSpeed -= 3 * this.clockDelta;
            }

            if (currentSpeed <= 0) {
                currentSpeed = 0;
            }
            this.speed = currentSpeed;
        }


    }

    PhysicsObject.prototype.returnData = function () {
        return [this.posX, this.posY, this.posZ, this.speed];
    }

    PhysicsObject.prototype.calculateNewPos = function () {
        //Not including Y because it's not needed
        var translateX = (this.speed * this.clockDelta) * this.dirX;
        var translateY = (this.speed * this.clockDelta) * this.dirY;
        var translateZ = (this.speed * this.clockDelta) * this.dirZ;

        this.posX += translateX;
        this.posY += translateY;
        this.posZ += translateZ;

        return this.returnData();
    }

    /*
    PhysicsObject.prototype.updateSpeed = function () {
        if (speedVariable >= 0.2) {
            speedVariable -= 0.1;
        }
        else if (speedVariable > 0 && speedVariable < 0.2) {
            speedVariable -= 0.1;
            controls.target = whiteball.position;
            camera.position.y = whiteball.position.y + 40;
            camera.position.x = whiteball.position.x + 30;
            camera.position.z = whiteball.position.z + 30;
        }
        else if (speedVariable <= 0) {
            cue.position.z = 0.1;

            controls.target = whiteball.position;
        }
        return speedVariable;
    }*/