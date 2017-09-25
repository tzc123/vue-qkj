<template>
	<div @touchstart="handleTouchStart" v-show="show" class="qkj-input">
		<transition name="duang">
			<div @touchstart.stop="()=>{}" @change="handleChange" v-show="inputShow" class="qkj-wrapper">
				<input ref="inp" type="text">
			</div>
		</transition>
	</div>
</template>

<script>
export default {
	name: 'QkjInput',
	data() {
		return {
			show: false,
			inputShow: false
		}
	},
	computed: {
		focus() {
			return this.$store.state.input.focus
		}
	},
	watch: {
		focus() {
			if (!this.show) {
				this.show = true
				this.inputShow = true
				this.$nextTick(() => {
					this.$refs.inp.focus()
				})
			}
		}
	},
	methods: {
		handleTouchStart() {
			this.inputShow = false
			setTimeout(() => {
				this.show = false
			}, 500)
			this.$refs.inp.blur()
		},
		handleChange(e) {
			alert(e.target.value)
		}
	}
}
</script>

<style scoped>
.qkj-input {
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
}
.qkj-wrapper {
	right: 0;
	left: 0;
	bottom: 0;
	height: 100px;
	line-height: 100px;
	padding: 20px 30px 0 30px;
	background: #ececec;
	position: absolute;
	/* animation: duang .5s; */
}
.qkj-input input {
	width: 100%;
	height: 60px;
	border-radius: 10px;
	outline: none;
	font-size: 40px;
}
/* @keyframes duang {
	from{
		transform: translateY(100px)
	}
	to{
		transform: translateY(0)
	}
} */
.duang-enter-active, .duang-leave-active {
	transition: all .5s ease 
}    
.duang-enter, .duang-leave-active {
	transform: translateY(100px)
}

</style>
