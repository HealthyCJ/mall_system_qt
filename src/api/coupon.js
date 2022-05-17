import request from "../utils/request";

/**
 * 新增订单信息
 * @param data
 * @returns {AxiosPromise}
 */
export function insertCoupon(data) {
    return request({
        url: '/system/coupon/coupon',
        method: 'post',
        data
    })
}