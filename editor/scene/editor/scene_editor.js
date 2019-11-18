class SceneEditor extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }
    setup() {
        var game = this.game
        this.numberOfBlocks = 3

        this.bg = GuaImage.new(game, 'bg')
        this.paddle = Paddle.new(game)
        this.ball = Ball.new(game)
        this.score = 0

        this.addElement(this.bg)
        this.addElement(this.paddle)
        this.addElement(this.ball)
        this.addBlocks()

        this.score_label = GuaLabel.new(game, this.score, 100, 290)
        this.return_label = GuaLabel.new(game, '按 r 返回标题界面', 310, 290)
        this.addElement(this.score_label)
        this.addElement(this.return_label)
    }

    addBlocks() {
        var bs = []
        for (var i = 0; i < this.numberOfBlocks; i++) {
            var b = Block.new(this.game)
            b.x = i * 50
            b.y = 50
            bs.push(b)
            this.addElement(b)
        }
        this.blocks = bs
    }

    setupInputs() {
        var g = this.game
        var p = this.paddle
        var b = this.ball
        var blks = this.blocks
        var self = this

        g.registerAction('a', function (keyStatus) {
            p.moveLeft()
        })
        g.registerAction('d', function (keyStatus) {
            p.moveRight()
        })
        g.registerAction('f', function (keyStatus) {
            b.fire()
        })
        g.registerAction('r', function (keyStatus) {
            var s = SceneTitle.new(g)
            g.replaceScene(s)
        })

        g.canvas.addEventListener('mousedown', function(event) {
            var x = event.offsetX
            var y = event.offsetY
            log(x, y, event)
            // 检查是否点中了 ball
            if (b.hasPoint(x, y)) {
                // 设置拖拽状态
                b.enableDrag = true
            } else {
                for (var blk of blks) {
                    if (blk.hasPoint(x, y)) {
                        self.diffX = x - blk.x
                        self.diffY = y - blk.y
                        blk.enableDrag = true
                    }
                }
            }
        })
        g.canvas.addEventListener('mousemove', function(event) {
            var x = event.offsetX
            var y = event.offsetY
            // log(x, y, 'move')
            if (b.enableDrag) {
                log(x, y, 'drag')
                b.resetPoint(x, y)
            } else {
                for (var blk of blks) {
                    if (blk.enableDrag) {
                        blk.resetPoint(x - self.diffX, y - self.diffY)
                    }
                }
            }
        })
        g.canvas.addEventListener('mouseup', function(event) {
            var x = event.offsetX
            var y = event.offsetY
            log(x, y, 'up')
            b.enableDrag = false
            for (var blk of blks) {
                if (blk.enableDrag) {
                    if (!blk.interState) {
                        blk.resetPoint(x - self.diffX, y - self.diffY)
                    } else {
                        blk.resetPoint(blk.last_x, blk.last_y)
                    }
                }
                blk.enableDrag = false
            }
        })
        g.canvas.addEventListener('dblclick', function(event) {
            var x = event.offsetX
            var y = event.offsetY
            log(x, y, 'dblclick')
            var toDelete = -1
            for (var i = 0; i < blks.length; i++) {
                var blk = blks[i]
                if (blk.hasPoint(x, y)) {
                    log('双击了 block:', blk)
                    blk.kill()
                    if (!blk.alive) {
                        toDelete = i
                        self.removeElement(blk)
                    }
                }
            }
            if (toDelete > 0) {
                blks.splice(toDelete, 1)
            } else{
                var new_block = Block.new(g)
                new_block.x = x - new_block.w / 2
                new_block.y = y - new_block.h / 2
                for (var block of blks) {
                    if (new_block.collide(block)) {
                        new_block.interState = true
                        break
                    }
                }
                if (!new_block.interState) {
                    self.addElement(new_block)
                    blks.push(new_block)
                }
            }
        })
    }

    update() {
        var game = this.game
        var paddle = this.paddle
        var ball = this.ball
        var blocks = this.blocks
        var score = this.score

        if (window.paused) {
            return
        }

        ball.update()
        // 判断游戏结束
        if (ball.y > paddle.y) {
            // 刷新场景
            var newst = SceneEditor.new(game)
            game.replaceScene(newst)
        }
        // 判断相撞
        if (paddle.collide(ball)) {
            // 这里应该调用一个 ball.反弹() 来实现
            ball.反弹()
        }
        // 判断 ball 和 blocks 相撞
        var toDelete = -1
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            if (block.collide(ball)) {
                // log('block 相撞')
                block.kill()
                if (!block.alive) {
                    toDelete = i
                    this.removeElement(block)
                }
                ball.反弹()
                // 更新分数
                score += 100
            }
        }
        if (toDelete > 0) {
            blocks.splice(toDelete, 1)
        }
        // 判断是否有 block 与其他元素重叠
        for (var target_block of blocks) {
            target_block.interState = false
            for (var another_block of blocks) {
                if (target_block != another_block && target_block.collide(another_block)) {
                    target_block.interState = true
                    break
                }
            }
        }
        for (var block of blocks) {
            block.update()
        }
    }
}
