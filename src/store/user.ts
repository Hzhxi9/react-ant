import * as UserType from '../store/action-type';

type UserType = {
    addressList: string[]; // 地址列表
    addressName: string; // 选中的地址
    temMessage: string; //临时姓名
    hasAddressList: string[]; // 已有的地址
    operate: string;
    userInfo: any;
    geohash: string[];
};

type actionType = {
    type: string;
    userInfo: {};
    dataType: string;
    value: string;
};

const userInfo: UserType = {
    addressList: [], // 地址列表
    addressName: '', // 选中的地址
    temMessage: '', //临时姓名
    hasAddressList: [], // 已有的地址
    operate: 'edit',
    userInfo: {},
    geohash: [],
};

const user = (state: UserType = userInfo, action: actionType) => {
    switch (action.type) {
        case UserType.SAVE_USERINFO:
            return {
                ...state,
                userInfo: action.userInfo,
            };
        case UserType.SAVE_ATTRINFO:
            return {
                ...state,
                ...{ [action.dataType]: action.value },
            };

        default:
            return state;
    }
};

export default user;
