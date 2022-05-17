var Collider = /** @class */ (function () {
    function Collider() {
    }
    Collider.prototype.collidePlatformBottom = function (object, tile_bottom) {
        if (object.getTop() < tile_bottom && object.getOldTop() >= tile_bottom) {
            object.setTop(tile_bottom); //Move the top of the object to the bottom of the tile
            object.velocity_y = 0; //Stop moving in that direction.
            return true;
        }
        return false;
    };
    //TO DO partly collisions
    Collider.prototype.collidePartPlatformBottom = function (object, tile_bottom) {
        if (object.getTop() < tile_bottom && object.getOldTop() >= tile_bottom) {
            object.setTop(tile_bottom); //Move the top of the object to the bottom of the tile
            object.velocity_y = 0; //Stop moving in that direction.
            return true;
        }
        return false;
    };
    Collider.prototype.collidePlatformTop = function (object, tile_top) {
        if (object.getBottom() > tile_top && object.getOldBottom() <= tile_top) {
            object.setBottom(tile_top); //Move the top of the object to the bottom of the tile
            object.velocity_y = 0; //Stop moving in that direction.
            object.flying = false;
            return true;
        }
        return false;
    };
    Collider.prototype.collidePlatformLeft = function (object, tile_left) {
        if (object.getRight() > tile_left && object.getOldLeft() <= tile_left) {
            object.setRight(tile_left); //Move the top of the object to the bottom of the tile
            object.velocity_x = 0; //Stop moving in that direction.
            return true;
        }
        return false;
    };
    Collider.prototype.collidePlatformRight = function (object, tile_right) {
        if (object.getLeft() < tile_right && object.getOldRight() >= tile_right) {
            object.setLeft(tile_right); //Move the top of the object to the bottom of the tile
            object.velocity_x = 0; //Stop moving in that direction.
            return true;
        }
        return false;
    };
    Collider.prototype.collide = function (value, object, tile_x, tile_y, tile_width, tile_height) {
        tile_y += 19;
        switch (value) {
            case 1:
                this.collidePlatformTop(object, tile_y);
                break;
            case 2:
                this.collidePlatformRight(object, tile_x + tile_width);
                break;
            case 3:
                if (this.collidePlatformTop(object, tile_y))
                    return; // If there's a collision, we don't need to check for anything else.
                this.collidePlatformRight(object, tile_x + tile_width);
                break;
            case 4:
                this.collidePlatformBottom(object, tile_y + tile_height);
                break;
            case 5:
                if (this.collidePlatformTop(object, tile_y))
                    return;
                this.collidePlatformBottom(object, tile_y + tile_height);
                break;
            case 6:
                if (this.collidePlatformRight(object, tile_x + tile_width))
                    return;
                this.collidePlatformBottom(object, tile_y + tile_height);
                break;
            case 7:
                if (this.collidePlatformTop(object, tile_y))
                    return;
                if (this.collidePlatformRight(object, tile_x + tile_width))
                    return;
                this.collidePlatformBottom(object, tile_y + tile_height);
                break;
            case 8:
                this.collidePlatformLeft(object, tile_x);
                break;
            case 9:
                if (this.collidePlatformTop(object, tile_y))
                    return;
                this.collidePlatformLeft(object, tile_x);
                break;
            case 10:
                if (this.collidePlatformLeft(object, tile_x))
                    return;
                this.collidePlatformRight(object, tile_x + tile_width);
                break;
            case 11:
                if (this.collidePlatformTop(object, tile_y))
                    return;
                if (this.collidePlatformLeft(object, tile_x))
                    return;
                this.collidePlatformRight(object, tile_x + tile_width);
                break;
            case 12:
                if (this.collidePlatformLeft(object, tile_x))
                    return;
                this.collidePlatformBottom(object, tile_y + tile_height);
                break;
            case 13:
                if (this.collidePlatformTop(object, tile_y))
                    return;
                if (this.collidePlatformLeft(object, tile_x))
                    return;
                this.collidePlatformBottom(object, tile_y + tile_height);
                break;
            case 14:
                if (this.collidePlatformLeft(object, tile_x))
                    return;
                if (this.collidePlatformRight(object, tile_x))
                    return;
                this.collidePlatformBottom(object, tile_y + tile_height);
                break;
            case 15:
                if (this.collidePlatformTop(object, tile_y))
                    return;
                if (this.collidePlatformLeft(object, tile_x))
                    return;
                if (this.collidePlatformRight(object, tile_x + tile_width))
                    return;
                this.collidePlatformBottom(object, tile_y + tile_height);
                break;
            case 16:
                this.collidePlatformRight(object, tile_x + tile_width / 4);
                break;
            case 17:
                this.collidePlatformLeft(object, tile_x + (3 * tile_width) / 4);
                break;
            case 18:
                if (this.collidePlatformBottom(object, tile_y + tile_height))
                    return;
                this.collidePlatformRight(object, tile_x + tile_width / 4);
                break;
            case 19:
                if (this.collidePlatformBottom(object, tile_y + tile_height))
                    return;
                this.collidePlatformLeft(object, tile_x + (3 * tile_width) / 4);
                break;
            case 20:
                if (this.collidePlatformTop(object, tile_y))
                    return;
                // this.collidePlatformRight(object, tile_x + tile_width / 2);
                break;
            case 21:
                if (this.collidePlatformTop(object, tile_y))
                    return;
                // this.collidePlatformLeft(object, tile_x + tile_width / 2);
                break;
            case 22:
                this.collidePlatformRight(object, tile_x + tile_width / 2);
                break;
            case 23:
                this.collidePlatformLeft(object, tile_x + tile_width / 2);
                break;
        }
    };
    return Collider;
}());
export { Collider };
