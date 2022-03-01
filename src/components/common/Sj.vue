<template>
  <div id="box">
    <div class="luckName">
      <p ref="data">{{ lName }}</p>
    </div>
  </div>
</template>

<script>
//练习代码
// 循环滚动列表随机抽取一个人
export default {
  data() {
    return {
      items: [
        { name: "zhao" },
        { name: "qian" },
        { name: "sun" },
        { name: "li" },
        { name: "zhou" },
        { name: "wu" },
        { name: "zheng" },
      ],
      lName: "zheng",
      interval:null,
    };
  },
  computed: {},
  mounted() {
    this.createName();
  },
  beforeDestroy(){//注意，必须在页面销毁前关闭定时器，否则定时器会一直存在，一直进行操作，以前就遇到定时器没清除，造成浏览器内存溢出
    clearInterval(this.interval)
  },
  methods: {
    //随机拿一个名字
    getName() {
      const n = Math.floor(Math.random() * this.items.length + 1) - 1;
      return this.items[n].name;
    },
    //开始滚动方法，300毫秒显示一次名字
    createName() {
      const _this = this; //在定时器这个箭头函数中，this的作用域不在Vue而是在定时器，所以需要引入this

      const startTime = new Date().getTime();
      this.interval = setInterval(() => {
        _this.lName = _this.getName();
        const timeSub = new Date().getTime() - startTime;
        if(timeSub > 4000){
          _this.stopName();
        }
      }, 80);

    },
    //停止滚动
    stopName() {
      clearInterval(this.interval);
      console.log("时间到");
    },
    //倒计时停止滚动
    
  },
};
</script>

<style scoped>
.luckName {
  position: fixed;
  font-size: 100px;
  
}
</style>