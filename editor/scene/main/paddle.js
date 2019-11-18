class Paddle extends GuaImage {
    constructor(game) {
        super(game, 'paddle')
        this.setup()
    }
    setup() {
        this.x = 100
        this.y = 250
        this.speed = 15
    }
    update() {
        this.speed = config.paddle_speed
    }
    moveLeft() {
        this.x -= this.speed
        if (this.x < 0) {
            this.x = 0
        }
    }
    moveRight() {
        this.x += this.speed
        if (this.x > 400 - this.w) {
            this.x = 400 - this.w
        }
    }
    aInb(x, x1, x2) {
        return x >= x1 && x <= x2
    }
    collide(ball) {
        var a = this
        var b = ball
        return rectIntersects(a, b)
    }
}
