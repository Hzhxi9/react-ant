import * as UserType from '../store/action-type';

/***
 * 保存用户信息
 */
export const saveUserInfo = (info: any) => {
    console.log(info);
    return {
        type: UserType.SAVE_USERINFO,
        info,
    };
};

/**
 * 保存用户信息
 */
export const saveAttrInfo = (data: { dataType: string; value: any }) => {
    const { dataType, value } = data;
    return {
        type: UserType.SAVE_ATTRINFO,
        dataType,
        value,
    };
};

/**
 * 修改用户信息
 */
export const modifyUserInfo = (data: { key: string; value: string }) => {
    const { key, value } = data;
    return {
        type: UserType.MODIFY_USERINFO,
        key,
        value,
    };
};

