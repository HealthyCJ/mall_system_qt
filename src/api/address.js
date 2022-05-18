import request from '../utils/request'

/**
 * 查看用户收货地址
 * @param data
 * @returns {AxiosPromise}
 */
export function getAddress(data) {
    return request({
        url: '/system/address/address/' + data.id,
        method: 'get',
        data
    })
}

/**
 * 新增地址信息
 * @param data
 * @returns {AxiosPromise}
 */
export function insertAddress(data) {
    return request({
        url: '/system/address/address',
        method: 'post',
        data
    })
}

/**
 * 删除地址信息
 * @param data
 * @returns {AxiosPromise}
 */
export function deleteAddress(data) {
    return request({
        url: '/system/address/address/' + data.id,
        method: 'delete',
        data
    })
}

/**
 * 修改地址信息
 * @param data
 * @returns {AxiosPromise}
 */
export function updateAddress(data) {
    return request({
        url: '/system/address/address',
        method: 'put',
        data
    })
}