import { createSSRApp } from "vue";

// 封装的展示消息提示的方法
import "./utils/Dog"


import App from "./App.vue";
export function createApp() {
  const app = createSSRApp(App);
  return {
    app,
  };
}
