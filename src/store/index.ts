import { combineReducers } from 'redux';

import user from './user';

const rootStore = combineReducers({
    user,
});

export default rootStore;
