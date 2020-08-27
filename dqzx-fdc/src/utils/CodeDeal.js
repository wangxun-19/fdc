import router from "../router/index";
import baseInfo from "./config";
import store from "../store";
import { getTokenApi } from "../utils/api";
import {Toast} from 'vant';

export default {
    codeDeal(res){
        let myCode = res.code;
        if(myCode == 200){
            //保存token
            if (res.data&&res.data.token) {
                let token = res.data.token;
                let refresh_token = res.data.refresh_token;
                store.commit("saveToken", token);
                store.commit("saverefreshtoken", token);
            }
        }else if(myCode == 400){
            
        }else if(myCode == 401||myCode == 403){
            console.log("去获取token");
            this.toAuth();
        }else if (myCode === 405) {
            console.log("未关注");
            this.toRouter();
        }else if(myCode == 1001){
            // console.log("去获取token");
            // this.toAuth();
        } else {
            console.log("其他");
            // this.toError();
        }
    },
    toAuth(){
        localStorage.removeItem("token");
        sessionStorage.clear();
        localStorage.setItem("authBefore", window.location.href);
        router.push({name:'Auth'});
    },
    toRouter(){
        console.log('未关注');
    },
    getToken(code,cb){
        getTokenApi({
            code
        })
            .then(res=>{
                this.codeDeal(res);
                //this.getMyInfo();
                typeof cb == "function" && cb();
            })
            .catch(err=>{
                console.error(err);
            })
    },
    towxAuth(){
        console.log('auth');
        location.href = baseInfo.authUrl;
        // auth.getAuth();
    },
}