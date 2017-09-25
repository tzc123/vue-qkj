<template>
	<!-- 带动画的列表 -->
	<ul class="qkj-list" :class="{'qkj-list--fixed':show}">
		<li class="qkj-list__toolbar" v-if="show" :class="{'qkj-list__toolbar--show':onShow}">
			<span class="qkj-list__text">常用功能</span>
			<div class="manage" @touchstart="edit">
				<span>管理</span>
			</div>
		</li>
		<!-- 列表中平时显示的内容 -->
		<li class="qkj-list__content" :class="{'transition':onShow}"
			:style="{'transform':`translate(${editing?60:0}px,${list[index].translateY}px)`}"
			v-if="index<trueLength" v-for="(item,index) in list" :key="index">
			<img class="qkj-list__edit" v-show="item.index>=listLength" @touchstart="add(index,$event)" :src="editIcon[0]"></img>
			<img class="qkj-list__edit" v-show="item.index<listLength" @touchstart="reduce(index,$event)" :src="editIcon[1]"></img>
			<img class="qkj-list__icon" :src="item.icon"></img>
			<div class="qkj-list__text">{{item.text}}<!--//想要看清楚过程添加 {{item.index}} --></div>
			<img src="../QkjItem/arrow.png" class="arrow">
		</li>
		<div class="qkj-list__wrapper" 
		:style="{'transform':onShow?`scaleY(1)`:`scaleY(0)`,'height':onShow?`${(list.length-trueLength+1)*90}px`:'0',
			'opacity':onShow?'1':'0'}">
			<li class="qkj-list__other"  v-show="show" v-if="refresh"
				:style="{'transform':`translateY(${-(this.trueLength-this.listLength)*90}px)`}">
					<span class="qkj-list__text">其他功能</span>
			</li>
			<!-- 列表中更多的内容 -->
			<ul v-if="show" :class="{'transition':!editing}" >
				<li :class="{'qkj-list__content--edit':editing,'transition':onShow}" v-for="(item,index) in list" :key="index"
				v-if="index>=trueLength" :style="{'transform':`translate(${editing?60:0}px,${list[index].translateY}px)`}">
					<img class="qkj-list__edit" v-show="item.index>=listLength" @touchstart="add(index,$event)" :src="editIcon[0]"></img>
					<img class="qkj-list__edit" v-show="item.index<listLength" @touchstart="reduce(index,$event)" :src="editIcon[1]"></img>
					<img class="qkj-list__icon" :src="item.icon"></img>
					<div class="qkj-list__text">{{item.text}}<!--//想要看清楚过程添加 {{item.index}} --></div>
					<img src="../QkjItem/arrow.png" class="arrow">
				</li>
			</ul>
		</div>
		<li id="qkj-list__more" @touchstart="pull">
			{{show?'收起':'更多功能'}}
			<img src="../QkjItem/arrow.png" class="arrow" :class="show ? 'arrow--up' : 'arrow--down'">
		</li>
	</ul>
</template>

