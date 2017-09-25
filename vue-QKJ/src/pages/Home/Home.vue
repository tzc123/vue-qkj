<template>
<!-- 主页 -->
	<div class="home" ref="home">
		<!-- better-scroll 必须把需要滑动的区域放在第一个 -->
		<qkj-body :scroll="scroll" :directionDown="directionDown">
			<qkj-navbar></qkj-navbar>
			<qkj-item v-for="item in 5" :key="item">
			</qkj-item>
		</qkj-body>
		<!-- 固定在顶部的标题 -->
		<qkj-title :scroll="scroll" :loading="loading" title="全部动态">
			<!-- 作用域 slot 用来向slot中传值，接受img 和 span 标签 ，active表示状态的改变，以此使两种状态显示不同的效果-->
			<template slot="left" scope="props">
				<img slot="left" :src="icon.lImg[props.active?0:1]"></img>
			</template>
			<template slot="right">
				<span>会员</span>
			</template>
		</qkj-title>
	</div>
</template>

<script>
import QkjNavbar from '@/components/QkjNavbar/QkjNavbar.vue'
import QkjHeader from '@/components/QkjHeader/QkjHeader.vue'
import QkjBody from '@/components/QkjBody/QkjBody.vue'
import QkjTitle from '@/components/QkjTitle/QkjTitle.vue'
import QkjItem from '@/components/QkjItem/QkjItem.vue'
import BScroll from 'better-scroll'
	export default {
		name: 'Home',
		data() {
			return {
				loading: false,// 是否在刷新
				scroll: 0,
				directionDown: false,
				icon: {
					lImg: [require('./search1.png'), require('./search2.png')],
					rImg: [require('./search1.png'), require('./search2.png')]
				}
			}
		},
		components: {
			QkjHeader,
			QkjBody,
			QkjTitle,
			QkjItem,
			QkjNavbar
		},
		created() {
			this.$nextTick(() => {
				this._initScroll()
			})
		},
		methods: {
			// 初始化 better-scroll
			_initScroll() {
				this.homeScroll = new BScroll(this.$refs.home, {
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
				// 判断下拉刷新事件
				this.homeScroll.on('pullingDown', () => {
					this.loading = true
					this.homeScroll.finishPullDown()
					setTimeout(() => {
						this.loading = false
					},2000)
				})
				// 获得当前滑动的坐标
				this.homeScroll.on('scroll', () => {
					this.scroll = this.homeScroll.y
				})
			}
		}
	}
</script>

<style>
.home{
	background: url('bg.jpg') no-repeat;
	background-size: 100%;
	width: 100%;
	overflow: hidden;
	max-height: 1800px;
}
</style>
