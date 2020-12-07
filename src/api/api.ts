import request from '../utils/request';
import * as ReqTypes from '../types/request';
import * as ResTypes from '../types/response';

/**
 * 获取验证码
 */
export function getCaptchaCode(): Promise<{ code: string; status: number }> {
    return request({
        method: 'POST',
        url: '/v1/captchas',
    });
}

/**
 * 账号密码登录
 */
export function login(data: ReqTypes.loginParams): Promise<ResTypes.loginData> {
    return request({
        method: 'POST',
        url: '/v2/login',
        data,
    });
}

/**
 * 获取用户消息 返回status为1表示成功
 */
export function getUserInfo(params: any) {
    return request({
        method: 'GET',
        url: '/v1/user',
        params,
    });
}

/**
 * 上传图片
 */
export function uploadImg(data: any) {
    return request({
        method: 'POST',
        url: '//elm.cangdu.org/v1/addimg/shop',
        data,
    });
}

/**
 * 获取用户地址列表
 */
export function getAddress(id: any) {
    return request({
        method: 'GET',
        url: '/v1/users/' + id + '/addresses',
    });
}

/**
 * 搜索符合条件的地址
 */
export function searchPois(params: any) {
    return request({
        method: 'GET',
        url: '/v1/pois/',
        params,
    });
}

/**
 * 根据经纬度获取地点信息
 */
export function getPoisSite(params: string) {
    return request({
        method: 'GET',
        url: '/v2/pois/' + params,
    });
}

/**
 * 获取食物种类
 */
export function getFoodTypes(params: ReqTypes.FoodTypeParams): Promise<ResTypes.FootTypeData[]> {
    return request({
        method: 'GET',
        url: '/v2/index_entry/',
        params,
    });
}

/**
 * 猜测城市
 */
export function cityGuess(params: { type: string }): Promise<ResTypes.CityGuessData> {
    return request({
        method: 'GET',
        url: '/v1/cities',
        params,
    });
}

/**
 * 获取商店列表
 */
export function getShopList(params: { latitude: string; longitude: string }): Promise<ResTypes.ShopData[]> {
    console.log(params, 'params');
    return request({
        method: 'GET',
        url: `/shopping/restaurants/?latitude=${params.latitude}&longitude=${params.longitude}`,
    });
}

/**
 * 获取商店详情
 */
export function shopDetails(params: any) {
    return request({
        method: 'GET',
        url: '/shopping/restaurant/',
        params,
    });
}

/**
 * 获取食物清单
 */
export function getfoodMenu(params: any) {
    return request({
        method: 'GET',
        url: '/shopping/v2/menu/',
        params,
    });
}
