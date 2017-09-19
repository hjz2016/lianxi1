function Bullet(range,obj,dir){
	this.wrap = range;
	this.plane = obj;
	this.ele = null;
	this.timer = null;
	this.dir = dir;

	this.init();
}

Bullet.prototype = {
	constructor:Bullet,
	init(){
		var div = document.createElement('div');
			div.className = 'bullet';
			this.wrap.appendChild(div);

		div.style.left = this.plane.offsetLeft + this.plane.offsetWidth / 2  + 'px';
		div.style.marginLeft = - div.offsetWidth / 2.5 + 'px';
		div.style.top = this.plane.offsetTop - div.offsetHeight + 'px';
		div.posY = -20;

		if(this.dir == 'left'){
			div.style.left = this.plane.offsetLeft + this.plane.offsetWidth / 5.5  + 'px';
			div.style.top = this.plane.offsetTop + this.plane.offsetHeight / 4 + 'px';
		}else if (this.dir == 'right') {
			div.style.left = this.plane.offsetLeft + this.plane.offsetWidth / 1.2  + 'px';
			div.style.top = this.plane.offsetTop + this.plane.offsetHeight / 4 + 'px';
		}


		this.ele = div;

		Plane.bullets.push(this);

		var that = this;

		this.timer = setInterval(function(){
			div.style.top = div.offsetTop + div.posY + 'px';
			if(div.offsetTop <= 0 ){
				that.die();
			}
		},30);

	},
	die(){
		clearInterval(this.timer);
		this.ele.className = 'die1';
		var that = this;
		setTimeout(function(){
			that.ele.remove();
		},50)
	}
}