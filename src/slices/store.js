import { configureStore } from '@reduxjs/toolkit';
import userAuthSlice from '../slices/features/auth/userAuthSlice'

const store = configureStore({
	reducer: {
		userAuth: userAuthSlice
	}
});

export default store;
