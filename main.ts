namespace SpriteKind {
    export const ghost = SpriteKind.create()
    export const camera = SpriteKind.create()
    export const collider = SpriteKind.create()
}
sprites.onDestroyed(SpriteKind.Enemy, function (sprite) {
    info.changeScoreBy(1)
})
let othercar: Sprite = null
let tmp = 0
let obstacle: Sprite = null
let fuel: Sprite = null
tiles.setTilemap(tilemap`level1`)
let car = sprites.create(img`
    . . . . 2 1 2 2 1 2 c c . . . . 
    . . . 2 2 1 2 2 1 2 2 c c . . . 
    . . 2 9 2 1 2 2 1 2 2 2 c c . . 
    . 2 2 9 2 c f f c 2 2 2 2 c c . 
    . 2 2 2 f c f f c f 2 2 2 c c . 
    . 2 2 f f c f f c f f 2 2 c c . 
    . . 2 f f c f f c f f 2 c c . . 
    . . 2 2 2 1 2 2 1 2 2 2 c c . . 
    . . 2 f 2 1 2 2 1 2 f 2 c c . . 
    . . 2 2 2 1 2 2 1 2 2 2 c c . . 
    . . 2 f f c f f c f f 2 c c . . 
    . 2 2 f f c f f c f f 2 2 c c . 
    . 2 f 9 2 1 2 2 1 2 2 f 2 c c . 
    . 2 f 9 2 1 2 2 1 2 2 f 2 c c . 
    . 2 2 2 2 1 2 2 1 2 2 2 2 c c . 
    . 2 f f f c f f c f f f 2 c c . 
    `, SpriteKind.Player)
