import Qs from 'qs'

// axios.defaults.timeout = 100000;

export function get (url,params) {
    return new Promise((resolve, reject) => {
        axios
            .get(url, { params: params })
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                //console.log(err)
                console.log("get", err);
                reject(err);
            });
    });
}

export function post(url,params) {
    return new Promise((resolve, reject) => {
        axios
            .post(url, Qs.stringify(params))
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                console.log("post", err);
                reject(err);
            });
    });
}