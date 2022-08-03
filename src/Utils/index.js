// 封装项目常用的工具函数

// 缓存数据 获取与设置
export function setSession (name, data) {
    let res = JSON.stringify(data)
    sessionStorage.setItem(name, res)
}
export function getSession (name) {
    let res = sessionStorage.getItem(name)
    return JSON.parse(res)
}

//防抖节流
export function delayPrint (delay, callback) {
    let timer = null;
    return function () {
        if (timer) {
            clearInterval(timer);
        }

        timer = setTimeout(function () {
            callback();
        }, delay);
    };
}

// 加载动画
import { Toast } from "vant";
export function toast (message) {
    Toast.loading({
        duration: 100,
        message: message,
        forbidClick: true,
        loadingType: 'spinner',
    });
}