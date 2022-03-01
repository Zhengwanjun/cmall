<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {        //父子组件通信父传子
    path: String,
    activeColor: {
      typeof: String,
      default: "red"
    }
  },
  data() {
    return {
      // isActive: false,
    };
  },
  computed: {
    isActive(){
      //当前活跃属性，动态决定，处于活跃的组件为true
      //indexOf() == -1 就是this.$route.path中没有找到this.path字符串
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle() {
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path).catch(err=>{})
    }
  }
};
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}

.tab-bar-item img {
  height: 20px;
  width: 20px;
  margin-top: 3px;
  vertical-align: middle; /* 去掉图片与字体之间的空白 默认3px */
  margin-bottom: 2px;
}


</style>