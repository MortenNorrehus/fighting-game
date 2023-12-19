const CANVAS = document.querySelector('canvas');
const CONTEXT = CANVAS.getContext('2d');

CANVAS.height = 940
CANVAS.width = 1680


CONTEXT.fillRect(0, 0, CANVAS.width, CANVAS.height)


const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },

    imageSrc: './img/background.png'
})

const shop = new Sprite({
    position: {
        x: 1050,
        y: 160
    },
    scale: 5,
    imageSrc: './img/shop.png',
    frames: 6
})

const PLAYER = new Fighter({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 10
    },

    scale: 5,
    offset: {
        x: 0,
        y: 120
    },
    direction: 1,
    sprites: {
        idle_right: {
            imageSrc: './img/player/_Idle.png',
            frames: 10,
        },
        idle_left: {
            imageSrc: './img/player/_Idle-left.png',
            frames: 10,
        },
        run_right: {
            imageSrc: './img/player/_Run.png',
            frames: 10,
        },
        run_left: {
            imageSrc: './img/player/_Run-left.png',
            frames: 10,
        },
        jump: {
            imageSrc: './img/player/_Jump.png',
            frames: 3,
        },
        attack_right: {
            imageSrc: './img/player/_Attack5.png',
            frames: 4,
        },
        attack_left: {
            imageSrc: './img/player/_Attack5_left.png',
            frames: 4,
        },
        roll: {
            imageSrc: './img/player/_Roll.png',
            frames: 12,
        },
    }
});

const ENEMY = new Fighter({
    position: {
        x: 1200,
        y: 100
    },
    velocity: {
        x: 0,
        y: 10
    },
    scale: 5,
    offset: {
        x: 0,
        y: 120
    },
    direction: 0,
    sprites: {
        idle_right: {
            imageSrc: './img/enemy/_Idle.png',
            frames: 10,
        },
        idle_left: {
            imageSrc: './img/enemy/_Idle_left.png',
            frames: 10,
        },
        run_right: {
            imageSrc: './img/enemy/_Run.png',
            frames: 10,
        },
        run_left: {
            imageSrc: './img/enemy/_Run_left.png',
            frames: 10,
        },
        jump: {
            imageSrc: './img/enemy/_Jump.png',
            frames: 9,
        },
        attack_right: {
            imageSrc: './img/enemy/_Attack.png',
            frames: 4,
        },
        attack_left: {
            imageSrc: './img/enemy/_Attack_left.png',
            frames: 4,
        },
        roll: {
            imageSrc: './img/enemy/_Roll.png',
            frames: 12,
        },
    }
})

const KEYS = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
}

function detectCollision({
    PLAYER,
    ENEMY
}) {
    return (
        PLAYER.attackBox.position.x + PLAYER.attackBox.width >= ENEMY.position.x
        && PLAYER.attackBox.position.x <= ENEMY.position.x + ENEMY.width
        && PLAYER.attackBox.position.y + PLAYER.attackBox.height >= ENEMY.position.y
        && PLAYER.attackBox.position.y <= ENEMY.position.y + ENEMY.height
        && PLAYER.isAttacking
    )
}

