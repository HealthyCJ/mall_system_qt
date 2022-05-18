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
