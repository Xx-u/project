//request.js 中对axios做二次封装
import store from "@/store";
import axios from "axios";


//创建一个请求的服务
const http = axios.create({
    //设置请求地址的base地址
    baseURL: "http://shop.bluej.cn/api",
    //单位 ms
    timeout: 5000,
});


http.interceptors.request.use(config => {
    let token = store.state.user.token
    //判断有没有token
    if (token) {
        config.headers['x-token'] = token
    }
    return config
})


export const post = (url, body) => {
    return new Promise((resolve, reject) => {
        http
            .post(url, body, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                resolve(res);
                // console.log(res);
            })
            .catch((err) => {
                reject(err);
                // console.log(err.response.data.msg);
            });
    });
};


export const postT = (url, body) => {
    return new Promise((resolve, reject) => {
        http
            .post(url, body, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                resolve(res);
                // console.log(res);
            })
            .catch((err) => {
                reject(err);
                // console.log(err.response.data.msg);
            });
    });
};


export const get = (url, params) => {
    return new Promise((resolve, reject) => {
        http.get(url, { params }).then(
            (response) => {
                resolve(response.data);
            },
            (err) => {
                reject(err);
            }
        );
    });
};

export const del = (url, params) => {
    return new Promise((resolve, reject) => {
        http.delete(url, { params }).then(
            (response) => {
                resolve(response.data);
            },
            (err) => {
                reject(err);
            }
        );
    });
};

export const put = (url, body) => {
    return new Promise((resolve, reject) => {
        http.put(url, body).then(
            (response) => {
                resolve(response.data);
            },
            (err) => {
                reject(err);
            }
        );
    });
};


// axios.post()

// axios.get()
