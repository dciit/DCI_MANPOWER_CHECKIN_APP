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
export function API_GET_LIST_ANDONBOARD() {
    return new Promise(resolve => {
        http.get(`/mpck/getListAndonBoard`).then((res) => {
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

export function API_ADD_MASTER(param) {
    return new Promise(resolve => {
        http.post(`/mpck/addMaster`, param).then((res) => {
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
    return new Promise(resolve => {
        http.post(`/master/equipment/update`, param).then((res) => {
            resolve(res.data);
        })
    })
}


export function API_GET_MASTER(objCode = '') {
    return new Promise(resolve => {
        http.post(`/mpck/getMasterList`, { objCode: objCode }).then((res) => {
            resolve(res.data);
        })
    })
}


export function API_ADD_OBJECT(param) {
    return new Promise(resolve => {
        http.post(`/mpck/addObject`, param).then((res) => {
            resolve(res.data);
        })
    })
}


export function API_GET_LAYOUT(objCode = '') { // pram = { "objCode" : "string"}
    return new Promise(resolve => {
        http.post(`/mpck/getLayoutlist`, { objCode: objCode }).then((res) => {
            resolve(res.data);
        })
    })
}


export function API_UPDATE_MASTER(param) {
    return new Promise(resolve => {
        http.post(`/mpck/editMaster`, param).then((res) => {
            resolve(res.data);
        })
    })
}

export function API_GEN_MASTERID() {
    return new Promise(resolve => {
        http.post(`/mpck/generateMasterNbr`, {}).then((res) => {
            resolve(res.data);
        })
    })
}

export function API_GET_OBJECT_OF_LAYOUT(param) {
    return new Promise(resolve => {
        http.post(`/mpck/getObjectlistbylayout`, param).then((res) => {
            resolve(res.data);
        })
    })
}

export function API_UPDATE_POSITION_OBJ(param) {
    return new Promise(resolve => {
        http.post(`/mpck/editObjectPosition`, param).then((res) => {
            resolve(res.data);
        })
    })
}


export function API_ADD_LAYOUT(param) {
    return new Promise(resolve => {
        http.post(`/mpck/addLayout`, param).then((res) => {
            resolve(res.data);
        })
    })
}

export function API_DELETE_OBJECT(param) {
    return new Promise(resolve => {
        http.post(`/mpck/deleteObject`, param).then((res) => {
            resolve(res.data);
        })
    })
}
export function API_GET_OBJECT(param) { // param = {  "objCode": "string"}
    return new Promise(resolve => {
        http.post(`/mpck/getObjectList`, param).then((res) => {
            resolve(res.data);
        })
    })
}

export function API_GET_MQSA_OF_LAYOUT(param) {
    return new Promise(resolve => {
        http.post(`/mpck/getMQSAListByObject`, param).then((res) => {
            resolve(res.data);
        })
    })
}


export function API_CHECK_INOUT(param) {
    return new Promise(resolve => {
        http.post(`/mpck/checkInOut`, param).then((res) => {
            resolve(res.data);
        }).catch((err) => {
            resolve(err.response.data);
        })
    })
}
export function API_GET_OBJECT_INFO(param) { // { objCode:'string'}
    return new Promise(resolve => {
        http.post(`/mpck/getObjectInfoByCode`, param).then((res) => {
            resolve(res.data);
        })
    })
}

export function API_GET_OBJECT_BY_CODE(param) { // { objCode:'string'}
    return new Promise(resolve => {
        http.post(`/mpck/getObjectListByCode`, param).then((res) => {
            resolve(res.data);
        })
    })
}

export function API_GET_MQSA_BY_CODE(param) { // {"searchCode": "string","searchType": "string"}
    return new Promise(resolve => {
        http.post(`/mpck/getMQSAListByObject`, param).then((res) => {
            resolve(res.data);
        })
    })
}

export function API_GET_MQ(param) { // {"searchCode": "string","searchType": "string"}
    return new Promise(resolve => {
        http.post(`/mpck/getMQList`, param).then((res) => {
            resolve(res.data);
        })
    })
}


export function API_GET_SA() { // {"searchCode": "string","searchType": "string"}
    return new Promise(resolve => {
        http.post(`/mpck/getSAList`, {}).then((res) => {
            resolve(res.data);
        })
    })
}


export function API_ADD_MQSA(param) { // {"objCode": "string","layOutCode": "string","dictCode": "string","dictType": "string","empCode": "string"}
    return new Promise(resolve => {
        http.post(`/mpck/addMQSA`, param).then((res) => {
            resolve(res.data);
        })
    })
}

export function API_MANAGEMENT_LIST(param) {
    return new Promise(resolve => {
        http.post(`/mpck/management`, param).then((res) => {
            resolve(res.data);
        })
    })
}


export function API_DELETE_MQSA(param) {
    return new Promise(resolve => {
        http.post(`/mpck/deleteMQSA`, param).then((res) => {
            resolve(res.data);
        })
    })
}


export function API_MAN_SKILL(param) {
    return new Promise(resolve => {
        http.post(`/mpck/getManSkills`, param).then((res) => {
            resolve(res.data);
        })
    })
}

export function API_UPLOAD_FILE(param) {
    return new Promise(resolve => {
        http.post(`/mpck/setFiles`, param, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            resolve(res.data);
        })
    })
}

export function API_UPDATE_OBJ(param) {
    return new Promise(resolve => {
        http.post(`/mpck/updateObject`, param).then((res) => {
            resolve(res.data);
        })
    })
}

export function API_UPDATE_PRIORITY(param) {
    return new Promise(resolve => {
        http.post(`/mpck/updatePriority`, param).then((res) => {
            resolve(res.data);
        })
    })
}
export function API_EDIT_OBJECT(param) {
    return new Promise(resolve => {
        http.post(`/mpck/editObject`, param).then((res) => {
            resolve(res.data);
        })
    })
}

export function API_ANDON_BOARD(param) {
    return new Promise(resolve => {
        http.post(`/mpck/getDataAndonboard`, param).then((res) => {
            resolve(res.data);
        })
    })
}

export function API_GET_MQSA_OF_EMPCODE(empcode = '') {
    return new Promise(resolve => {
        http.get(`/mpck/getsamqofempcode/${empcode}`).then((res) => {
            resolve(res.data);
        })
    })
}