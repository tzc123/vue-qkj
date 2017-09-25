<template>
<!-- 底栏 -->
	<div class="qkj-tabbar">
		<ul>
			<li v-for="(item,index) in tabList" :key="index" @touchstart="handleTouchStart(index)" >
				<router-link :to="item.path">
					<img :to="item.path" class="qkj-tabbar__icon" :src="item.iconSrc[currentPage===index?1:0]"></img>
					<span :class="{'colorYellow':currentPage==index}">{{item.text}}</span>
				</router-link>
			</li>
		</ul>
		<qkj-mask></qkj-mask>
	</div>
</template>

<script>
import QkjMask from '@/components/QkjMask/QkjMask.vue'
	export default {
		name: 'QkjTabbar',
		components: {
			QkjMask
		},
		props: {
			currentPage: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				centerClicked: false,
				tabList: [
					{
						iconSrc: [require("./dongtai1.png"),require("./dongtai2.png")],
						path: '/',
						text: "动态"
					},
					{
						iconSrc: [require("./@1.png"), require("./@2.png")],
						path: '/aboutme',
						text: "与我相关"
					},
					{
						iconSrc: [require("./myspace1.png"),require("./myspace2.png")],
						path: '/myspace',
						text: "我的空间"
					},
					{
						iconSrc: [require("./discover1.png"),require("./discover2.png")],
						path: '/discover',
						text: "发现"
					}
				]
			}
		},
		methods: {
			handleTouchStart(index) {
				this.$emit('turnPage',index)
			}
		}
	}
</script>

<style scoped>
.qkj-tabbar{
	height: 128px;
	background: #fff;
	position: fixed;
	bottom: 0;
	right: 0;
	left: 0;
}
.qkj-tabbar ul{
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: space-around;
	align-items: flex-end;
}
.qkj-tabbar ul li{
	width: 20%;
	list-style: none;
	font-size: 27px;
}
.qkj-tabbar ul li:nth-child(2){
	margin-right: 20%
}
.colorYellow	{
	color: #ffc025;
}
.qkj-tabbar__icon{
	width: 70px;
	height: 70px;
}
.qkj-tabbar ul li a {
	text-decoration: none;
	text-align: center;
	color: gray;
	letter-spacing: 2px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
}
</style>
