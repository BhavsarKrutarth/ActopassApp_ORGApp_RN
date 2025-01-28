import {configureStore} from '@reduxjs/toolkit';
import { AuthReducers } from './Reducer';

const Store = configureStore({
  reducer: {
    Auth: AuthReducers
  },
});

export default Store;
