import Vue from 'vue'
import App from './App.vue'
import Vant from 'vant';
import 'vant/lib/index.css';
import 'vant/lib/icon/local.css';
import router from "./router/index";
import store from "./store/index";
import axios from "axios";
import ViewUI from 'view-design';
// import ElementUI from 'element-ui';
import 'view-design/dist/styles/iview.css';

import './assets/iconfont/iconfont.css'

import * as apis from "./utils/api";
Vue.prototype.$apis = apis;

import wxMethod from "./utils/wxMethod";
import wxSdk from "./utils/wx-sdk";
Vue.prototype.$axios = axios;
Vue.prototype.$wxMethod = wxMethod;
Vue.prototype.$wxsdk = wxSdk;
import baseInfo from "./utils/config";
import way from "./utils/CodeDeal";
// import auth from './auth';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import { InfiniteScroll } from 'mint-ui';

Vue.use(InfiniteScroll);



Vue.use(Vant);
Vue.use(ViewUI);
// Vue.use(ElementUI);
Vue.use(VueAwesomeSwiper);


Vue.config.productionTip = false

axios.interceptors.request.use(
  config => {
    config.cancelToken = new axios.CancelToken(function(cancel) {
      store.commit("pushToken", { cancelToken: cancel });
    });
    // 每次发送请求之前判断vuex中是否存在token
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
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
        // console.log(response);
      way.codeDeal(response.data);
      return Promise.resolve(response);
    }else if(response.status == 1001||response.status == 1002){
      console.log(response);
      way.codeDeal(response.data);
    } else {
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
      // console.log(error.response.status);
      return Promise.reject(error.response);
    } else if (error.request) {
      // console.log(error.request);
      return Promise.reject(error.request);
    } else {
      return Promise.reject(error);
    }
  }
);

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem("token");
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
