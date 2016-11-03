    var threeObject;
    var threeObjectName
    var speed;
    var dirXYZ;

    function PhysicsObject(ThreeObject, ObjectDirection) {
        this.threeObject = ThreeObject;
        this.threeObjectName = ThreeObject.name;
        this.speed = 0;
        this.dirXYZ = ObjectDirection; //Vector3

    }

    PhysicsObject.prototype.updateData = function (PositionXYZ, ClockDelta) {
        this.updateSpeed(null); //null - causes ball to slow down
        //this.dirX = DirectionXYZ.x;
        //this.dirY = DirectionXYZ.y;
        //this.dirZ = DirectionXYZ.z;
        
        //debugging
        //console.log("Ball info:\n- posX: " + this.posX + "\n- posY: " + this.posY + "\n- posZ: " + this.posZ + "\n- Delta: " + this.clockDelta + "\n- Speed: " + this.speed);
    }

    PhysicsObject.prototype.returnDirection = function () {
        return this.dirXYZ;
    }

    PhysicsObject.prototype.updateSpeed = function (Speed) {
        if (Speed != null) {
            this.speed = Speed;
        }
        else {
            var currentSpeed = this.speed;

            if (currentSpeed >= 0.2) {
                currentSpeed -= 0.1 
            }

            if (currentSpeed > 0 && currentSpeed < 0.2) {
                currentSpeed -= 0.1;
            }

            if (currentSpeed <= 0) {
                currentSpeed = 0;
            }
            this.speed = currentSpeed;
        }


    }

    PhysicsObject.prototype.updateDirection = function (impulseVector, add) {
        if (add == false) {
            this.dirXYZ.x -= impulseVector.x;
            //this.dirXYZ.y -= impulseVector.y;
            this.dirXYZ.z -= impulseVector.z;
        }
        else {
            this.dirXYZ.x += impulseVector.x;
            //this.dirXYZ.y += impulseVector.y;
            this.dirXYZ.z += impulseVector.z;
        }
    }

    PhysicsObject.prototype.setDirection = function (dirX, dirY, dirZ) {
        this.dirXYZ.x = dirX;
        //this.dirXYZ.y = dirY;
        this.dirXYZ.z = dirZ;
    }

    PhysicsObject.prototype.calculateNewPos = function () {
        //hitByList contains: [0]:name | [1]:speed | [2]:posX | [3]:posY | [4]:posZ | [5]:DirXYZ(.x.y.z) | [6]: |
        if (this.lastHitBy.length > 0) {
            var hitByList = this.lastHitBy;
            if (hitByList.length == 1) {
                //console.log("New");
                //console.log(this.threeObjectName + " info:\n- posX: " + this.posX + "\n- posY: " + this.posY + "\n- posZ: " + this.posZ + "\n- Delta: " + this.clockDelta + "\n- Speed: " + this.speed + "\n- DirXYZ: " + this.dirXYZ.x * 57.2957795  + " " + this.dirXYZ.y * 57.2957795  + " " + this.dirXYZ.z * 57.2957795 );
                //console.log(hitByList[0][0] + " info:\n- posX: " + hitByList[0][2] + "\n- posY: " + hitByList[0][3] + "\n- posZ: " + hitByList[0][4] + "\n- Delta: " + this.clockDelta + "\n- Speed: " + hitByList[0][1] + "\n- DirXYZ: " + hitByList[0][5].x * 57.2957795  + " " + hitByList[0][5].y * 57.2957795  + " " + hitByList[0][5].z * 57.2957795);

                if (this.speed <= 0) {

                }
                this.speed = hitByList[0][1];
            }
            else {
                var currentSpeed = this.speed;

                for (i = 0; i < hitByList.length; i++) {
                    currentSpeed += hitByList[i][1];
                }
                if (currentSpeed > 30)
                    currentSpeed = 30;

                this.speed = currentSpeed;
            }
        }

        var translateX = (this.speed * this.clockDelta) * this.dirXYZ.x;
        var translateY = (this.speed * this.clockDelta) * this.dirXYZ.y;
        var translateZ = (this.speed * this.clockDelta) * this.dirXYZ.z;
        //if (this.posX + translateX > 18.1 || this.posX + translateX < -20.1 || this.posZ + translateZ > 38.1 || this.posZ + translateZ < -38.1)
        //    return [this.posX, this.posY, this.posZ, this.speed, this.dirXYZ];

        this.posX += translateX;
        this.posY += translateY;
        this.posZ += translateZ;

        this.updateHitBy(null);

        return this.returnData();
    }

   