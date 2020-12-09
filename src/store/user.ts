import * as UserType from '../store/action-type';
import * as ResType from '../types/response';

type UsersType = {
    addressList: string[]; // 地址列表
    addressName: string; // 选中的地址
    temMessage: string; //临时姓名
    hasAddressList: string[]; // 已有的地址
    operate: string;
    userInfo: ResType.LoginData | null;
    geohash: string[];
};

type actionType = {
    type: string;
    info: ResType.LoginData | null;
    dataType: string;
    value: string;
    key: string;
};

const userInfo: UsersType = {
    addressList: [], // 地址列表
    addressName: '', // 选中的地址
    temMessage: '', //临时姓名
    hasAddressList: [], // 已有的地址
    operate: 'edit',
    userInfo: null,
    geohash: [],
};

const user = (state: UsersType = userInfo, action: actionType) => {
    switch (action.type) {
        case UserType.SAVE_USERINFO:
            console.log(action, 'action');
            return {
                ...state,
                userInfo: action.info,
            };
        case UserType.SAVE_ATTRINFO:
            return {
                ...state,
                ...{ [action.dataType]: action.value },
            };
        case UserType.MODIFY_USERINFO:
            return { ...state, userInfo: { ...state.userInfo, [action.key]: action.value } };

        default:
            return state;
    }
};

export default user;
