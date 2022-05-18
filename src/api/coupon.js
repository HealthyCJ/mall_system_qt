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

/**
 * 查看订单信息
 * @param data
 * @returns {AxiosPromise}
 */
export function listCoupons(data) {
    return request({
        url: '/system/coupon/listCoupons',
        method: 'post',
        data
    })
}

/**
 * 申请退款
 * @param data
 * @returns {AxiosPromise}
 */
export function applyForRefund(data) {
    return request({
        url: '/system/coupon/applyForRefund',
        method: 'put',
        data
    })
}