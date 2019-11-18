class Block extends GuaImage {
    constructor(game) {
        super(game, 'block')
        this.setup()
    }
    setup() {
        var o = this
        o.alive = true
        o.lifes = 1
        o.enableDrag = false
        o.last_x = o.x
        o.last_y = o.y
        o.interState = false
    }
    update() {
        var block = this
        if (block.enableDrag) {
            block.last_x = block.interState ? block.last_x : block.x
            block.last_y = block.interState ? block.last_y : block.y
        }
    }
    kill() {
        var o = this
        o.lifes--
        if (o.lifes < 1) {
            o.alive = false
        }
    }
    collide(b) {
        var o = this
        // log('block', o.alive, b)
        return o.alive && rectIntersects(o, b)
    }
    hasPoint(x, y) {
        var o = this
        var xIn = x >= o.x && x <= o.x + o.w
        var yIn = y >= o.y && y <= o.y + o.h
        return xIn && yIn
    }
    resetPoint(x, y){
        this.x = x
        this.y = y
    }
}
