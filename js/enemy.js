class Enemy {
	constructor(type,wrap){
		this.type = type;
		this.wrap = wrap;
		this.ele = null;
		this.left = null;
		this.top = null;
		this.timer = null;

		this.init();
	}

	init(){
		var enemyDom = document.createElement('div');
		document.body.appendChild(enemyDom);
		this.ele = enemyDom;

		switch(this.type){
			case 1 : 
				this.ele.className = 'sE';
				this.speed = 5;
				this.hp = 10;
				break;
			case 2 : 
				this.ele.className = 'mE';
				this.speed = 2;
				this.hp = 20;
				break;
			case 3 : 
				this.ele.className = 'lE';
				this.speed = 1;
				this.hp = 50;

		}

		var randomLeft = Math.max(Math.random()*this.wrap.offsetWidth + this.wrap.offsetLeft - this.ele.offsetWidth,this.wrap.offsetLeft);
		this.ele.style.left = randomLeft + 'px';
		this.ele.style.top = 0;

		this.left = this.ele.offsetLeft - this.wrap.offsetLeft;

		this.move();
	}

	move(){
		var that = this;
		this.timer = setInterval(function(){
			that.ele.style.top = that.speed + that.ele.offsetTop + 'px';
			that.checkHit();
		},30)
	}

	checkHit(){
		// 敌机与子弹碰撞
		for(var i = 0 , bullet = null ; bullet = Plane.bullets[i++] ; ){
			if(bullet.ele.offsetLeft + bullet.ele.offsetWidth >= this.left
			   && bullet.ele.offsetLeft <= this.left + this.ele.offsetWidth
			   && bullet.ele.offsetTop <= this.ele.offsetTop + this.ele.offsetHeight
			   && bullet.ele.offsetTop + bullet.ele.offsetHeight >= this.ele.offsetTop){
			   	this.hp--;
				if(this.hp == 0){
					this.die();
					score.innerHTML = Number(score.innerHTML) + this.type;
					showGreat(bullet.ele.offsetLeft,bullet.ele.offsetTop);
				}
				bullet.die();
				break;
			}
		}

		// 敌机与飞机碰撞
		if(this.ele.offsetLeft + this.ele.offsetWidth >= Plane.curPos.left + this.wrap.offsetLeft
		   && this.ele.offsetLeft <= Plane.curPos.left + this.wrap.offsetLeft + Plane.ele.offsetWidth
		   && this.ele.offsetTop <= Plane.ele.offsetTop + Plane.ele.offsetHeight
		   && this.ele.offsetTop + this.ele.offsetHeight >= Plane.ele.offsetTop){
		   	
			this.die();
			// 不开则为无敌
			Plane.die();
		}
	}

	die(){
		clearInterval(this.timer);
		this.ele.className = 'plane'+ this.type + '_die1';

		var index = 0;
		var that = this;
		var dieTimer = setInterval(function(){
			that.ele.className = 'plane'+ that.type + '_die' + ++index;

			switch(that.type){
				case 1:
					if(index == 3){
						clearInterval(dieTimer);

						setTimeout(function(){
							that.ele.remove();
							
						},200)
					}
					break;
				case 2:
					if(index == 4){
						clearInterval(dieTimer);

						setTimeout(function(){
							that.ele.remove();
							
						},200)
					}
					break;
				case 3:
					if(index == 6){
						clearInterval(dieTimer);

						setTimeout(function(){
							that.ele.remove();
							
						},200)
					}
			}
		},30)

	}

}