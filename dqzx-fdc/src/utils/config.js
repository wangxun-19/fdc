
let axiosBaseURL, reditUrl, authUrl,axiosUrl;
if(process.env.NODE_ENV == "development"){
    axiosBaseURL = "http://house-api.zjlaishang.com:9001";
    axiosUrl = "http://www.zjlaishang.com"
    reditUrl = axiosUrl + "/?type=home"
    authUrl =
        "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0064a5ecb4bb49eb&redirect_uri=" +
        reditUrl+
        "&response_type=code&scope=snsapi_userinfo&state=WXPROJ1#wechat_redirect";
}else if(process.env.NODE_ENV == "production"){
    axiosBaseURL = "http://house-api.zjlaishang.com:9001"
    axiosUrl = "http://www.zjlaishang.com"
    reditUrl = axiosUrl + "/?type=home";
    authUrl =
        "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0064a5ecb4bb49eb&redirect_uri=" +
        reditUrl+
        "&response_type=code&scope=snsapi_userinfo&state=WXPROJ1#wechat_redirect";
}
export default {
    axiosBaseURL,
    reditUrl,
    authUrl,
    axiosUrl
}