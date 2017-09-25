<template>
	<!-- 我的空间 类似Home -->
	<div  class="my-space" ref="mySpace">
		<qkj-body  :scroll="scroll">
			<!-- 头部 -->
			<qkj-header></qkj-header>
			<qkj-item v-for="item in 5" :key="item"></qkj-item>
		</qkj-body>
		<qkj-title :scroll="scroll" :loading="loading" title="我的空间">
			<template slot="left" scope="props">
				<span class="left" :class="{'colorWhite':props.active}">设置</span>
			</template>
			<template slot="right" scope="props">
				<img class="right" :src="icon[props.active?1:0]">
			</template>
		</qkj-title>
	</div>
</template>

<script>
import QkjBody from '@/components/QkjBody/QkjBody.vue'
import QkjTitle from '@/components/QkjTitle/QkjTitle.vue'
import QkjItem from '@/components/QkjItem/QkjItem.vue'
import BScroll from 'better-scroll'
import QkjHeader from '@/components/QkjHeader/QkjHeader.vue'
export default {
	name: 'MySpace',
	data() {
		return {
			icon: [require('./dian1.png'),require('./dian2.png')],
			scroll: 0,
			loading: false,
			directionDown: false,
		}
	},
	components: {
		QkjTitle,
		QkjBody,
		QkjItem,
		QkjHeader
	},
	methods: {
		_initScroll() {
			this.mySpaceScroll = new BScroll(this.$refs.mySpace, {
				momentumLimitTime: 500,
				momentumLimitDistance: 15,
				deceleration: 0.005,
				swipeTime: 500,
				swipeBounceTime: 50,
				probeType: 2,
				pullDownRefresh: {
					threshold: 100,
				}
			})
			this.mySpaceScroll.on('pullingDown', () => {
				this.loading = true
				this.mySpaceScroll.finishPullDown()
				setTimeout(() => {
					this.loading = false
				}, 2000)
			})
			this.mySpaceScroll.on('scroll', () => {
				this.scroll = this.mySpaceScroll.y
			})
		}
	},
	mounted() {
		this.$nextTick(() => {
			this._initScroll();
		});
	},
}
</script>

<style scoped>
.my-space {
	background: url('../../pages/Home/bg.jpg') no-repeat;
	background-size: 100%;
	width: 100%;
	overflow: hidden;
	max-height: 1800px;
}
.colorWhite {
	color: #fff
}
</style>