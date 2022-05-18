import request from "../utils/request";

/**
 * 文件上传
 * @param data
 * @returns {AxiosPromise}
 */
export function uploadFile(data) {
    return request({
        url: '/system/file/uploadFile',
        method: 'post',
        data
    })
}

/**
 * 文件删除
 * @param data
 * @returns {AxiosPromise}
 */
export function deleteFile(data) {
    return request({
        url: '/system/file/deleteFile',
        method: 'delete',
        data
    })
}