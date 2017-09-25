<template>
	<div class="qkj-header">
		<!-- 导航栏 -->
		<qkj-navbar2></qkj-navbar2>
		<!-- 导航列表 -->
		<qkj-list></qkj-list>
	</div>
</template>

<script>
import QkjNavbar2 from '@/components/QkjNavbar2/QkjNavbar2.vue'
import QkjList from '@/components/QKjList/QkjList.vue'
export default {
	name: 'QkjHeader',
	components: {
		QkjNavbar2,
		QkjList
	}
}	
</script>
<style scoped>
.qkj-header {
	width: 100%;
	height: auto;
}
</style>
