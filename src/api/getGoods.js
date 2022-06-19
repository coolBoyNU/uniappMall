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
//# sourceMappingURL=getGoods.js.map