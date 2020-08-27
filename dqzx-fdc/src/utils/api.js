import {get,post} from './http'

export const gethuxinType = data => get("/api/type/buy", data,null);

export const getTokenApi = code => get("http://api.zjlaishang.com/token", code); //获取token

export const getJsSdkApi = data => post("http://api.zjlaishang.com/jssdksign", data); //获取jssdk


export const getzoneType = data => get("/api/type/area", data);



