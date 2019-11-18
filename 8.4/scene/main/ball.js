class Ball extends GuaImage {
    constructor(game) {
        super(game, 'ball')
        this.setup()
    }
    setup() {
        this.speedX = 5
        this.speedY = 5
        this.x = 100
        this.y = 100
        this.fired = false
        this.enableDrag = false
    }
    update() {
        var o = this
        if (o.fired) {
            // log('move')
            if (o.x < 0 || o.x > 400) {
                o.speedX = -o.speedX
            }
            if (o.y < 0 || o.y > 300) {
                o.speedY = -o.speedY
            }
            // move
            o.x += o.speedX
            o.y += o.speedY
        }
    }
    debug() {
        var speed = config.ball_speed
        this.speedX = speed
        this.speedY = speed
    }
    fire() {
        this.fired = true
    }
    反弹() {
        this.speedY *= -1
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
