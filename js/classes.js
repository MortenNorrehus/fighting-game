
const GRAVITY = 0.7;
const SPEED = 8;
const JUMP = -17;
const BOTTOM = 270;

class Sprite {
    constructor({ position, imageSrc, scale = 1, frames = 1, offset = { x: 0, y: 0 }, size = { height: 150, width: 200 } }) {
        this.position = position;
        this.height = 150;
        this.width = 200;

        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale;
        this.frames = frames;
        this.frameCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 5;

        this.offset = offset;

    }

    draw() {
        CONTEXT.drawImage(
            this.image,
            this.frameCurrent * (this.image.width / this.frames),
            0,
            this.image.width / this.frames,
            this.image.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,

            (this.image.width / this.frames) * this.scale,
            this.image.height * this.scale)
    }

    animateFrames(frames) {
        this.framesElapsed++

        if (this.framesElapsed % this.framesHold === 0) {
            if (this.frameCurrent < this.frames - 1) {
                this.frameCurrent++
            } else {
                this.frameCurrent = 0;
            }
        }
    }

    update() {
        this.draw()
        this.animateFrames();
    }
}

class Fighter extends Sprite {
    constructor({ position, velocity, color, offset, imageSrc, scale = 1, frames = 1, sprites }) {
        super({
            position,
            imageSrc,
            scale,
            frames,
            offset
        })
        this.velocity = velocity;
        this.height = 150;
        this.width = 50;
        this.lastKey = null;
        this.color = color;
        this.direction = 1

        this.frameCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 5;

        this.sprites = sprites;

        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image();
            sprites[sprite].image.src = sprites[sprite].imageSrc;
        }


        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },

            width: 100,
            height: 100,
            color: 'white'
        }
        this.isAttacking;
        this.isRolling;
    }

    /*   draw() {
           /*  CONTEXT.fillStyle = this.color;
             CONTEXT.fillRect(this.position.x, this.position.y, 50, this.height);
   
           if (this.isAttacking) {
               CONTEXT.fillStyle = this.attackBox.color;
               CONTEXT.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
           }
       }*/



    update() {
        this.draw()

        this.animateFrames();
        this.attackBox.position.x = this.position.x - this.attackBox.offset;
        this.attackBox.position.y = this.position.y;

        if (this.velocity.x > 0) {
            this.attackBox.position.x = this.position.x;
        } else if (this.velocity.x < 0) {
            this.attackBox.position.x = this.position.x - this.width
        }


        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y >= CANVAS.height - BOTTOM) {
            this.velocity.y = 0
        } else this.velocity.y += GRAVITY;
    }

    attack() {
        console.log(this.direction)

        if (this.direction == 1) {
            this.switchSprite('attack_right')
        } else if (this.direction == 0) {
            this.switchSprite('attack_left')
        }

        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false;
        }, 100);


    }

    roll() {
        console.log('roll')
        PLAYER.switchSprite('roll')

        this.isRolling = true
        setTimeout(() => {
            this.isRolling = false;
        }, 500);


    }

    switchSprite(sprite) {
        if (this.image === this.sprites.attack_right.image && this.frameCurrent < this.sprites.attack_right.frames - 1 ||
            this.image === this.sprites.attack_left.image && this.frameCurrent < this.sprites.attack_left.frames - 1 ||
            this.image === this.sprites.roll.image && this.frameCurrent < this.sprites.roll.frames - 1) return;
        switch (sprite) {
            case 'idle_right':
                if (this.image !== this.sprites.idle_right.image) {
                    this.image = this.sprites.idle_right.image
                    this.frames = this.sprites.idle_right.frames
                    this.frameCurrent = 0;

                }
                break;
            case 'idle_left':
                if (this.image !== this.sprites.idle_left.image) {
                    this.image = this.sprites.idle_left.image
                    this.frames = this.sprites.idle_left.frames
                    this.frameCurrent = 0;

                }
                break
            case 'run_left':
                if (this.image !== this.sprites.run_left.image) {
                    this.image = this.sprites.run_left.image
                    this.frames = this.sprites.run_left.frames
                    this.frameCurrent = 0;

                }
                break
            case 'run_right':
                if (this.image !== this.sprites.run_right.image) {
                    this.image = this.sprites.run_right.image
                    this.frames = this.sprites.run_right.frames
                    this.frameCurrent = 0;

                }
                break
            case 'attack_right':
                if (this.image !== this.sprites.attack_right.image) {
                    this.image = this.sprites.attack_right.image
                    this.frames = this.sprites.attack_right.frames
                    this.frameCurrent = 0;

                }
                break
            case 'attack_left':
                if (this.image !== this.sprites.attack_left.image) {
                    this.image = this.sprites.attack_left.image
                    this.frames = this.sprites.attack_left.frames
                    this.frameCurrent = 0;

                }
                break
            case 'roll':
                if (this.image !== this.sprites.roll.image) {
                    this.image = this.sprites.roll.image
                    this.frames = this.sprites.roll.frames
                    this.frameCurrent = 0;

                }
                break
        };
    };
};


