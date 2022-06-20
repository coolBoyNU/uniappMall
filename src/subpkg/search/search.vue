<template>
  <view class="search">
  <view class="search-box">
    <!-- 使用uni-ui 收缩组件 -->
    <uni-search-bar @input="input" :radius="100" cancelButton="none"></uni-search-bar>
  </view>
  <!-- 建议列表 -->
  <view class="sugg-list" v-if="searchResults.length !== 0">
    <view class="sugg-item" v-for="(item,i) in searchResults" :key="i" @click="gotoDetail(item.goods_id)">
      <view class="goods-name">{{item.goods_name}}</view>
      <uni-icons type="arrowright" size="16"></uni-icons>
    </view>
  </view>
    <!-- 搜索历史 -->
    <view class="history-box" v-else>
      <!-- 标题区域 -->
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="17" @click="cleanHistory"></uni-icons>
      </view>
      <!-- 列表区域 -->
      <view class="history-list">
        <uni-tag :text="item" v-for="(item,i) in history" :key="i">
          <view class="history-record"  @click="gotoGoodsList(item)">
            {{item}}
          </view>
        </uni-tag>
      </view>
    </view>
      
  </view>
</template>

<script>
  import {getSearch} from '../../api/getGoods.js'
  export default {
    data() {
      return {
        timer:null, // 延时器 timerId
        kw:'',  //搜索关键字
        searchResults:[], //搜索结果列表
        historyList:[], // 搜索关键字历史
      };
    },
    onLoad() {
      this.historyList = JSON.parse(uni.getStorageSync('kw')||'[]')
    },
    computed:{
      history(){
        // 注意：由于数组是引用类型，所以不要直接基于原数组调用 reverse 方法，以免修改原数组中元素的顺序
            // 而是应该新建一个内存无关的数组，再进行 reverse 反转
            return [...this.historyList].reverse()
      }
    },
    methods:{
      input(e){
        // 搜索框的防抖处理
        //清楚 timer 对应的延时器
        clearInterval(this.timer);
        //重新启动一个延时器，并把 timerId 赋值给 this.timer
        this.timer = setTimeout(()=>{
         // 如果 500 毫秒内，没有触发新的输入事件，则为搜索关键词赋值\
        this.kw = e
        //调用搜索接口
        this.getSearchList()
        },500)
      },
      async getSearchList(){
        //判断关键字是否为空
        if(!this.kw){
          this.searchResults = []
          return
        }
        const {data:res} = await getSearch(this.kw)
        if(res.meta.status !== 200) return uni.$DogMsg()
        this.searchResults = res.message
        //查询到搜索建议之后，调用saveSearchHistory() 保存关键字
        this.saveSearchHistory()
      },
      gotoDetail(goods_id){
        uni.navigateTo({
          url:'/subpkg/goods_detail/goods_detail?goods_id='+goods_id
        })
      },
      saveSearchHistory(){
        //保存搜索关键字
        // 将数组转化为 set 对象
        const set = new Set(this.historyList)
        //调用set对象的 delete 方法，移除对应的元素
        set.delete(this.kw)
       //调用set对象的 add 方法，向 set 中添加元素
        set.add(this.kw)
        //将set对象转化为数组
        this.historyList = Array.from(set)
        //调用 uni.setStorageSync(key,value) 将搜索历史保存到本地
        uni.setStorageSync('kw',JSON.stringify(this.historyList))
      },
      cleanHistory(){
        //清空历史记录
        this.historyList = []
        //清空本地存储
        uni.setStorageSync('kw','[]')
      },
      gotoGoodsList(kw){
        uni.navigateTo({
          url:'/subpkg/goods_list/goods_list?query='+kw
        })
      }
    }
    
  }
</script>

<style lang="scss">
.search-box{
  position: static;
  top: 0;
  background-color: #1296db;
  z-index: 999;
}
.sugg-list{
   padding: 0 5px;
   
   .sugg-item{
     display: flex;
     justify-content: space-between;
     align-items: center;
     font-size: 12px;
     padding: 13px 0;
     border-bottom: 1px solid #efefef;
     
     .goods-name{
       // 文字不允许换行（单行文本)
       white-space: nowrap;
       //溢出隐藏
       overflow: hidden;
       //文本溢出后用 ... 代替
       text-overflow: ellipsis;
       margin-right: 3px;
     }
   }
 }
 
 // 搜索历史
 .history-box{
   padding: 0 5px;
   
   .history-title{
     display: flex;
     justify-content: space-between;
     align-items: center;
     height: 40px;
     font-size: 13px;
     border-bottom: 1px solid #efefef;
   }
   
   .history-list{
     display: flex;
     flex-wrap: wrap;
     
     uni-tag{
       margin: 4px;
       .history-record{
         border-radius: 4px;
         padding: 4px;
         background-color: #0000000b;
       }
     }
   }
 }
</style>
