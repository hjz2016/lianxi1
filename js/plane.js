var Plane = {
	ele : {},
	range : {},
	bullets : [],
	timer : {},
	curPos : {
		left : null,
		top : null
	},
	init(range,obj){
		this.range = range;
		this.ele = obj;
		// 绑定事件
		var that = this;

		document.onmousemove = function(e){
			e = e || window.event;
			that.borderCheck(e.clientX - range.offsetLeft - obj.offsetWidth / 2,e.clientY - that.ele.offsetHeight / 2,obj,range);

			obj.style.left = that.curPos.left + 'px';
			obj.style.top = that.curPos.top + 'px';
		}

		// 匹配难度

		var delay = 0;

		switch (engine.hardness) {
			case 0:
				delay = 500;
				break;
			case 1:
				delay = 200;
				break;
			case 2:
				delay = 100;
				break;
			case 3:
				delay = 30;
		}

		this.timer = setInterval(function(){
			
			that.bullets.forEach(function(n,i){
				if(n.ele.offsetTop<= 0){
					that.bullets.splice(i,1);
				}
			})

			new Bullet(range,obj);
			new Bullet(range,obj,"left");
			new Bullet(range,obj,"right");

		},delay);
		
	},
	borderCheck(left,top,obj,range){
		this.curPos.left = left;
		this.curPos.top = top;

		if(left <= 0){
			this.curPos.left = 0;
		}
		
		if(left >= range.offsetWidth - obj.offsetWidth){
			this.curPos.left = range.offsetWidth - obj.offsetWidth
		}

		this.curPos.top = top <=0 ? 0 : top;
		
		if(top >= document.body.clientHeight - obj.offsetHeight - 50){
			this.curPos.top = document.body.clientHeight - obj.offsetHeight- 50;
		} 
	},
	die(){
		clearInterval(this.timer);
		this.ele.className = 'me_die1';
		var that = this;

		// 飞机死亡 重新开始
		var index = 0;
		var dieTimer = setInterval(function(){
			that.ele.className = 'me_die'+ ++index;
			if(index == 3){
				clearInterval(dieTimer);

				setTimeout(function(){
					that.ele.remove();
					// 清定时器
					for(var i in engine.timerCache){
						clearInterval(engine.timerCache[i]);
					}

					engine.enemyArr.forEach(function(n){
						n.ele.remove();
					})
					
					that.range.innerHTML = `<ul id="option">
												<li>超级困难</li>
												<li>非常困难</li>
												<li>比较困难</li>
												<li>就选我吧</li>
											</ul>`;

					engine = new Engine();
					score.innerHTML = ''
				},1000)
			}
		},30)

		
	}
	
}