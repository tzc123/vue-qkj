<template>
<!-- 主体内容--说说列表+导航栏 -->
	<!-- <div ref="qkjBody" class="qkj-body" :class="{'back':back}"
	:style="{'transform':`translate(0,${transition}px)`}"> -->
	<div ref="qkjBody" class="qkj-body" :class="{'no-bg':noBg}">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				noBg: true,
				timeout: null,
				runNow: true,
			}
		},
		props: {
			scroll: Number
		},
		methods: {
			// 写了一个防抖 结果更抖了 ！！！
			// debounce(func) {
				// if (this.timeout) {
				// 	if (this.runNow) {
				// 		func()
				// 		console.log(3)
				// 		this.runNow = false
				// 	}
				// 	return
				// } else {
				// 	this.timeout = setTimeout(() => {
				// 		func()
				// 		this.timeout = null
				// 	}, 50)
				// 	setTimeout(() => {
				// 		this.runNow = true
				// 	},500)
				// }
			// }
		},
		watch: {
			scroll(val) {
				if (val >= 0 || val < -500) {
					if (!this.noBg) this.noBg = true
				} else{
					if (this.noBg) this.noBg = false
				}
			}
		}
	}
</script>

<style scoped>
.qkj-body{
	background: url('../../pages/Home/bg.jpg');
	background-size: 100%;
	padding-bottom: 280px;
	padding-top: 500px;
	width: 100%;
	height: auto;
}
.no-bg {
	background: none;
}
</style>
