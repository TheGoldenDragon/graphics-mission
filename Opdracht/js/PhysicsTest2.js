var threeObject, positionX, positionZ, directionX, directionZ, speed;

function PhysicsObject(ThreeObject, PositionX, PositionZ, Speed, DirectionX, DirectionZ) {
        this.threeObject = ThreeObject;
        this.positionX = PositionX;
        this.positionZ = PositionZ;
        this.directionX = 0;
        this.directionZ = 0;
        this.speed = 0;
        console.log("X: " + this.positionX + "\nY: " + this.positionZ + "\nSpeed: " + this.speed + "\ndirX: " + this.directionX + "\ndirZ: " + this.directionZ);

    }

    PhysicsObject.prototype.updateCoords = function (PositionX, PositionZ) {
        positionX = PositionX;
        positionZ = PositionZ;
        console.log("X: " + this.positionX + "\nY: " + this.positionZ);
    }

    PhysicsObject.prototype.updateBallData = function (PositionX, PositionZ, Speed, DirectionX, DirectionZ) {
        
        console.log("X: " + this.positionX + "\nY: " + this.positionZ + "\nSpeed: " + this.speed + "\ndirX: " + this.directionX + "\ndirZ: " + this.directionZ);this.positionX = PositionX;
        this.positionZ = PositionZ;
        this.speed = Speed;
        this.directionX = DirectionX;
        this.directionZ = DirectionZ;
        
        console.log("X: " + this.positionX + "\nY: " + this.positionZ + "\nSpeed: " + this.speed + "\ndirX: " + this.directionX + "\ndirZ: " + this.directionZ);
    }



    PhysicsObject.prototype.calculateNewPos = function () {

        var newX = 0;
        var newZ = 0;
        newX = this.directionX >= 0 ? newX + (speed * directionX) : newX - (speed * directionX);
        newZ = this.directionZ >= 0 ? newZ + (speed * directionZ) : newZ - (speed * directionZ);
        return [newX, newZ];
    }