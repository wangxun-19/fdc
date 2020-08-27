import Vue from 'vue'
import App from './App.vue'
import router from "./router/index";
import store from "./store/index";
import { Toast } from 'vant'
import Qs from 'qs'

import './assets/iconfont/iconfont.css'

import * as apis from "./utils/api";
Vue.prototype.$apis = apis;

import wxMethod from "./utils/wxMethod";
import wxSdk from "./utils/wx-sdk";
Vue.prototype.$axios = axios;
Vue.prototype.$wxMethod = wxMethod;
Vue.prototype.$wxsdk = wxSdk;
Vue.prototype.$toast = Toast;
Vue.prototype.$qs = Qs;
import way from "./utils/CodeDeal";
Vue.use(Toast);

Vue.config.productionTip = false
axios.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded";
axios.defaults.timeout = 100000;

axios.interceptors.request.use(
  config => {
    config.cancelToken = new axios.CancelToken(function(cancel) {
      store.commit("pushToken", { cancelToken: cancel });
    });
    
    const token = store.state.token;
    token && (config.headers.token = token);
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
)

axios.interceptors.response.use(
  response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    // console.log(response);
    if (response.status === 200) {
        console.log(response);
      way.codeDeal(response.data);
      return Promise.resolve(response);
    }else if(response.status == 0){
      console.log('response')
    }else {
      return Promise.reject(response);
    }
  },

  error => {
    console.log(error);
    store.commit("clearToken"); // 报错后取消后续请求
    if (error.message === "路由跳转取消请求") {
      console.log("路由跳转取消请求");
      return Promise.reject(error);
    }
    if (error.response&&error.response.status) {
      console.log(error.response.status);
      return Promise.reject(error.response);
    } else if (error.request) {
      console.log(error.request);
      return Promise.reject(error.request);
    } else {
      return Promise.reject(error);
    }
  }
);

router.beforeEach((to, from, next) => {
  store.commit("clearToken"); // 路由跳转取消请求
  document.title = to.meta.title; //让页面显示路由对应的name值。
  let toPath = to.path;
  if (toPath === "/error") {
      next();
      return;
  }
  next();
});

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
