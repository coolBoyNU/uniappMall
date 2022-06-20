<template>
  <view class="home">
    <!-- 自定义搜索组件 -->
    <view class="search-box">
    <my-search @clickInput='gotoSearch'></my-search>
    </view>
    <!-- 轮播图 -->
    <swiper indicator-dots autoplay circular indicator-active-color="#dddddd">
      <swiper-item v-for="(item, i) in swiperList" :key="i">
        <navigator :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id" class="swiper-item"><image :src="item.image_src"></image></navigator>
      </swiper-item>
    </swiper>

    <!-- 分类导航 -->
    <view class="nav-list">
      <view class="nav-item" v-for="(item, i) in navList" :key="i" @click="navClickHandler(item)"><image :src="item.image_src" class="nav-img"></image></view>
    </view>

    <!-- 楼层 -->
    <view class="floor-list">
      <view class="floor-item" v-for="(item, i) in floorList" :key="i">
        <image :src="item.floor_title.image_src" class="floor-title"></image>
        <view class="floor-img-box">
          <view class="left-img-box">
            <image :src="item.product_list[0].image_src" mode="widthFix" :style="{width: item.product_list[0].image_width+'rpx'}"></image>
          </view>
          <view class="right-img-box">
            <view class="right-img-item" v-for="(item2,i2) in item.product_list" :key="i2">
              <view class="right-img-if" v-if="i2 !== 0">
                  <image :src="item2.image_src" mode="widthFix" :style="{width: item2.image_width + 'rpx'}"></image>
              </view>
            </view>
          </view>
        </view>
        </view>
    </view>
  </view>
</template>

<script>
import { getSwiper, getNav, getFloor } from '../../api/getGoods.js';
export default {
  data() {
    return {
      swiperList: [], //轮播图
      navList: [], //分类导航的数据列表
      floorList: [] //楼层的数据列表
    };
  },
  onLoad() {
    this.getSwiperList(); //轮播图
    this.getNavList(); //分类导航
    this.getFloorList(); //楼层
  },
  methods: {
    async getSwiperList() {
      const { data } = await getSwiper();
      if (data.meta.status !== 200) return uni.$DogMsg();
      this.swiperList = data.message;
    },
    async getNavList() {
      const { data: res } = await getNav();
      if (res.meta.status !== 200) return uni.$DogMsg();
      this.navList = res.message;
    },
    navClickHandler(item) {
      if (item.name === '分类') {
        uni.switchTab({
          url: '/pages/cate/cate'
        });
      }
    },
    async getFloorList() {
      const { data: res } = await getFloor();
      if (res.meta.status !== 200) return uni.$DogMsg();
      this.floorList = res.message;
    },
    gotoSearch(){
      //跳转分包中的搜索页面
      uni.navigateTo({
        url:'/subpkg/search/search'
      })
    }
  }
};
</script>

<style lang="scss">
  //设置收缩框 吸顶效果
  .search-box{
    position: sticky;
    top: 0;
    z-index: 999;
  }
  
//轮播图
swiper {
  height: 330rpx;

  .swiper-item,
  image {
    width: 100%;
    height: 100%;
  }
}

//导航
.nav-list {
  display: flex;
  justify-content: space-around;
  margin: 15px 0;
  .nav-img {
    width: 120rpx;
    height: 140rpx;
  }
}

//楼层
.floor-item {
.floor-title{
  display: flex;
  width: 100%;
  height: 60rpx;
  }
  .floor-img-box{
    display: flex;
    padding-left: 10rpx;
  .right-img-box{
  display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  }
}
</style>
