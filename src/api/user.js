import request from '../utils/request'

/**
 * 用户登录校验
 * @param data
 * @returns {AxiosPromise}
 */
export function userLogin(data) {
    return request({
        url: '/system/user/userLogin',
        method: 'post',
        data
    })
}

/**
 * 根据账号查看客户信息
 * @param data
 * @returns {AxiosPromise}
 */
export function getUser(data) {
    return request({
        url: '/system/user/user/' + data.userAccount,
        method: 'get',
        data
    })
}

/**
 * 查看用户信息
 * @param data
 * @returns {AxiosPromise}
 */
export function listUsers(data) {
    return request({
        url: '/system/user/listUsers',
        method: 'post',
        data
    })
}

/**
 * 新增用户信息
 * @param data
 * @returns {AxiosPromise}
 */
export function insertUser(data) {
    return request({
        url: '/system/user/user',
        method: 'post',
        data
    })
}

/**
 * 删除用户信息
 * @param data
 * @returns {AxiosPromise}
 */
export function deleteUser(data) {
    return request({
        url: '/system/user/user/' + data.id,
        method: 'delete',
        data
    })
}

/**
 * 修改用户信息
 * @param data
 * @returns {AxiosPromise}
 */
export function updateUser(data) {
    return request({
        url: '/system/user/user',
        method: 'put',
        data
    })
}