<script>
export default {
	props: { // 使用时需要传的数据
		display: {// 初始状态显示的列表长度
			type: Number,
			default: 4
		},
		listData: {
			type: Array,
			default() {
				return [{//列表数据， translateY记录每一项的位移状态 index记录位移后的下标
					icon: '',
					text: '我的关注',
				},{
					icon: '',
					text: '那年今日',
				},{
					icon: '',
					text: '好友生日',
				},{
					icon: '',
					text: '个性化',
				},{
					icon: '',
					text: '背景音乐',
				},{
					icon: '',
					text: '空间宠物',
				},{
					icon: '',
					text: '空间收藏',
				},{
					icon: '',
					text: '照片备份',
				},{
					icon: '',
					text: '情侣空间',
				}]
			}
		}
	},
	created() {
		// 将初始传入的数据 拷贝一份， 并添加一些辅助属性 用来记录动画效果
		this.listData.forEach((item,index) => {
			let oItem = Object.create(item)
			oItem.translateY = 0
			oItem.index = index
			this.list.push(oItem)
		})
		this.trueLength = this.display
		this.listLength = this.display
	},
	data() {
		return {
			show: false,// 是否显示列表全部内容
			onShow: false,// 动画状态
			editing: false,// 编辑状态
			editIcon: [require('./add.png'),require('./reduce.png')],// 图标
			listLength: 4,// 动画时 常用功能长度
			refresh: true,// 一个辅助变量
			list: []
		}
	},
	methods: {
		pull() {// 下拉事件
			if (this.show) {
				// 将动画效果变成真实效果
				this.trueLength = this.listLength
				this.list.sort((a,b) => {
					return a.index > b.index
				})
				this.list.forEach( (item,index) => {
						item.index = index
						item.translateY = 0
					})
				this.refresh = false
				this.$nextTick(() => {
					this.refresh = true
					setTimeout(() => {
						this.editing = false
						this.onShow = false
					})
				})
				// 等待动画播完
				setTimeout(() => {
					this.show = false
				},500)
			} else {
				this.show = true
				// 开始播放动画
				setTimeout(() => {
					this.onShow = true
				})
			}
		},
		edit() {// 修改编辑状态
			this.editing = !this.editing
		},
		add(index,e) {// 添加
			this.list[index].translateY -= (this.list[index].index-this.listLength + 1)*90
			for (let i = 0; i < this.list.length; i++) {
				if (this.list[i].index < this.list[index].index && this.list[i].index >= this.listLength) {
					this.list[i].translateY += 90
					this.list[i].index += 1
				}
			}
			this.listLength += 1
			this.list[index].index = this.listLength - 1
		},
		reduce(index,e) {// 把当前项从当前功能移到更多功能处
			this.list[index].translateY += (this.listLength - this.list[index].index)*90
			for (let i = 0; i < this.list.length; i++) {
				if (this.list[i].index > this.list[index].index && this.list[i].index < this.listLength) {
					this.list[i].translateY -= 90
					this.list[i].index -= 1
				}
			}
			this.listLength -= 1
			this.list[index].index = this.listLength
		}
	}
}
</script>

<style scoped>
.arrow {
	height: 25px;
	width: 25px;
	margin-top: 34px;
	transform: rotateZ(-90deg);
	margin-right: 25px;
}
.qkj-list {
	z-index: 9999;
	background: white;
	height: auto;
	width: 100%;
	line-height: 90px;
	letter-spacing: 2px;
	font-size: 34px;
	font-weight: 100;
}
.qkj-list--fixed {
	position: fixed;
	top: 620px;
}
.qkj-list ul {
	width: 100%;
	height: auto;
}
.qkj-list__text {
	margin-left: 30px;
	flex: 1;
}
.qkj-list__toolbar {
	position: absolute;
	right: 0;
	left: 0;
	top: -90px;
	transform-origin: 50%;
	transition: all .5s;
	background: #ececec;
	transform-origin: bottom;
	transform: scaleY(0);
	opacity: 0;
}
.qkj-list__toolbar--show {
	transform: scaleY(1);
	opacity: 1;
}
.qkj-list__toolbar .manage {
	margin-right: 30px;
}
.qkj-list__other {
	background: #ececec;
	transition: all .5s;
	height: auto;
}
.qkj-list__content--edit {
	transform: translateX(60px);
}
.qkj-list__edit {
	position: absolute;
	width: 60px;
	height: 60px;
	border-top: 15px;
	border-bottom: 14px;
	border-style: solid;
	border-color: #fff;
	top: 0;
	left: -60px;
	background: #fff;
}
.arrow--up {
	transform: rotateZ(180deg) translate(-5px)
}
#qkj-list__more {
	display: block;
	text-align: center;
	color: gray;
}
.arrow--down {
	transform: rotateZ(0deg) translate(10px,5px);
}
.transition {
	transform-origin: top;
	transition: all .5s;
}
.qkj-list__wrapper {
	transition: all .5s;
	transform-origin: top;
	transform: scaleY(0);
}
.qkj-list .qkj-list__content,li {
	height: 90px;
	width: 100%;
	display: flex;
	justify-content: space-between;
	background: #fff;
}
.qkj-list__content {
	position: relative;
	z-index: 9999;
}
.qkj-list__content:after {
	content: '';
	position: absolute;
	right: 0;
	left: 0;
	bottom: 0;
	height: 1px;
	background: #cfcfcf;
	transform: scaleY(.5)
}
</style>
