<template>
<!-- 遮罩层，通过点击+ 显示|消失 -->
	<div class="qkj-mask">
		<div class="qkj-mask__content" ref="mask" :class="{'show':btnClicked,'hidde':hidden}" v-show="btnClicked"></div>
		<ul class="qkj-mask__iconList" v-show="btnClicked">	
			<li v-for="(icon,index) in iconList" :key="index" 
			:style="{'animation': `${come?'come':'leave'} ${icon.speed}s linear`,'transform':`translateY(${come?0:700}px)`}">
				<img :src="icon.src">
				<br><span>{{icon.text}}</span>
			</li>
		</ul>
		<div class="qkj-mask__btn" :class="{'btnActive':btnRotate}" @click="btnClick">
			<img src="./jia.png">
		</div>
	</div>
</template>

<script>
export default {
	name: 'QkjMask',
	data() {
		return {
			btnClicked: false,
			hidden: false,
			btnRotate: false,
			come: true,
			// 路标的数据，包括图片地址，文字描述，释放特效的速度
			iconList: [{
				src: require('./shuoshuo.png'),
				text: '说说',
				speed: 0.3
			},{
				src: require('./shuoshuo.png'),
				text: '相册',
				speed: 0.1
			},{
				src: require('./shuoshuo.png'),
				text: '拍摄',
				speed: 0.12
			},{
				src: require('./shuoshuo.png'),
				text: '直播',
				speed: 0.3
			},{
				src: require('./shuoshuo.png'),
				text: '签到',
				speed: 0.4
			},{
				src: require('./shuoshuo.png'),
				text: '动感影集',
				speed: 0.3
			},{
				src: require('./shuoshuo.png'),
				text: '日志',
				speed: 0.32
			},{
				src: require('./shuoshuo.png'),
				text: '添加应用',
				speed: 0.4
			}]
		}
	},
	methods: {
		btnClick() {
			if (this.btnClicked == false) {
				this.btnClicked = true
				this.btnRotate = true
			} else {
				this.hidden = true
				this.come = false
				this.btnRotate = false
				//保证特效播放完毕，才彻底去掉遮罩层，然后恢复特效触发状态
				var _this = this
				this.$refs.mask.addEventListener('animationend', function handle() {
					_this.hidden = false
					_this.come = true
					_this.btnClicked = false
					this.removeEventListener('animationend', handle)
				})
			}
		}
	}
}
</script>

<style>
.qkj-mask__content {
	position: fixed;
	right: 0;
	left: 0;
	top: 0;
	bottom: 0;
	background: rgba(255, 255, 255, .9);
}
.qkj-mask__btn {
	width: 128px;
	height: 128px;
	position: fixed;
	bottom: 0px;
	left: 50%;
	margin-left: -64px;
	transition: all .4s;
	z-index: 1000;
}
.qkj-mask__iconList {
	position: absolute;
	left: 0;
	right: 0;
	bottom: 150px;
	height: 500px;
}
.qkj-mask__iconList li {
	list-style: none;
	height: 250px;
	font-size: 30px;
	letter-spacing: 1px;
	width: 25%;
	float: left;
	text-align: center;
}
.qkj-mask__iconList li img{
	width: 100px;
	height: 100px;
}
.qkj-mask__iconList li span {
	font-weight: 600;
	margin-left: -5px;
}

.show {
	animation: showit .4s;
}
.hidde {
	opacity: 0;
	animation: hiddeit .4s;
}
@keyframes showit {
	from{
		opacity: 0;
	}
	to{
		opacity: 1;
	}
}
@keyframes hiddeit {
	from {
		opacity: 1;
	}
	to {
		opacity: 0;
	}
}
@keyframes come {
	0%{
		transform: translateY(500px);
	}
	80%{
		transform: translateY(-50px);
	}
	100%
		{transform: translateY(0);
	}
}
@keyframes leave {
	0% {
		transform: translateY(0);
	}
	20% {
		transform: translateY(-50px);
	}
	100% {
		transform: translateY(500px);
	}
}

.btnActive{
	transform: rotateZ(135deg);
}
</style>
