import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';

const rootreducer = combineReducers({
  user,
  wallet,
});
export default rootreducer;