controller.moveSprite(car, 70, 0)
car.y = 105
car.z = 100
let cameraPerson = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.camera)
cameraPerson.setPosition(80, 455)
cameraPerson.vy = -100
cameraPerson.setFlag(SpriteFlag.Ghost, true)
car.setFlag(SpriteFlag.RelativeToCamera, true)
scene.cameraFollowSprite(cameraPerson)
let obstacles = [img`
    . . . f f f f f f f . . . . f 1 
    . . f f f f f f 1 1 f . . f f f 
    . f f f f f f f f f 1 f . f f . 
    . f f f f f f f f f f 1 f . . . 
    f f f f f f f f f f f f 1 f . . 
    f f f f f f f f f f f f 1 f . . 
    f f f f f f f f f f f f 1 f . . 
    f f f f f f f f f f f f f f f . 
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    . f f f 1 f . f f f f f f f f f 
    . . f f f . . . f f f f f f f . 
    . . . . . . . . . f f f f f . . 
    . . . . f f 1 1 . . . . . . . . 
    . . . f f f f f . . . . . . . . 
    . . . f f f . . . . . . . . . . 
    `, img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . f f f f f f f f . . . . 
    . . . f b b b b b b c c f . . . 
    . . . f f f f f f f f f f . . . 
    . . . . f 5 4 4 4 4 2 f . . . . 
    . . . . f 2 4 4 4 2 2 f . . . . 
    . . . . f 5 2 2 2 2 2 f . . . . 
    . . . . f 5 4 4 4 4 2 f . . . . 
    . . . . f 2 4 4 4 2 2 f . . c . 
    . . . . f 5 2 2 2 2 2 f . c c c 
    . . . . f 5 4 4 4 4 2 f c c c c 
    . . . . f 2 4 4 4 2 2 f c c c c 
    . . . . f 5 2 2 2 2 2 f c c c c 
    . . . f f 5 4 4 4 4 2 f f c c . 
    . . . . . f f f f f f c c . . . 
    `, img`
    . . . . . . 2 2 2 2 c . . . . . 
    . . . . . 2 c b c b 2 c . . . . 
    . . . . . c b c b c b c . . . . 
    . . . . . b f f f f c c . . . . 
    . . . . f f f f f f f f c c . . 
    . . . . f 2 2 2 2 2 2 f c c . . 
    . . . 2 2 2 2 2 2 2 2 2 c c c . 
    . . 2 2 2 f f f f f f 2 c c c c 
    . 2 2 c 2 f 1 2 2 2 f 2 c c c c 
    2 2 c . 2 1 c 2 2 2 f 2 c c c c 
    2 c . . 2 f f f f f f 2 c c c c 
    . . . . 2 2 f f f f 2 2 c c c . 
    . . . . 2 2 2 2 2 2 2 2 c c . . 
    . . . . 2 f f 2 2 f f 2 c c . . 
    . . . . 2 2 2 2 2 2 2 2 c c . . 
    . . . . 5 f f f f f f 5 c c c . 
    `]
let otherCars = [
img`
    . . . . . 2 2 2 2 2 c . . . . . 
    . . . . 2 2 2 2 2 2 2 c . . . . 
    . . . 2 1 2 2 2 2 2 2 2 c . . . 
    . . . 2 1 2 2 2 2 2 2 2 c . . . 
    . . . 2 1 2 c f 2 2 2 2 c . . . 
    . . . 2 2 c f f f 2 2 2 c . . . 
    . . . 2 2 f f f f f 2 2 c . . . 
    . . . . 2 f c 2 2 f 2 c c c . . 
    . . . . 2 f 1 2 2 f 2 c c c . . 
    . . . . 2 f 1 2 2 f 2 c c c . . 
    . . . . 2 f f f f f 2 c c c . . 
    . . . 2 2 1 f f f 2 2 2 c . . . 
    . . . 2 f c 2 2 2 f 2 2 c . . . 
    . . . 2 f c 2 2 2 f 2 2 c . . . 
    . . . 2 2 2 2 2 2 2 2 2 c . . . 
    . . . 2 f f f f f f f 2 c c . . 
    `,
img`
    . . . . 2 1 2 2 2 c c . . . . . 
    . . . 2 2 1 2 2 2 2 c c . . . . 
    . . . 2 1 2 2 2 2 2 c c . . . . 
    . . . 2 1 2 2 2 2 2 c c . . . . 
    . . . 2 1 2 2 2 2 2 c c c . . . 
    . . . 2 1 f f f 2 2 c c c . . . 
    . . . 2 b f f f f 2 c c c . . . 
    . . . 2 f 2 2 2 f 2 c c c c . . 
    . . . 2 f 2 2 2 f 2 c c c c . . 
    . . . 2 f 2 2 2 f 2 c c c c . . 
    . . . 2 f 2 2 2 f 2 c c c c . . 
    . . . 2 2 f f f 2 2 c c c c . . 
    . . . 2 f f f f f 2 c c c . . . 
    . . . 2 2 2 2 2 2 2 c c . . . . 
    . . . 2 2 2 2 2 2 2 c c . . . . 
    . . . 2 f f f f f 2 c c . . . . 
    `,
img`
    . . . . 2 2 2 2 c . . . . . . . 
    . . . 2 2 2 2 2 2 c c . . . . . 
    . . 2 2 2 2 2 2 2 2 c c . . . . 
    . . 2 1 2 2 2 2 2 2 c c . . . . 
    . . 2 1 f f f f 2 2 c c . . . . 
    . . 2 1 f f f f f 2 c c . . . . 
    . . 2 f f f f f f 2 c c c . . . 
    . . 2 f 1 2 2 2 f 2 c c c c . . 
    . . 2 f 1 2 2 2 f 2 c c c c . . 
    . . 2 1 c 2 2 2 f 2 c c c c . . 
    . . 2 f f f f f f 2 c c c c . . 
    . . 2 2 f f f f 2 2 c c c . . . 
    . . 2 2 2 2 2 2 2 2 c c . . . . 
    . . 2 f f 2 2 f f 2 c c . . . . 
    . . 2 2 2 2 2 2 2 2 c c . . . . 
    . . 2 f f f f f f 2 c c c . . . 
    `,
img`
    . . . . . . . . . . . . . . . . 
    . . . . 2 2 2 2 2 c c . . . . . 
    . . . 2 f 2 2 2 f 2 c c . . . . 
    . . . 2 2 2 2 2 2 2 c c . . . . 
    . . . 1 f f f f f 2 c c . . . . 
    . . . 1 1 f f f 2 2 c c c . . . 
    . . . f f 1 2 2 f f c c c c . . 
    . . . f f 2 2 2 f f c c c c . . 
    . . . f f 2 2 2 f f c c c c . . 
    . . . 2 2 2 2 2 2 2 c c c c . . 
    . . . 2 2 2 2 2 2 2 c c c c . . 
    . . . f f f f f f f c c c . . . 
    . . . 2 f f f f f 2 c c c . . . 
    . . . 2 2 2 2 2 2 2 c c . . . . 
    . . . . 2 2 2 2 2 c c . . . . . 
    . . . . . . . . . . . . . . . . 
    `,
img`
    . . . . 2 2 2 2 2 c . . . . . . 
    . . . 2 1 2 2 2 1 2 c . . . . . 
    . . . f c 2 2 2 2 f c . . . . . 
    . . . f c 2 2 2 2 f c . . . . . 
    . . . f c 2 2 2 2 f c c . . . . 
    . . . 2 2 2 2 2 2 2 c c . . . . 
    . . . 2 2 1 1 f 2 2 c c . . . . 
    . . . 2 1 1 f f f 2 c c c . . . 
    . . . 2 1 f f f f 2 c c c . . . 
    . . . 2 1 2 2 2 f 2 c c c . . . 
    . . . 2 1 2 2 2 f 2 c c c . . . 
    . . . 2 1 2 2 2 f 2 c c c . . . 
    . . . f c 2 2 2 2 f c c c . . . 
    . . . f c f f f 2 f c c . . . . 
    . . . f c 2 2 2 2 f c c . . . . 
    . . . 2 2 2 2 2 2 2 c c . . . . 
    `,
img`
    ..222222ccc.....
    ..122222cccc....
    .22222222ccc....
    .22222222ccc....
    .2ffffff2ccccc..
    .2f2222f2ccccc..
    .21222222ccccc..
    .21222222ccccc..
    ..f2ff2fcc.cc...
    1111111b11ccccc.
    1b1b1b1b11ccccc.
    1b1b1b1b11ccccc.
    1b1b1b1b11ccccc.
    1b1b1b1b11ccccc.
    1b1b1b1b11ccccc.
    1b1b1b1b11ccccc.
    1b1b1b1b11ccccc.
    1b1b1b1b11ccccc.
    1b1b1b1b11ccccc.
    1b1b1b1b11ccccc.
    1b1b1b1b11ccccc.
    1b1b1b1b11ccccc.
    1b1b1b1b11ccccc.
    1b1b1b1b11ccccc.
    1b1b1b1b11ccccc.
    1b1b1b1b11ccccc.
    1b1b1b1b11ccccc.
    1b1b1b1b11ccccc.
    1b1b1b1b11ccccc.
    1b1b1b1b11ccccc.
    1b1b1b1111ccccc.
    .ccccccccccccc..
    `
]
game.onUpdate(function () {
    if (cameraPerson.y < 60) {
        cameraPerson.y += 380
    }
    if (car.x < 40) {
        car.x = 40
    } else if (car.x > 120) {
        car.x = 120
    }
})
game.onUpdate(function () {
    if (info.score() > 0 && info.score() % 10 == 0) {
        timer.throttle("checkScore", 10000, function () {
            fuel = sprites.createProjectileFromSide(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . f f f . . . . . . . . 
                . . . . f . . . f . . . . . . . 
                . . . . f f f f f . f f f . . . 
                . . . . f 7 e e e f f . . . . . 
                . . . . f b e e e e b f . . . . 
                . . . . f 7 b e e b c f . . . . 
                . . . . f 7 e b b e c f . . . . 
                . . . . f 7 b e e b c f . c c . 
                . . . . f 7 e b b e c f c c c c 
                . . . . f 7 b e e b c f c c c c 
                . . . . f b e e e e b f c c c . 
                . . . . . f f f f f f c c . . . 
                `, 0, 100)
            fuel.setFlag(SpriteFlag.RelativeToCamera, true)
            fuel.y = car.y - 110
            fuel.x = randint(40, 120)
            fuel.z = 0
        })
    }
})
game.onUpdateInterval(5000, function () {
    if (info.score() > 0) {
        obstacle = sprites.createProjectileFromSide(img`
            . . . f f f f f f f . . . . f 1 
            . . f f f f f f 1 1 f . . f f f 
            . f f f f f f f f f 1 f . f f . 
            . f f f f f f f f f f 1 f . . . 
            f f f f f f f f f f f f 1 f . . 
            f f f f f f f f f f f f 1 f . . 
            f f f f f f f f f f f f 1 f . . 
            f f f f f f f f f f f f f f f . 
            f f f f f f f f f f f f f f f f 
            f f f f f f f f f f f f f f f f 
            . f f f 1 f . f f f f f f f f f 
            . . f f f . . . f f f f f f f . 
            . . . . . . . . . f f f f f . . 
            . . . . f f 1 1 . . . . . . . . 
            . . . f f f f f . . . . . . . . 
            . . . f f f . . . . . . . . . . 
            `, 0, 100)
        tmp = randint(1, 1)
        obstacle.setImage(obstacles[tmp])
        obstacle.setFlag(SpriteFlag.RelativeToCamera, true)
        obstacle.y = car.y - 110
        obstacle.x = car.x
        obstacle.z = 0
    }
})
// hardest : game update 800
// 
// cameraperson -100 (oil 100)
// 
// othercar vy plus petit = plus serré = plus dur
// 
// donc monter le lifespan
game.onUpdateInterval(1000, function () {
    othercar = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    othercar.vy = randint(45, 55)
    tmp = randint(0, 5)
    othercar.setImage(otherCars[tmp])
    // not too much trucks
    if (tmp == 5 && Math.percentChance(33)) {
        othercar.setImage(otherCars[0])
    }
    othercar.image.replace(2, randint(1, 10))
    tmp = randint(40, 120)
    othercar.x = tmp
    if (Math.percentChance(33)) {
        if (tmp <= 50) {
            othercar.vx = randint(2, 10)
        } else if (tmp >= 110) {
            othercar.vx = randint(2, 10) * -1
        } else {
            othercar.vx = 0
        }
    }
    othercar.y = car.y - 110
    othercar.lifespan = 3000
    othercar.setFlag(SpriteFlag.RelativeToCamera, true)
    othercar.z = 50
})
