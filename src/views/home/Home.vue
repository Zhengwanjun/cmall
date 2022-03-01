<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
        :title="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabcontrol1"
        v-show="isTabControlShow"
        class="tab-control"
      />
    <scroll
      class="content"
      ref="scroll"
      :probeType="3"
      :pullUpLoad="true"
      @scroll="backtopScroll"
      @pullingUp="loadMore"
      
    >
      <home-swiper :banners="banners"
      @swiperImgLoad="swiperLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
        :title="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      />
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShow"></back-top>
    <!-- vue2中组件内不可以直接使用@click，需要加上.native。监听整个组件的点击。
    （vue3 废弃了此用法） -->
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper.vue";
import RecommendView from "./childComps/RecommendView.vue";
import FeatureView from "./childComps/FeatureView.vue";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import BackTop from "components/content/backTop/BackTop";
import Scroll from "components/content/scroll/Scroll";

import GoodsList from "components/content/goods/GoodsList";

import { getHomeMultidata, getHomeGoods } from "network/home";
import {debounce} from "common/utils"
export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    BackTop,
    Scroll,

    GoodsList,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShow: false,
      isTabControlShow: false,
      tabOffsetTop:0,
      saveY:0,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  created() {
    //1.请求多个数据
    this.getHomeMultidata();
    //2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell"); //接口更改。
    // getHomeGoods('pop',1).then(res => {
    //   console.log(res)
    // })
   
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh,500); 
    /*
    这里refresh虽然是一个局部变量，但是由于下面的箭头函数是一个闭包，所以不会被销毁
    */
     this.$bus.$on('itemImgLoad',() => {//事件总线，监听itemImgLoad 事件名称，回调函数
      // this.$refs.scroll.refresh(); //这样直接使用调用过于频繁
      refresh()
    })
  },
  activated(){
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY()
  },
  methods: {
    /* 
    事件监听相关
    */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabcontrol1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {//回到顶部
      this.$refs.scroll.scrollTo(0,0,500);
            
    },  
    backtopScroll(position) {
      //监听回到顶部位置
      this.isShow = (-position.y) > 1000;
      //监听tabcontrol是否显示
      this.isTabControlShow = (-position.y) > this.tabOffsetTop;
      
    },
    loadMore(){
      this.getHomeGoods(this.currentType);
    },
    swiperLoad(){
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
        console.log(this.$refs.tabControl2.$el.offsetTop);//拿到tabcontrol的offsettop
      },
    /*
     *网络请求相关
     */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },

    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
//  调用finshPullUp方法，每次PullingUp之后，如果不使用这个finsh的，就无法进行下一次上拉加载
        this.$refs.scroll.finshPullUp();

      });
    },
  },
};
</script>

<style scoped>
/* scoped ：这里的style只对本组件内有影响 */
.home {
  /* padding-top: 44px; */
  height: 100vh;
  /* vh vm视口高度和宽度 */
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}

.content {
  /* height: calc(100% - 44px - 49px); */
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
.tab-control{
  position: relative;
  z-index: 9;
  /* relative相对定位，增加层级 */
  /* top: 0px; */
}

</style>