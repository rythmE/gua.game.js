class Bullet extends GuaImage {
    constructor(game) {
        super(game, 'bullet')
        this.setup()
    }
    setup() {
        this.speed = config.bullet_speed.value
        // this.speed = 1
    }
    update() {
        this.y -= this.speed
    }
}

class Player extends GuaAnimation {
    constructor(game) {
        var status = {
            'idle': 2
        }
        super(game, 'player', status)
        this.status = status
        this.setup()
    }
    setup() {
        this.speed = 5
        this.cooldown = 0
        this.animationName = 'idle'
        this.texture = this.frames()[0]
        this.w = this.texture.width
        this.h = this.texture.height
        this.frameIndex = 0
        this.frameCount = this.status[this.animationName]
    }
    update() {
        this.speed = config.player_speed.value
        if (this.cooldown > 0) {
            this.cooldown--
        }
        console.log('this.frameCount', this.frameCount);
        this.frameCount--
        if (this.frameCount == 0) {
            this.frameCount = this.status[this.animationName]
            this.frameIndex = (this.frameIndex + 1) % this.frames().length
            this.texture = this.frames()[this.frameIndex]
        }
    }
    fire() {
        if (this.cooldown == 0) {
            this.cooldown = config.fire_cooldown.value
            var x =	this.x + this.w / 2
            var y = this.y
            var b = Bullet.new(this.game)
            b.x = x
            b.y = y
            this.scene.addElement(b)
        }
    }
    moveLeft(keyStatus) {
        this.x -= this.speed
        if (this.x < 0) {
            this.x = 0
        }
    }
    moveRight(keyStatus) {
        this.x += this.speed
        if (this.x > 256 - this.w) {
            this.x = 256 - this.w
        }
    }
    moveUp() {
        this.y -= this.speed
        if (this.y < 0) {
            this.y = 0
        }
    }
    moveDown() {
        this.y += this.speed
        if (this.y > 384 - this.h) {
            this.y = 384 - this.h
        }
    }
}

const randomBetween = function(start, end) {
    var n = Math.random() * (end - start + 1)
    return Math.floor(n + start)
}
class Enemy extends GuaImage {
    constructor(game) {
        var type = randomBetween(0, 4)
        var name = 'enemy' + type
        super(game, name)
        this.setup()
    }
    setup() {
        this.speed = randomBetween(2, 5)
        this.x = randomBetween(0, 200)
        this.y = -randomBetween(0, 200)
    }
    update() {
        this.y += this.speed
        if (this.y > 384) {
        this.setup()
        }
    }
}

class Cloud extends GuaImage {
    constructor(game) {
        super(game, 'cloud')
        this.setup()
    }
    setup() {
        this.speed = 1
        this.x = 0
        this.y = -randomBetween(0, 200)
    }
    update() {
        this.y += this.speed
        if (this.y > 384) {
            this.setup()
        }
    }
    debug() {
        this.speed = config.cloud_speed.value
    }
}

class Scene extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }
    setup() {
        var game = this.game
        this.numberOfEnemies = 10
        this.bg = GuaImage.new(game, 'sky')
        this.cloud = Cloud.new(game, 'cloud')

        // this.player = GuaImage.new(game, 'player')
        // this.player.x = 100
        // this.player.y = 450
        this.player = Player.new(game)
        this.player.x = 120
        this.player.y = 256

        this.addElement(this.bg)
        this.addElement(this.cloud)
        this.addElement(this.player)
        //
        this.addEnemies()
    }
    addEnemies() {
        var es = []
        for (var i = 0; i < this.numberOfEnemies; i++) {
            var e = Enemy.new(this.game)
            es.push(e)
            this.addElement(e)
        }
        this.enemies = es
    }
    setupInputs() {
        var g = this.game
        var s = this
        g.registerAction('a', function(keyStatus){
            s.player.moveLeft(keyStatus)
        })
        g.registerAction('d', function(keyStatus){
            s.player.moveRight(keyStatus)
        })
        g.registerAction('w', function(){
            s.player.moveUp()
        })
        g.registerAction('s', function(){
            s.player.moveDown()
        })
        g.registerAction('j', function(){
            s.player.fire()
        })
    }
    update() {
        super.update()
        this.cloud.y += 1
    }
}
