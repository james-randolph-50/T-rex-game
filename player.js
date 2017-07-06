var player_standing = new Image();
player_standing.src = "imgs/trex_40_44.png"
var player_duck = new Image();
player_duck.src = "imgs/trex_duck_55_27.png"

function Player() {
	this.x_size = 40;
	this.y_size = 44;
	this.lowest = 400 - this.y_size - (28 / 2); // the lowest point on the canvas player can be

	// x and y positional data
	this.x = GAME_POSITION;
	this.y = this.lowest;
	this.acceleration = new Vector(0, 0);

	// frame and animation state related data
	this.state = 0;
	this.anim_delay_counter = 0;
	this.img = player_standing;
	this.ducking = false;

	this.update = function() {
		this.input_handler();
		this.x = GAME_POSITION + 20;
		/* decay vertical acceleration and apply to y position */
		this.acceleration.y -= 1;
		this.y -= this.acceleration.y;
		// constrain y position, additionally normalize acceleration
		this.y = constrain(this.y, 0, this.lowest);
		if (this.y == (400 - 44 - (28 / 2))) {
			this.acceleration.y = 0;
		}
	

		this.anim_delay_counter++;
		if (this.anim_delay_counter % 6) {
			return;
		}
		if (this.ducking) {
			switch (this.state) {
				case 0:
					this.state = 1;
					break;
				default:
					this.state = 0;
					break;
			};
		} else {
			switch (this.state) {
				case 0:
					this.state = 1;
					break;
				case 1:
					this.state = 2;
					break;
				case 2:
					this.state = 1;
					break;
			};
		}
	}

	this.input_handler = function() {
		if ((this.acceleration.y > 0) || (this.y != this.lowest)) {
			// user is in the air
			return;
		}
		if (keys[key_space] || keys[key_up_arrow]) {
			this.acceleration.y = 15;
		} else if (keys[key_down_arrow]) {
			this.img = player_duck;
			this.y_size = 27;
			this.x_size = 55;
			this.ducking = true;
			this.state = 0;
			this.lowest = 400 - this.y_size - (28 / 2);
		} else {
			this.img = player_standing;
			this.y_size = 44;
			this.x_size = 40;
			this.ducking = false;
			this.lowest = 400 - this.y_size - (28 / 2);
		}
	}

	this.draw = function(context) {
		context.drawImage(
			this.img,
			this.state * this.x_size,
			0,
			this.x_size,
			this.y_size,
			this.x,
			this.y,
			this.x_size,
			this.y_size);
	}
}