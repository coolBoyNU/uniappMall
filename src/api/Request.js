import { axsi } from '@escook/request-miniprogram';
let uniAxsi;
uniAxsi = axsi;
axsi.baseUrl = 'https://www.uinav.com';
// 请求开始之前做一些事情
axsi.beforeRequest = function () {
    // do somethimg...
    uni.showLoading({
        title: 'loading...'
    });
};
// 请求完成之后做一些事情
axsi.afterRequest = function () {
    // do something...
    uni.hideLoading();
};
export default uniAxsi;
//# sourceMappingURL=Request.js.map