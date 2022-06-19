// 封装的展示消息提示的方法
(uni as any).$DogMsg = function(title:string ='数据加载失败',duration:number = 1500):void{
  uni.showToast({
    title,
    duration,
    icon:"none"
  })
}

