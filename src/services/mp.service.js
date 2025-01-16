import Axios from "axios";
const http = Axios.create({
    baseURL: import.meta.env.VITE_API,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8;json/html; charset=UTF-8',
    }
});

export default http;

export function APIGetLayoutDetailByCode(layoutCode) {
    return new Promise(resolve => {
        http.get(`/GetLayoutDetailByCode/${layoutCode}`).then((res) => {
            resolve(res.data);
        })
    })
}

export function APIUpdateLayoutDetail(param) {
    return new Promise(resolve => {
        http.post(`/UpdateLayoutDetail`, param).then((res) => {
            resolve(res.data);
        })
    })
}
export function APIAddPointMP(param){
    return new Promise(resolve => {
        http.post(`/AddPointMP`, param).then((res) => {
            resolve(res.data);
        })
    })
}