"use strict";
// 封装的展示消息提示的方法
uni.$DogMsg = function (title = '数据加载失败', duration = 1500) {
    uni.showToast({
        title,
        duration,
        icon: "none"
    });
};
//# sourceMappingURL=Dog.js.map