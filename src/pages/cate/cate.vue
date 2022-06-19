<template>
  <view>
    <view class="scroll-view-container">
      <!-- 左边滚动区域 -->
      <scroll-view class="left-scroll-view" scroll-y :style="{height:wh+'px'}">
        <block v-for="(item,i) in cateList" :key="i">
        <view :class="['left-scroll-view-item', i===activeS ? 'active' : '']" @click="activeChanged(i)">{{item.cat_name}}</view>
        </block>
        </scroll-view>
        <!-- 右边滚动视图区域 -->
        <scroll-view class="right-scroll-view" scroll-y :style="{height:wh+'px'}" :scroll-top="scrollTop">
          <view class="cate-lv2" v-for="(itemTwo,iTwo) in cateLevel2" :key="iTwo">
            <view class="cate-lv2-title">{{itemTwo.cat_name}}</view>
            <!-- 动态渲染三级分类数据列表 -->
            <view class="cate-lv3-list">
              <!-- 三级分类 Item 项 -->
              <view class="cate-lv3-item" v-for="(itemThree,iThree) in itemTwo.children" :key="iThree" @click="gotoGoodsList(itemThree)">
                <!-- 图片 -->
                <image :src="itemThree.cat_icon" mode="widthFix"></image>
                <!-- 文本 -->
                <text>{{itemThree.cat_name}}</text>
              </view>
            </view>
            
          </view>
          
        </scroll-view>
    </view>
  </view>
</template>

<script>
  import {getCate}  from  '../../api/getGoods.js'
  
  export default {
    data() {
      return {
        wh:0, //窗口的可用高度 = 屏幕高度 - navigationBar高度 - tabBar 高度
        cateList:[], //分类数据列表
        activeS:0, //当前选中项的索引，默认让第一项被选中
        cateLevel2:[], //二级分类列表
        scrollTop:0, //滚动条距离顶部的距离
      
      };
    },
    onLoad() {
     const sysInfo = uni.getSystemInfoSync(); //获取当前系统的信息
      this.wh = sysInfo.windowHeight; 
      this.getCateList(); //获取分类数据
    },
    methods:{
     async getCateList(){
       const {data:res} = await getCate();
       if(res.meta.status !== 200) return uni.$DogMsg()
       this.cateList = res.message
       //二级分类数据
       this.cateLevel2 = res.message[0].children
     },
     activeChanged(i){
        //左侧点击事件
        this.activeS = i; // 选中项改变的事件处理函数
        // 为二级分类列表重新赋值
        this.cateLevel2 = this.cateList[i].children
        
        // 让 scrollTop 的值在 0 与 1 之间切换
       this.scrollTop = this.scrollTop ? 0 : 1
     },
     gotoGoodsList(itemThree){
       //点击三级分类跳转到商品列表页面
       uni.navigateTo({
         url:'./subpkg/goods_list/goods_list?cid='+itemThree.cat_id
       })
       
     }
    }
  }
</script>

<style lang="scss">
  .scroll-view-container{
    display: flex;
    
    .left-scroll-view{
      width: 120px;
      
      .left-scroll-view-item{
        line-height: 60px;
        background-color: #f7f7f7;
        text-align: center;
        font-size: 12px;
        
        // 激活项的样式
        &.active{
          position: relative;
          background-color:#fff;
          
          //熏染激活项左侧的红色指示边线
          &::before{
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            content: ' ';
            display: block;
            width: 3px;
            height: 30px;
            background-color: #3fa4e7;
          }
        }
      }
    }
    //二级列表
    .cate-lv2-title{
      font-size: 12px;
      font-weight: bold;
      text-align: center;
      padding: 15px 0;
    }
    //美化三级分类
    .cate-lv3-list{
      display: flex;
      flex-wrap: wrap;
      
      .cate-lv3-item{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 33.33%;
        margin-bottom: 10px;
        
        image{
          width: 60px;
          height: 60px;
        }
        
        text{
          font-size: 12px;
        }
      }
    }
  }
</style>
