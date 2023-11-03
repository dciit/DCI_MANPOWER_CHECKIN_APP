import Axios from "axios";
const http = Axios.create({
    baseURL: import.meta.env.VITE_API,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8;json/html; charset=UTF-8',
        // 'Authorization': 'Bearer ' + localStorage.getItem('jwt')
    }
});

export default http;

export function GetScoreBySupplier(param) {
    return http.post('/getScoreBySupplier', param)
}

// export function GetSupplier(param: any) {
//     return new Promise<AL_Vendor[]>(resolve => {
//         http.get('/supplier/list', param).then((res) => {
//             resolve(res.data);
//         })
//     })
// }

export function servGetEquipment() {
    return new Promise(resolve => {
        http.get(`/equipment`).then((res) => {
            resolve(res.data);
        })
    })
}
export function GetPoint() {
    return new Promise(resolve => {
        http.get(`/point/get`).then((res) => {
            resolve(res.data);
        })
    })
}

export function InsertPoint(param) {
    return new Promise < MResponse > (resolve => {
        http.post(`/setpoint`, param).then((res) => {
            resolve(res.data);
        })
    })
}

export async function ServiceGetMasterEquipment() {
    return await new Promise(resolve => {
        http.get(`/master/equipment`).then((res) => {
            resolve(res.data);
        })
    })
}

export async function ServiceAddEquipment(param) {
    console.log(param)
    return await new Promise(resolve => {
        http.post(`/equipment/add`, param).then((res) => {
            resolve(res.data);
        });
    })
}

export async function ServiceGetLayoutAndEquipment(layout) {
    return await new Promise(resolve => {
        http.get(`/layout/equipment/` + layout).then((res) => {
            resolve(res.data);
        });
    })
}

export async function ServiceUpdateAxis(param) {
    return await new Promise(resolve => {
        http.post(`/equipment/axis/`, param).then((res) => {
            resolve(res.data);
        });
    })
}

export function ServiceGetListQrCode() {
    return new Promise(resolve => {
        http.get(`/qrcode`).then((res) => {
            resolve(res.data);
        });
    })
}


export function ServiceGetLayouts() {
    return new Promise(resolve => {
        http.get(`/layout`).then((res) => {
            resolve(res.data);
        })
    })
}

export function ServiceGetDetailEquipment(eqpId) {
    return new Promise(resolve => {
        http.get(`/equipment/get/id/${eqpId}`).then((res) => {
            resolve(res.data);
        })
    })
}

export function ServiceAddMaster(param) {
    return new Promise(resolve => {
        http.post(`/master/equipment/add`, param).then((res) => {
            resolve(res.data);
        })
    })
}

export function ServiceDelEquipmentOfLayout(eqpId) {
    return new Promise(resolve => {
        http.get(`/layout/equipment/del/${eqpId}`).then((res) => {
            resolve(res.data);
        })
    })
}

export function ServiceUpdateMaster(param) {
    console.log(param)
    return new Promise(resolve => {
        http.post(`/master/equipment/update`,param).then((res) => {
            resolve(res.data);
        })
    })
}
