<template>
  <view class="my-search-container" :style="{'background-color':bgcolor}">
    <!-- 是用 view 组件模拟input 输入框的样式 -->
    <view class="my-search-box" :style="{'border-radius':radius+'px'}" @click="searchBoxHandler">
      <uni-icons type="search" size="17" color="#aaa"></uni-icons>
      <text class="placeholder">搜索</text>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-search",
    props:{
      //背景色
      bgcolor:{
        type:String,
        default:'#1296db'
      },
      //圆角尺寸
      radius:{
        type:Number,
        //单位 px
        default:18
      }
    },
    data() {
      return {
        wh:0,
      };
    },
    onLoad() {
      const sysInfo = uni.getSystemInfoSync();
      this.wh = sysInfo.windowHeight - 50;
    },
    methods:{
      //点击模拟的 input 输入框
      searchBoxHandler(){
        // 触发外界通过 @click 绑定的click 事件处理函数
        this.$emit('clickInput')
      }
    }
  }
</script>

<style lang="scss">
  .my-search-container{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 40px;
    
    .my-search-box{
      width: 90%;
      line-height: 30px;
      font-size: 15px;
      color: #aaaaaa;
      text-align: center;
      background-color: #fff;
    }
  }
</style>