<template>
  <view>
    <view class="goods-item">
      <!-- 商品左侧图片区域 -->
      <view class="goods-item-left">
        <image class="goods-pic" :src="goods.goods_small_logo || defaultPic" mode=""></image>
      </view>
      <!-- 商品右侧信息区域 -->
      <view class="goods-item-right">
        <!-- 商品标题 -->
          <view class="goods-name">{{goods.goods_name}}</view>
          <view class="goods-info-box">
            <!-- 商品价格 -->
            <view class="goods-price">
              &yen;{{tofiexd(goods.goods_price)}}
            </view>
          </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-goods",
    props:{
      goods:{
        type:Object,
        defaul:{},
      }
    },
    data() {
      return {
        //默认图片
        defaultPic:'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
        
      };
    },
    setup(){
      // // 把数字处理成带小数点的数字
      const tofiexd=((num)=>{
        return Number(num).toFixed(2)
      })
      return {tofiexd}
    }
  }
</script>

<style lang="scss">
.goods-item{
  display: flex;
  padding: 10px 5px;
  
  .goods-item-left{
    margin-right: 5px;
    
    .goods-pic{
      display: block;
      width: 100px;
      height: 100px;
    }
  }
  
  .goods-item-right{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    .goods-name{
      font-size: 13px;
    }
    
    .goods-price{
      font-size: 16px;
      color: #c00;
    }
  }
}
</style>