<template>
  <view>
    <view class="goods-list">
      <view v-for="(goods,i) in goodsList" :key="i" @click="gotoDetail(goods)">
        <!-- 自定义组件动态绑定数据 -->
       <my-goods :goods="goods"></my-goods>
      </view>
    </view>
  </view>
</template>

<script>
  import {getGoods} from '../../api/getGoods.js'
  export default {
    data() {
      return {
        queryObj:{ //请求参数对象
          query:'', //查询关键字
          cid:'', //商品分类ID
          pagenum:1, //页码值
          pagesize:10 //每页显示多少条数据
        },
        goodsList:[], //商品数据列表
        total:0, //总数量，用来实现分页
        //默认图片
        defaultPic:'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
        isloading:false, //是否正在请求数剧
      };
    },
    onLoad(options) {
      //将页面参数转存到 queryObj
      this.queryObj.query = options.query || '';
      this.queryObj.cid = options.cid || '';
      this.getGoodsList();
    },
    onPullDownRefresh() {
      //清空数据
      this.queryObj.pagenum = 1
      this.total =0
      this.isloading = false
      this.goodsList = []
      //重新发起请求
      this.getGoodsList(()=>uni.stopPullDownRefresh())
    },
    onReachBottom() {
      //触底事件
      //判断是否还有下一页数据
      if(this.queryObj.pagenum * this.queryObj.pagesize >=this.total)return uni.$DogMsg('数据加载完毕!')
      //判断是否正在请求其它数据，如果是，则不发送额外的请求
      if(this.isloading) return
      //让页码加一
      this.queryObj.pagenum += 1
      //重新获取列表数据
      this.getGoodsList()
    },
    methods:{
      async getGoodsList(cb){
        //打开节流阀
        this.isloading = true
        const {data:res} = await getGoods(this.queryObj)
        //关闭节流
        this.isloading = false
        //只要数据请求完毕，就立即按需调用 cb 回调函数
         cb&&cb()
        if(res.meta.status !==200) return uni.$DogMsg()
        // 为数据赋值：通过展开运算符的形式，进行新旧数据拼接
        this.goodsList = [...this.goodsList, ...res.message.goods]
        this.total = res.message.total  
            
      },
      gotoDetail(item){
        uni.navigateTo({
          url:'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id
        })
      }
    }
    
  }
</script>

<style lang="scss">

</style>
