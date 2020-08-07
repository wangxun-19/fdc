import {get,post} from './http'

export const gethuxinType = data => get("/api/type/buy", data,null);

export const getTokenApi = code => get("http://api.zjlaishang.com/token", code); //获取token

//export const reFreshTokenApi = code => get("/refreshtoken", code); //刷新token

export const getJsSdkApi = data => post("http://api.zjlaishang.com/jssdksign", data); //获取jssdk

// export const getTokenApi = code =>
//     get("http://dqzx-user-oauth-api.zjdqzx.com/token?app_id=2020657039609807", code, "auth",null); //获取token

// export const getJsSdkApi = data => post("http://dqzx-main-api.zjdqzx.com/jssdksign", data, "main");

export const getzoneType = data => get("/api/type/area", data);



