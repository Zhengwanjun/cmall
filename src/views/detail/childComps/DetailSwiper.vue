<template>
    <swiper class="detail-swiper">
      <swiper-item v-for="item in this.topImg" :key="item.id">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
</template>

<script>
import {Swiper , SwiperItem} from "components/common/swiper"
export default {
  props:{
    topImg:{
      type: Array,
      default() {
        []
      }
    }
  },
  data() {
    return {

    }
  },
  components: {
    Swiper,
    SwiperItem
  }
}
</script>

<style scoped>
.detail-swiper {
  height: 300px;
}
</style>