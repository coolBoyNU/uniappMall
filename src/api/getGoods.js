import uniAxsi from './Request';
//轮播图
export function getSwiper() {
    return uniAxsi.get('/api/public/v1/home/swiperdata');
}
//分类导航
export function getNav() {
    return uniAxsi.get('/api/public/v1/home/catitems');
}
//楼层
export function getFloor() {
    return uniAxsi.get('/api/public/v1/home/floordata');
}
//分类
export function getCate() {
    return uniAxsi.get('/api/public/v1/categories');
}
// 获取搜索建议
export function getSearch(data) {
    return uniAxsi.get('/api/public/v1/goods/qsearch', { query: data });
}
//# sourceMappingURL=getGoods.js.map