<template>
	<div class="qkj-popup">
		<div class="qkj-popup__mask" @touchstart="hidde" v-show="!hidden"></div>
		<div class="qkj-popup__container" :class="{'disappear':hiding}" ref="container" :style="{'top': top+'px'}" v-if="!hidden">
			<div class="qkj-popup__arrow" :class="arrowDirection?'arrow-top':'arrow-bottom'"></div>
			<ul class="qkj-popup__list">
				<li class="qkj-popup__item" v-for="item in getList">
					{{item.text}}
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
	name: 'Qkjpopup',
	data() {
		return {
			hidden: true,
			hiding: false,
			arrowDirection: false
		}
	},
	computed: {
		...mapGetters([
			'isShow',
			'getY',
			'getList',
		]),
		top() {
			let fullH = window.innerHeight
			if (this.getY > fullH/2) {
				this.arrowDirection = false
				return this.getY - 510
			} else {
				this.arrowDirection = true
				return this.getY + 60
			}
		}
	},
	watch: {
		isShow(val) {
			this.hidden = false
		}
	},
	methods: {
		hidde() {
			this.hiding = true
			this.$refs.container.addEventListener('animationend',() => {
				this.hidden = true
				this.hiding = false
			})
		}
	}
}
</script>

<style scoped>
.qkj-popup__mask {
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
	background: rgba(0,0,0,.5);
}
.qkj-popup__list {
	height: 100%;
	width: 100%;
	background: #fff;
}
.qkj-popup__container {
	position: absolute;
	height: auto;
	right: 0;
	left: 0;
	animation: duang .2s linear;
	transform-origin: 90% 100%;
}
.qkj-popup__container li {
	height: 90px;
	width: 100%;
	padding: 0 30px;
	font-size: 30px;
	line-height: 90px;
	background: #fff;
}
.disappear {
	animation: disappear .2s linear;
}
.qkj-popup__arrow {
	position: absolute;
	width: 0;
	height: 0;
	transform: rotateZ(45deg);
	border: 13px solid #fff;
}
.arrow-top {
	right: 30px;
	top: -13px;
}
.arrow-bottom {
	right: 30px;
	bottom: -13px
}
@keyframes duang {
	0%{
		transform: scale(0);
		opacity: 0;
	}
	80%{
		transform: scale(1.1);
		opacity: 1;
	}
	100%{
		transform: scale(1);
	}
}
@keyframes disappear {
	from {
		transform: scale(1);
		opacity: 1;
	}
	to {
		transform: scale(0);
		opacity: 0;
	}
}
</style>