function animate() {
    window.requestAnimationFrame(animate)
    /*CONTEXT.fillStyle = 'black';
    CONTEXT.fillRect(0, 0, CANVAS.width, CANVAS.height)*/
    background.update();
    shop.update();

    PLAYER.update();
    ENEMY.update();

    PLAYER.velocity.x = 0;
    ENEMY.velocity.x = 0;

    // Player Movement
    if (KEYS.a.pressed && PLAYER.lastKey === 'a') {
        PLAYER.direction = 0;
        PLAYER.velocity.x = -SPEED
        PLAYER.switchSprite('run_left')

    } else if (KEYS.d.pressed && PLAYER.lastKey === 'd') {
        PLAYER.velocity.x = SPEED
        PLAYER.direction = 1;
        //    PLAYER.image = PLAYER.sprites.run_right.image;
        PLAYER.switchSprite('run_right')

    } else if (KEYS.w.pressed && PLAYER.lastKey === 'w') {
        PLAYER.velocity.y = SPEED
    } else if (PLAYER.lastKey == 'a') {
        PLAYER.switchSprite('idle_left')
    }
    else if (PLAYER.lastKey == 'd') {
        PLAYER.switchSprite('idle_right')
    } else {
        PLAYER.switchSprite('idle_right')
    }


    if (PLAYER.velocity.y < 0) {
        PLAYER.image = PLAYER.sprites.jump.image
        PLAYER.frames = PLAYER.sprites.jump.frames
    }

    if (ENEMY.velocity.y < 0) {
        console.log('her')
        ENEMY.image = ENEMY.sprites.jump.image
        ENEMY.frames = ENEMY.sprites.jump.frames
        console.log(ENEMY.image)
    }

    // Enemy Movement
    if (KEYS.ArrowLeft.pressed && ENEMY.lastKey === 'ArrowLeft') {
        ENEMY.direction = 0;
        ENEMY.velocity.x = -SPEED
        ENEMY.switchSprite('run_left')
    } else if (KEYS.ArrowRight.pressed && ENEMY.lastKey === 'ArrowRight') {
        ENEMY.velocity.x = SPEED
        ENEMY.direction = 1;
        ENEMY.switchSprite('run_right')
    } else if (KEYS.ArrowUp.pressed && ENEMY.lastKey === 'ArrowUp') {
        ENEMY.velocity.y = SPEED
    } else if (ENEMY.lastKey == 'ArrowLeft') {
        ENEMY.switchSprite('idle_left')
    } else if (ENEMY.lastKey == 'ArrowRight') {
        ENEMY.switchSprite('idle_right')
    } else {
        ENEMY.switchSprite('idle_left')
    }


    // Detect collision

    if (detectCollision({
        PLAYER: PLAYER,
        ENEMY: ENEMY
    }) && PLAYER.isAttacking) {
        PLAYER.isAttacking = false
        console.log('attack hit Player')
    }


    if (detectCollision({
        PLAYER: ENEMY,
        ENEMY: PLAYER
    }) && ENEMY.isAttacking) {
        ENEMY.isAttacking = false
        console.log('attack hit Enemy')
    }

}

animate();

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            KEYS.d.pressed = true;
            PLAYER.lastKey = event.key;
            break;
        case 'a':
            KEYS.a.pressed = true;
            PLAYER.lastKey = event.key;
            break;
        case 'w':
            KEYS.w.pressed = true
            if (PLAYER.position.y + PLAYER.height + PLAYER.velocity.y + 10 >= CANVAS.height - BOTTOM) PLAYER.velocity.y = JUMP;
            break;
        case ' ':
            PLAYER.attack();
            break;
        case 'c':
            PLAYER.roll();
            break;

        case 'ArrowRight':
            KEYS.ArrowRight.pressed = true;
            ENEMY.lastKey = event.key;
            break;
        case 'ArrowLeft':
            KEYS.ArrowLeft.pressed = true;
            ENEMY.lastKey = event.key;
            break;
        case 'ArrowUp':
            KEYS.w.pressed = true
            if (ENEMY.position.y + ENEMY.height + ENEMY.velocity.y + 10 >= CANVAS.height - BOTTOM) ENEMY.velocity.y = JUMP;
            break;
        case 'Enter':
            ENEMY.attack();
            break;


    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            KEYS.d.pressed = false;
            break;
        case 'a':
            KEYS.a.pressed = false;
            break;
    }

    switch (event.key) {
        case 'ArrowRight':
            KEYS.ArrowRight.pressed = false;
            break;
        case 'ArrowLeft':
            KEYS.ArrowLeft.pressed = false;
            break;
    }
})

