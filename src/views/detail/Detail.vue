<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content" ref="scroll">
      <detail-swiper :topImg="topImg" />

      <detail-base-info :goods="goods" />

      <detail-shop-info :shop="shop" />

      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>

      <detail-param-info :paramInfo="paramInfo"/>

      <detail-comment-info :commentInfo="commentInfo"/>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/content/scroll/Scroll";
import { getDetail, GoodsInfo, Shop, GoodsParam } from "network/detail.js";

import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue"
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImg: [],
      goods: {}, //goods是对象，空对象不能用null
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
    };
  },
  components: {
    Scroll,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,

  },
  created() {
    this.iid = this.$route.params.iid;
    getDetail(this.iid).then((res) => {
      console.log(res);
      const data = res.result;
      //1.获取顶部轮播图数据
      this.topImg = data.itemInfo.topImages;
      //2.获取商品信息
      this.goods = new GoodsInfo(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //3.获取店铺信息
      this.shop = new Shop(data.shopInfo);
      //4.获取商品详情页信息
      this.detailInfo = data.detailInfo;
      //5.获取商品参数信息
      this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)
      //6.获取商品评论信息
      if(data.rate.cRate!==0){
        this.commentInfo=data.rate.list[0]
      }

    });
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
    }
  },
};
</script>

<style scoped>
#detail {
  background-color: #fff;
  position: relative;
  z-index: 9;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px);
  background-color: #fff;
}
</style>