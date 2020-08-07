import baseInfo from './utils/config';
function getQueryString(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if(r != null){
        return unescape(r[2]);
    }
    return null;
}

function getAuth() {
    
}

export default{
    getAuth(){
        let appid = baseInfo.appId
        let type = getQueryString("type");
        let code = getQueryString("code");
        let token = localStorage.getItem("token");
        let redirect = baseInfo.axiosUrl;
        let type1 = (type == undefined)?'house':type;
        if( code == null||code == ""){
            location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="
                          +appid+"&redirect_uri="+
                          encodeURIComponent(
                              redirect+"/auth.html?type="+"house"
                          )+"&response_type=code&scope=snsapi_userinfo&state=WXPROJ1#wechat_redirect";
        }else{
            console.log(code);
            // window.location.href = baseInfo.visitUrl + "/?code=" + code;
        }
    }
};