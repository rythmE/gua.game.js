class GuaAnimation {
    constructor(game, name, statuses) {
        this.game = game
        this.animations = {
        }
        for (var key in statuses) {
            this.animations[key] = []
            for (var i = 0; i < statuses[key]; i++) {
                var img_name = `${name}_${key}_${i}`
                var t = game.textureByName(img_name)
                this.animations[key].push(t)
            }
        }
        //
        this.flipY = false
        this.rotation = 0
    }
    static new(game, name) {
        var i = new this(game, name)
        return i
    }
    frames () {
        return this.animations[this.animationName]
    }
    draw() {
        this.game.drawImage(this)
    }
    update() {

    }
    changeAnimation(name) {
        this.animationName = name
    }
}
