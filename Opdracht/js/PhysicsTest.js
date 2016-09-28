var threeObject;
var posX;
var posY;
var posZ;
var speed;
var clockDelta;

function PhysicsObject(ThreeObject) {
        this.threeObject = ThreeObject;
        this.posX = 0;
        this.posY = 0;
        this.posZ = 0;
        this.speed = 0.0;
        this.clockDelta = 0.0;

    }

    PhysicsObject.prototype.updateData = function (PositionX, PositionY, PositionZ, ClockDelta) {
        this.posX = PositionX;
        this.posY = PositionY;
        this.posZ = PositionZ;
        this.clockDelta = ClockDelta;

        var result = this.updateSpeed(null);
        console.log(result);
        this.speed = result;

        console.log("Ball info:\n- posX: " + this.posX + "\n- posY: " + this.posZ + "\n- posZ: " + this.posZ + "\n- Delta: " + this.clockDelta + "\n- Speed: " + this.speed);
    }

    PhysicsObject.prototype.updateSpeed = function (Speed) {
        if (Speed != null) {
            return Speed;

        }
        else {
            var currentSpeed = this.speed;
            var currentDeltaTime = this.clockDelta;
            if (currentSpeed >= 0.2) {
                currentSpeed -= (0.1);
            }
            if (currentSpeed > 0 && currentSpeed < 0.2) {
                currentSpeed -= (0.1);
                //camera.position.x = posX + 40;
                //camera.position.y = posY + 30;
                //camera.position.z = posZ + 30;
            }
            if (currentSpeed <= 0) {
            }
            //console.log(currentSpeed);
            return currentSpeed;
        }


    }

    PhysicsObject.prototype.returnData = function () {
        var tempX = this.posX;
        var tempZ = this.posZ;
        var tempSpeed = this.speed;
        return [tempX, tempZ, tempSpeed];
    }

    PhysicsObject.prototype.calculateNewPos = function (dirX, dirZ, clockDelta) {
        var oldX = this.posX;
        var oldZ = this.posZ;
        var currentSpeed = this.speed;


        var translateX = currentSpeed * dirX * clockDelta;
        var translateZ = currentSpeed * dirZ * clockDelta;


        var newX = oldX + translateX;
        var newZ = oldZ + translateZ;

        this.updateData(newX, this.posY, newZ, this.clockData);
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