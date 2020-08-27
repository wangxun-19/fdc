import router from "../router/index";
import store from '../store/index'
import { getJsSdkApi } from "../utils/api.js"

export default {
    init(jsApiList = []){
        let wxurl = location.href.split('#')[0];
        let htmlurl = wxurl;
        // let htmlurl = encodeURIComponent(wxurl)
        if(navigator.userAgent.indexOf('iPhone') !== -1){
            console.log('ios');
            htmlurl = location.href.split('#')[0];
            // wxurl = window.location+'';
        }
        console.log(wxurl);
        return new Promise((resolve,reject)=>{
            getJsSdkApi({
                url: htmlurl
            })
                .then(res=>{
                    if(res.code === 200){
                        wx.config({
                            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                            appId: res.data.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
                            timestamp: res.data.timestamp, // 必填，生成签名的时间戳
                            nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
                            signature: res.data.signature, // 必填，签名，见附录1
                            jsApiList: res.data.jsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                        });
                        wx.ready(()=>{
                            resolve(wx);
                        })
                        wx.error((err)=>{
                            console.log(err);
                            reject();
                        })
                    }else if(res.code === 400){
                        this.$toast.fail({
                            message: res.msg,
                            duration: 1200,
                            forbidClick: true
                        });
                    }
                })
                .catch(err=>{
                    if(!err.message){
                        router.push('/')
                    }
                })
        })
    }
}