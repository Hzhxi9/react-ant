import * as ResType from '../types/response';
import * as GoodsType from './action-type';

const goods = (state: any = [], action: any) => {
    switch (action.type) {
        case GoodsType.SAVE_GOODS:
            return action.data;

        default:
            return state;
    }
};
export default goods;
