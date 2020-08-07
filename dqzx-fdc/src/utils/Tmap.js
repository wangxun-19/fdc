export function TMap(app_key) {
    return new Promise(function (resolve,reject) {
        window.init = function () {
            resolve(qq);
        }
        let script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://webapi.amap.com/maps?v=1.4.15&key="+app_key;
        script.onerror = reject;
        document.body.appendChild(script);
    })
}