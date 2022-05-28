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
    //partly collisions
    Collider.prototype.collideRightPlatformBottom = function (object, tile_bottom, coll_x, coll_width) {
        if (object.getTop() < tile_bottom &&
            object.getOldTop() >= tile_bottom &&
            object.getLeft() < coll_x + coll_width) {
            object.setTop(tile_bottom); //Move the top of the object to the bottom of the tile
            object.velocity_y = 0; //Stop moving in that direction.
            return true;
        }
        return false;
    };
    Collider.prototype.collideLeftPlatformBottom = function (object, tile_bottom, coll_x, coll_width) {
        if (object.getTop() < tile_bottom &&
            object.getOldTop() >= tile_bottom &&
            object.getRight() > coll_x) {
            object.setTop(tile_bottom); //Move the top of the object to the bottom of the tile
            object.velocity_y = 0; //Stop moving in that direction.
            return true;
        }
        return false;
    };
    Collider.prototype.collidePlatformTop = function (object, tile_top) {
        if (object.getBottom() > tile_top && object.getOldBottom() <= tile_top) {
            object.setBottom(tile_top - 0.01); //Move the top of the object to the bottom of the tile
            object.velocity_y = 0; //Stop moving in that direction.
            object.flying = false;
            return true;
        }
        return false;
    };
    Collider.prototype.collideRightPlatformTop = function (object, tile_top, coll_x, coll_width) {
        if (object.getBottom() > tile_top &&
            object.getOldBottom() <= tile_top &&
            object.getLeft() < coll_x + coll_width) {
            object.setBottom(tile_top - 0.01); //Move the top of the object to the bottom of the tile
            object.velocity_y = 0; //Stop moving in that direction.
            object.flying = false;
            return true;
        }
        object.flying = true;
        return false;
    };
    Collider.prototype.collideLeftPlatformTop = function (object, tile_top, coll_x, coll_width) {
        if (object.getBottom() > tile_top &&
            object.getOldBottom() <= tile_top &&
            object.getRight() > coll_x) {
            object.setBottom(tile_top - 0.01);
            object.velocity_y = 0;
            object.flying = false;
            return true;
        }
        object.flying = true;
        return false;
    };
    Collider.prototype.collidePlatformLeft = function (object, tile_left) {
        if (object.getRight() > tile_left && object.getOldRight() <= tile_left) {
            object.setRight(tile_left - 0.01);
            object.velocity_x = 0;
            return true;
        }
        return false;
    };
    Collider.prototype.collidePlatformRight = function (object, tile_right) {
        if (object.getLeft() < tile_right && object.getOldLeft() >= tile_right) {
            object.setLeft(tile_right);
            object.velocity_x = 0;
            return true;
        }
        return false;
    };
    Collider.prototype.collide = function (value, object, tile_x, tile_y, tile_width, tile_height) {
        tile_y += 19;
        switch (value) {
            case 0:
                break;
            case 1:
                if (this.collidePlatformTop(object, tile_y))
                    return;
                break;
            case 2:
                if (this.collidePlatformRight(object, tile_x + tile_width))
                    return;
                break;
            case 3:
                if (this.collidePlatformTop(object, tile_y))
                    return; // If there's a collision, we don't need to check for anything else.
                if (this.collidePlatformRight(object, tile_x + tile_width))
                    return;
                break;
            case 4:
                if (this.collidePlatformBottom(object, tile_y + tile_height))
                    return;
                break;
            case 5:
                if (this.collidePlatformTop(object, tile_y))
                    return;
                if (this.collidePlatformBottom(object, tile_y + tile_height))
                    return;
                break;
            case 6:
                if (this.collidePlatformBottom(object, tile_y + tile_height))
                    return;
                if (this.collidePlatformRight(object, tile_x + tile_width))
                    return;
                break;
            case 7:
                if (this.collidePlatformTop(object, tile_y))
                    return;
                if (this.collidePlatformBottom(object, tile_y + tile_height))
                    return;
                if (this.collidePlatformRight(object, tile_x + tile_width))
                    return;
                break;
            case 8:
                if (this.collidePlatformLeft(object, tile_x))
                    return;
                break;
            case 9:
                if (this.collidePlatformTop(object, tile_y))
                    return;
                if (this.collidePlatformLeft(object, tile_x))
                    return;
                break;
            case 10:
                if (this.collidePlatformLeft(object, tile_x))
                    return;
                if (this.collidePlatformRight(object, tile_x + tile_width))
                    return;
                break;
            case 11:
                if (this.collidePlatformTop(object, tile_y))
                    return;
                if (this.collidePlatformLeft(object, tile_x))
                    return;
                if (this.collidePlatformRight(object, tile_x + tile_width))
                    return;
                break;
            case 12:
                if (this.collidePlatformBottom(object, tile_y + tile_height))
                    return;
                if (this.collidePlatformLeft(object, tile_x))
                    return;
                break;
            case 13:
                if (this.collidePlatformTop(object, tile_y))
                    return;
                if (this.collidePlatformBottom(object, tile_y + tile_height))
                    return;
                if (this.collidePlatformLeft(object, tile_x))
                    return;
                break;
            case 14:
                if (this.collidePlatformBottom(object, tile_y + tile_height))
                    return;
                if (this.collidePlatformLeft(object, tile_x))
                    return;
                if (this.collidePlatformRight(object, tile_x))
                    return;
                break;
            case 15:
                if (this.collidePlatformTop(object, tile_y))
                    return;
                if (this.collidePlatformBottom(object, tile_y + tile_height))
                    return;
                if (this.collidePlatformLeft(object, tile_x))
                    return;
                if (this.collidePlatformRight(object, tile_x + tile_width))
                    return;
                break;
            case 16:
                if (this.collidePlatformRight(object, tile_x + tile_width / 4))
                    return;
                break;
            case 17:
                if (this.collidePlatformLeft(object, tile_x + (3 * tile_width) / 4))
                    return;
                break;
            case 18:
                if (this.collideRightPlatformBottom(object, tile_y + tile_height, tile_x, tile_width / 4))
                    return;
                if (this.collidePlatformRight(object, tile_x + tile_width / 4))
                    return;
                break;
            case 19:
                if (this.collideLeftPlatformBottom(object, tile_y + tile_height, tile_x + (3 * tile_width) / 4, tile_width / 4))
                    return;
                if (this.collidePlatformLeft(object, tile_x + (3 * tile_width) / 4))
                    return;
                break;
            case 20:
                if (this.collideRightPlatformTop(object, tile_y, tile_x, tile_width / 2))
                    return;
                object.flying = true;
                if (this.collidePlatformRight(object, tile_x + tile_width / 2))
                    return;
                break;
            case 21:
                if (this.collideLeftPlatformTop(object, tile_y, tile_x + tile_width / 2, tile_width / 2))
                    return;
                object.flying = true;
                if (this.collidePlatformLeft(object, tile_x + tile_width / 2))
                    return;
                break;
            case 22:
                if (this.collidePlatformRight(object, tile_x + tile_width / 2))
                    return;
                break;
            case 23:
                if (this.collidePlatformLeft(object, tile_x + tile_width / 2))
                    return;
                break;
        }
    };
    return Collider;
}());
export { Collider };
