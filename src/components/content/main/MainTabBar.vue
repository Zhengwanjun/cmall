<template>
  <div id="main-tab-bar">
    <tab-bar>
      <tab-bar-item path="/home" activeColor="pink">
        <img slot="item-icon" src="~assets/img/tabbar/home.png" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/homeActive.png" alt="">
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category" activeColor="pink">
        <img slot="item-icon" src="~assets/img/tabbar/category.png" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/categoryActive.png" alt="">
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/shopcar" activeColor="pink">
        <img slot="item-icon" src="~assets/img/tabbar/shopcar.png" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/shopcarActive.png" alt="">
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/center" activeColor="pink">
        <img slot="item-icon" src="~assets/img/tabbar/center.png" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/centerActive.png" alt="">
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
    
  </div>
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar.vue'
import TabBarItem from 'components/common/tabbar/TabBarItem.vue'

export default {
  data() {
    return{
      
    }
  },
  components:{
    TabBar,
    TabBarItem
  }
}
</script>

<style scoped>
 
</style>