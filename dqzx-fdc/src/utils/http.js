import axios from "axios";
import Qs from 'qs'

axios.defaults.timeout = 1000000

export function get (url,params) {
    return new Promise((reslove,reject)=>{
        axios.get(url,{
            params:params,

        }).then(function (res) {
            reslove(res.data)
        }).catch(function (err) {
            reject(err);
        })
    })
}

export function post(url,params) {
    return new Promise((reslove,reject)=>{
        axios.post(url,Qs.stringify(params))
            .then(function (res) {
                reslove(res.data);
            })
            .catch(function (err) {
                reject(err);
            })
    })
}