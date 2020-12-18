import { combineReducers } from 'redux';

import user from './user';
import goods from './goods';

const rootStore = combineReducers({
    user,
    goods,
});

export default rootStore;
