var threeObject;

function PhysicsObject(ThreeObject) {
        this.threeObject = ThreeObject;

    }

    PhysicsObject.prototype.calculateNewPos = function (posX, posZ, speed, dirX, dirZ) {

        var oldX = posX;
        var oldZ = posZ;

        var translateX = speed * dirX;
        var translateZ = speed * dirZ;

        
        var newX = oldX + translateX;
        var newZ = oldZ + translateZ;
        
        /*newX = dirX >= 0 ? newX + (speed * dirX) : newX - (speed * dirX);
        newZ = dirZ >= 0 ? newZ + (speed * dirZ) : newZ - (speed * dirZ);*/
        return [newX, newZ];
    }