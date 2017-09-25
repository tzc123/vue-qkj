<template>
	<ul class="qkj-navbar2">
		<li v-for="(item,index) in navList" :key="index">
			<span class="qkj-navbar2__text">{{item.text}}</span><br>
			<span class="qkj-navbar2__count">{{item.count}}</span>
		</li>
	</ul>
</template>

<script>
export default {
 name: 'QkjNavbar2',
 data() {
	 return {
		 navList: [{
			 text: '说说',
			 count: 15
		 },{
			 text: '日志',
			 count: 5
		 },{
			 text: '相册',
			 count: 20
		 },{
			 text: '留言',
			 count: 10
		 },{
			 text: '访客',
			 count: 1000
		 }]
	 }
 }
}
</script>

<style>
.qkj-navbar2 {
	height: 100px;
	width: 100%;
	padding-top: 30px;
	background: #fff;
	list-style: none;
}
.qkj-navbar2 li {
	width: 20%;
	height: 100%;
	text-align: center;
	float: left;
}
.qkj-navbar2__text {
	font-size: 32px;
	letter-spacing: 2px;
}
.qkj-navbar2__count {
	font-size: 27px;
}
</style>
