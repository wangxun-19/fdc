import {Toast} from 'vant';
import getquery from '../utils/getquery'
export default {
    data(){
        return{
            name:'mixin',
            isWx:false,
            bigBrowerHide: false //只能在手机上打开
        };
    },
    reload:["inject"],
    created(){
        this.allShare();
        this.hasToken();
        this.isWxBrowser();
        let oHtml = document.documentElement;
        let deviceWidth = oHtml.clientWidth || window.innerWidth;
        //this.$toast(deviceWidth);
        if (deviceWidth >= 750) {
            this.bigBrowerHide = true;
        }
    },
    methods:{
        allShare(){
            if (!this.$route.meta.myShare) {
                this.$wxMethod.share(
                    {
                        title: this.$route.meta.title, // 分享标题
                        desc: this.$route.meta.title, // 分享描述
                        icon:
                            "http://newhouse.zjlaishang.com/static//images/logo.jpg"
                    },
                    res => {
                        console.log("通用分享设置成功");
                    }
                );
            }
        },
        isWxBrowser() {
            let ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
                this.isWx = true;
            } else {
                this.isWx = false;
            }
        },
        hasToken(){
            let token = localStorage.getItem("token");
            // Toast((token == ''&&token == null&&token == undefined)?'true':token);
            if(token == ''&&token == null&&token == undefined){
                this.$router.push('/');
            }
            // if (token != ''&&token != null&&token != undefined) {
            //     this.$router.push()
            // } else {
            //     localStorage.setItem("authBefore", window.location.href);
            //     next("/");
            // }
        },
        //时间转化
        transTime(time, format) {
            //format
            //默认  2019-11-11 11:11
            //1 2019-11-11 11:11:11
            let newTime = new Date(time * 1000);
            let fullYear = newTime.getFullYear();
            let month = newTime.getMonth() + 1;
            let date = newTime.getDate();
            let hour = newTime.getHours();
            let minutes = newTime.getMinutes();
            let second = newTime.getSeconds();
            if (month < 10) {
                month = "0" + month;
            }
            if (date < 10) {
                date = "0" + date;
            }
            if (hour < 10) {
                hour = "0" + hour;
            }
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            if (second < 10) {
                second = "0" + second;
            }
            switch (format) {
                case 1:
                    return `${fullYear}-${month}-${date} ${hour}:${minutes}:${second}`;
                default:
                    return `${fullYear}-${month}-${date} ${hour}:${minutes}`;
            }
        },
        //到错误页
        toError() {
            console.log('wrong');
        }
    },
    beforeDestroy() {
        if (this.loadIcon) {
            console.log("取消loading");
            this.loadIcon.clear();
        }
    },
    getQueryString(name) {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        let r = window.location.search.substr(1).match(reg);
        if(r != null){
            return unescape(r[2]);
        }
        return null;
    },
    beforeRouteEnter(to, from, next) {
        let token = localStorage.getItem("token");
        let type = getquery.getQueryString("type");
        let code = getquery.getQueryString("code");
        let ua = window.navigator.userAgent.toLowerCase();
        if(type == "home"){
            window.location.href = "http://house.zjlaishang.com:9001?code="+code
        }

        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            if (to.path === "/" ) {
                next();
            } else {
                if (token) {
                    console.log(token)
                    next();
                } else {
                    localStorage.setItem("authBefore", window.location.href);
                    next("/");
                }
            }
        } else {
            if (to.path === "/") {
                next("/index/"+parseInt(Math.random()*100000));
            } else {
                next();
            }
        }
    }
}