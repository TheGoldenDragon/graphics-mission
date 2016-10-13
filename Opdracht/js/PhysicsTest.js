    var threeObject;
    var threeObjectName
    var posX;
    var posY;
    var posZ;
    var speed;
    var dirXYZ;
    var clockDelta;
    var lastHitBy;
    var tempPosX, tempPosY, tempPosZ, tempSpeed, tempDirXYZ;

    function PhysicsObject(ThreeObject, ObjectDirection) {
        this.threeObject = ThreeObject;
        this.threeObjectName = ThreeObject.name;
        this.posX = 0;
        this.posY = 0;
        this.posZ = 0;
        this.speed = 0;
        this.dirXYZ = ObjectDirection; //Vector3
        this.clockDelta = 0;
        this.lastHitBy = [];

    }

    PhysicsObject.prototype.updateData = function (PositionXYZ, ClockDelta) {
        this.posX = PositionXYZ.x;
        this.posY = PositionXYZ.y;
        this.posZ = PositionXYZ.z;
        this.updateSpeed(null); //null - causes ball to slow down
        //this.dirX = DirectionXYZ.x;
        //this.dirY = DirectionXYZ.y;
        //this.dirZ = DirectionXYZ.z;
        this.clockDelta = ClockDelta;
        
        //debugging
        //console.log("Ball info:\n- posX: " + this.posX + "\n- posY: " + this.posY + "\n- posZ: " + this.posZ + "\n- Delta: " + this.clockDelta + "\n- Speed: " + this.speed);
    }

    PhysicsObject.prototype.updateSpeed = function (Speed) {
        if (Speed != null) {
            this.speed = Speed;
        }
        else {
            var currentSpeed = this.speed;

            if (currentSpeed > 30 /*max speed*/)
                currentSpeed = 30;

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

    PhysicsObject.prototype.updateDirection = function (DirX, DirY, DirZ) {
        this.dirXYZ.x = DirX;
        this.dirXYZ.y = DirY;
        this.dirXYZ.z = DirZ;
    }

    PhysicsObject.prototype.updateHitBy = function (CollisionItem) {
        if (CollisionItem == null) {
            this.lastHitBy = [];
        }
        else {
            for (i = 0; i < this.lastHitBy.length; i++) {
                if (this.lastHitBy[i][0] == CollisionItem.threeObjectName) {
                    return;
                }
            }

            var extThreeObjectName = CollisionItem.threeObjectName;
            var extSpeed = CollisionItem.speed;
            var extPosX = CollisionItem.posX, extPosY = CollisionItem.posY, extPosZ = CollisionItem.posZ;
            var extDirXYZ = CollisionItem.dirXYZ;
            var extData = [extThreeObjectName, extSpeed, extPosX, extPosY, extPosZ, extDirXYZ];

            this.lastHitBy.push(extData);
        }

    }

    PhysicsObject.prototype.checkIgnore = function (CollisionItem) {
        if (CollisionItem == null)
            return false;
        else {
            for (i = 0; i < this.lastHitBy.length; i++){
                if (this.lastHitBy[i] == CollisionItem)
                    return true;
            }
            return false;
        }
    }

    PhysicsObject.prototype.calculateNewPos = function () {
        //hitByList contains: [0]:name | [1]:speed | [2]:posX | [3]:posY | [4]:posZ | [5]:DirXYZ(.x.y.z) | [6]: |
        if (this.lastHitBy.length > 0) {
            var hitByList = this.lastHitBy;
            if (hitByList.length == 1) {

                this.speed = hitByList[0][1];
            }
            else {
                var currentSpeed = this.speed;

                for (i = 0; i < hitByList.length; i++) {
                    currentSpeed += hitByList[i][1];
                }
                currentSpeed /= hitByList.length

                this.speed = currentSpeed;
                console.log(currentSpeed + " " + hitByList.length);
            }
        }

        var translateX = (this.speed * this.clockDelta) * this.dirXYZ.x;
        var translateY = (this.speed * this.clockDelta) * this.dirXYZ.y;
        var translateZ = (this.speed * this.clockDelta) * this.dirXYZ.z;

        this.posX += translateX;
        this.posY += translateY;
        this.posZ += translateZ;

        this.updateHitBy(null);

        return this.returnData();
    }

    PhysicsObject.prototype.returnData = function () {
        return [this.posX, this.posY, this.posZ, this.speed, this.dirXYZ];
    }

    PhysicsObject.prototype.returnThreeObject = function () {
        return this.threeObject;
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