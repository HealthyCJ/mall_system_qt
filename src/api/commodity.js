import request from "../utils/request";

/**
 * 查看商品信息
 * @param data
 * @returns {AxiosPromise}
 */
export function listCommoditys(data) {
    return request({
        url: '/system/commodity/listCommoditys',
        method: 'post',
        data
    })
}

/**
 * 根据id查看商品信息
 * @param data
 * @returns {AxiosPromise}
 */
export function getCommodity(data) {
    return request({
        url: '/system/commodity/commodity/' + data.id,
        method: 'get',
        data
    })
}

