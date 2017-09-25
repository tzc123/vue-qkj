<template>
<!-- 顶栏 -->
<div class="qkj-title" :class="{'colorWhite':active}"
	:style="{
		'transform':`translateY(${top})`,
		'opacity':opacity,
		'background':`rgba(255,255,255,${bopacity})`}">
		
	<slot name="left" :active="active"></slot>

	<div class="qkj-title__center" v-if="title" >
	<img id="qkj-title__load" src="./loading2.png" v-show="loading" :class="{'loading':loading}"></img>
	{{title}}</div>

	<slot name="right" :active="active"></slot>

</div>	
</template>

<script>
	export default {
		name: 'QkjTitle',
		props: {
			title: String,
			scroll: Number,
			loading: Boolean
		},
		data() {
			return {
				scrollRange: 0,
				active: true,
				bopacity: 0,
				clienY:0,
			}
		},
		computed: {
			opacity() {
				return this.scrollRange * 0.01 + 1
			},
			top() {
				return this.scrollRange + 'px'
			}
		},
		watch: {
			scroll(val) {
				if (val < 0) {
					this.scrollRange = val - this.clienY - 100
					if (this.scrollRange <= -100) {
						this.clienY = val
						this.scrollRange = -100
					} else if (this.scrollRange >= 0) {
						this.clienY = val - 100
						this.scrollRange = 0
					}
				} else {
					this.scrollRange = 0
				}
				if (val > -400 || val < -100) {
					this.bopacity = -(val/100 + 1)/3
				}
				if (val > -250) {
					this.active = true
				} else {
					this.active = false
				}
			}
		},
		mounted() {
		}
	}
</script>

<style scoped>
.qkj-title{
	right: 0;
	left: 0;
	top: 0;
	height: 100px;
	padding-left: 20px;
	padding-right: 20px;
	position: fixed;
	text-align: center;
	line-height: 100px;
	z-index: 1000;
	display: flex;
	color: black;
	justify-content: space-between;
}
#qkj-title__load {
	margin: 0;
	height: 50px;
	width: 50px;
	margin-bottom: -9px;
	border:1px solid transparent
}
.qkj-title__center{
	position: relative;
	font-size: 42px;
}
.qkj-title img {
	margin-top: 20px;
	height: 60px;
	width: 60px;
}
.qkj-title span {
	font-size: 45px;
}
.colorWhite {
	color: #fff
}
.loading{
	animation: loading 1s linear infinite;
}
@keyframes loading {
	from{
		transform: rotateZ(0)
	}to{
		transform: rotateZ(720deg)
	}
}
</style>
