<template>
  <div id="app">
    <router-view></router-view>
    <qkj-tabbar @turnPage="turnPage" :currentPage="currentPage"></qkj-tabbar>
    <qkj-popup :show="show" :clientY="clientY">1111111</qkj-popup>
    <qkj-input :focus="inputFocus"></qkj-input>
  </div>
</template>

<script>
import QkjTabbar from '@/components/QkjTabBar/QkjTabBar.vue'
import QkjPopup from '@/components/QkjPopup/QkjPopup.vue'
import QkjInput from '@/components/QkjInput/QkjInput.vue'
export default {
  name: 'app',
  data() {
    return {
      currentPage: 0,
      show: false,
      clientY: 0,
      inputFocus: false
    }
  },
  mounted() {
    switch(this.$route.name) {
      case 'Home':
        this.currentPage = 0
      break;
      case 'About':
        this.currentPage = 1
      break;
      case 'MySpace':
        this.currentPage = 2
      break;
      case 'Discover':
        this.currentPage = 3
      break;
    }
  },
  methods: {
    turnPage(index) {
      this.currentPage = index
    },
    handleInput() {
      this.inputFocus = !this.inputFocus
    }
  },
  components: {
    QkjTabbar,
    QkjPopup,
    QkjInput
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
html,body{
  height: 100%;
  width: 100%;
  font-family: "Microsoft YaHei";
  letter-spacing: 1px;
}
</style>