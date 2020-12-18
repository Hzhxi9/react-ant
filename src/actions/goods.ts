import * as GoodsType from '../store/action-type';

export const saveGoods = (data: any) => {
    return {
        type: GoodsType.SAVE_GOODS,
        data,
    };
};
