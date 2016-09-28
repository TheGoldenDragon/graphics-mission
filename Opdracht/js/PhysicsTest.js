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

        this.updateSpeed(null);

        //debugging
        console.log("Ball info:\n- posX: " + this.posX + "\n- posY: " + this.posZ + "\n- posZ: " + this.posZ + "\n- Delta: " + this.clockDelta + "\n- Speed: " + this.speed);
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

    PhysicsObject.prototype.calculateNewPos = function (dirX, dirZ) {
        var oldX = this.posX;
        var oldZ = this.posZ;
        var currentSpeed = this.speed * this.clockDelta;


        var translateX = currentSpeed * dirX;
        var translateZ = currentSpeed * dirZ;


        this.posX = oldX + translateX;
        this.posZ = oldZ + translateZ;

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