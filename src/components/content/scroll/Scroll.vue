<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    //创建scroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      // better-scroll中，除了button 其他的标签想监听点击的话需要加上click:true
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    });

    //监听滚动的位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", (position) => {
        this.$emit("scroll", position);
      });
    }

    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        console.log("上拉加载");
        this.$emit("pullingUp")
      });
    }
  },
  methods: {
    scrollTo(x, y, time = 300) {
      // this.scroll.scrollTo(x,y,time);
      this.scroll && this.scroll.scrollTo(x, y, time); //&&逻辑与： 前面错了就不执行后面
    },
    finshPullUp() {
      this.scroll.finishPullUp();
    },
    //刷新（由于图片是异步加载的，刚开始滚动的时候可滚动区域不包括图片的长度 ，所以上拉一次就要刷新以下
    //放在所用的home.vue
    refresh() {
      this.scroll && this.scroll.refresh(); //因为在home中有可能出现home中的东西加载的速度过快，导致scroll这里还没有创建完成，就拿不到回调函数
      console.log("调用refresh");
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  },
};
</script>

<style scoped>
</style>