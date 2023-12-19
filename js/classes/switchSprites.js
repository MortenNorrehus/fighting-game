function switchSprite(sprite) {
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

export default switchSprite;