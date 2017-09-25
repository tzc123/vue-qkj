<template>
<!-- 每一篇说说 -->
	<div class="qkj-item">
		<img src="./arrow.png" class="arrow" @touchstart="handleTouch">
		<div class="qkj-item__header">
			<img class="qkj-item__avatar" :src="shuoData.avatar"></img>
			<div class="qkj-item__desc">
				<p class="qkj-item__name">{{shuoData.name}}</p>
				<p class="qkj-item__time">{{shuoData.time}}</p>
			</div>
		</div>
		<div class="qkj-item__content">{{shuoData.article}}</div>
		<div class="qkj-item__equipment">
			{{shuoData.equipment}}
		</div class="qkj-item__footer">
		<div class="qkj-item__footer">
			<span>浏览{{shuoData.views}}次</span>
			<ul>
				<li><img :src="icons.forword"></li>
				<li><img :src="icons.comment"></li>
				<li @touchstart="ratingActive" :class="{'active': active}"><img :src="icons.rating[active?0:1]"></li>
			</ul>
		</div>
		<div class="qkj-item__rating">{{shuoData.ratings}}</div>
		<div class="qkj-item__input" @touchend="Input">
			<div type="text">
				<span>评论</span>
				<img src="./biaoqing.png">
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'QkjItem',
	props: {
		shuoData: {
			type: Object,
			default() {
				return {
					avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1505241491930&di=3ae3a109806ec28be8735b2a70585720&imgtype=0&src=http%3A%2F%2Fe.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F0b46f21fbe096b6312a0350608338744ebf8ac2f.jpg',
					name: '王小虎',
					time: '今天22:00',
					article: '今天心情好，今天不洗澡，今天心情好，今天不洗澡，今天心情好，今天不洗澡，今天心情好，今天不洗澡，今天心情好，今天不洗澡，今天心情好，今天不洗澡，今天心情好，今天不洗澡，今天心情好，今天不洗澡，今天心情好，今天不洗澡，今天心情好，今天不洗澡',
					ratings: '某某某、哈萨格一、爱我所爱',
					comments: {},
					equipment: 'iPhone 7',
					views: 44
				}
			}
		}
	},
	data() {
		return {
			active: false,
			arrowTouched: false,
			icons: {
				rating: [require('./rating1.png'),require('./rating.png')],
				comment: require('./comment.png'),
				forword: require('./forword.png')
			}
		}
	},
	methods: {
		ratingActive() {
			this.active = !this.active
		},
		handleTouch(e) {
			this.arrowTouched = true
			this.$store.dispatch('show')
			this.$store.dispatch('setY', e.touches[0].clientY)
		},
		Input() {
			this.$store.dispatch('focus')
		}
	}
}	
</script>

<style scoped>
.qkj-item{
	box-sizing: border-box;
	width: 100%;
	height: auto;
	padding: 10px 30px;
	border-top: 30px solid #ececec;
	background: white;
	font-weight: 100;
	position: relative;
}
.qkj-item__header {
	width: 100%;
	height: 120px;
	margin-top: 20px;
	display: flex;
	justify-content: flex-start;
	position: relative;
}
.arrow {
	position: absolute;
	width: 30px;
	height: 30px;
	right: 30px;
	top: 50px;
	z-index: 1000;
}
.qkj-item__avatar	{
	margin-top: 8px;
	width: 100px;
	height: 100px;
	border-radius: 50%;
}
.qkj-item__desc	{
	flex: 1;
	display: flex;
	padding-left: 20px;
	flex-direction: column;
	justify-content: center;
}
.qkj-item__name {
	line-height: 50px;
	font-size: 39px;
	letter-spacing: 0;
}
.qkj-item__time,.qkj-item__equipment {
	line-height: 50px;
	font-size: 29px;
	color: gray;
}
.qkj-item__content {
	margin-top: 10px;
	width: 100%;
	font-weight: 100;
	font-size: 39px;
	max-height: 500px;
	text-align: justify;
}
.qkj-item__equipment {
	padding: 10px 0;
	font-family: "Lucida Family";
	font-weight: 100;
}
.qkj-item__footer {
	height: 80px;
	padding: 10px 0;
	position: relative;
}
.qkj-item__footer span {
	color: gray;
	font-size: 35px;
	font-weight: 100;
	letter-spacing: 1px;
	height: 60px;
	line-height: 60px;
}
.qkj-item__footer ul {
	display: inline-block;
	float: right;
	height: 50px;
}
.qkj-item__footer ul li {
	margin-left: 110px;
	float: right;
	list-style: none;
}
.active	{
	animation: duang .4s linear alternate;
}
.qkj-item__footer img {
	height: 40px;
	width: 40px;
}
@keyframes duang {
	0%{
		transform: scale(1);
	}
	50%{
		transform: scale(2);
	}
	100%{
		transform: scale(1)
	}
}
.qkj-item__footer::after {
	content: "";
	position: absolute;
	right: 0;
	left: 0;
	bottom: 0;
	height: 1px;
	background: #777;
	transform: scaleY(.5);
}
.qkj-item__rating {
	font-size: 35px;
	color: #4c77a7;
	height: 100px;
	letter-spacing: 2px;
	line-height: 100px;
}
.qkj-item__input {
	height: 100px;
	line-height: 100px;
}
.qkj-item__input div {
	display: flex;
	justify-content: space-between;
	border: 1px solid #777;
	border-radius: 5px;
	height: 66px;
	line-height: 66px;
	font-size: 32px;
	padding: 0 15px;
	color: #777;
}
.qkj-item__input img {
	margin-top: 8px;
	width: 50px;
	height: 50px;
}
</style>
