import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './userAuthService';
import { toast } from 'react-toastify';

const initialState = {
	isLoading: false,
	user: null,
	isSuccess: false,
	isError: false,
	isLoggedIn: false,

}

const userAuthSlice = createSlice({
	name: 'userAuth',
	initialState,
	reducers: {
		reset_Auth(state) {
			state.isError = false;
			state.isSuccess = false;
			state.isLoading = false;
		}
	},
	extraReducers: (builder) => {
		builder
			// register user 
			.addCase(register.pending, (state) => {
				state.isLoading = true
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.isLoggedIn = true;
				state.user = action.payload;
				localStorage.setItem('token', JSON.stringify(action.payload?.data?.token));
				toast.success('You have successfully registered!')
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isLoggedIn = false;
				state.user = null;
				toast.error(action.payload)
			})
			// login user 
			.addCase(login.pending, (state) => {
				state.isLoading = true
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.isLoggedIn = true;
				state.user = action.payload;
				localStorage.setItem('token', JSON.stringify(action.payload?.data?.token));
				toast.success(action.payload?.data?.msg)
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isLoggedIn = false;
				state.user = null;
				toast.error(action.payload)
			})
			// logout
			.addCase(logout.pending, (state) => {
				state.isLoading = true
			})
			.addCase(logout.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.isLoggedIn = false;
				localStorage.removeItem('token');
			})
			.addCase(logout.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isLoggedIn = false;
				toast.error(action.payload)
			})
			// get user status 
			.addCase(getUserStatus.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getUserStatus.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.isLoggedIn = action.payload;
				if (action.payload.message === 'invalid signature') {
					state.isLoggedIn = false;
				}
			})
			.addCase(getUserStatus.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isLoggedIn = false;
			})

			// get user 
			.addCase(getUser.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.isLoggedIn = true;
				state.user = action.payload

			})
			.addCase(getUser.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isLoggedIn = false;
				toast.error(action.payload)
			})

			// update user details 
			.addCase(updateUserDetails.pending, (state) => {
				state.isLoading = true
			})
			.addCase(updateUserDetails.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.isLoggedIn = true;
				state.user = action.payload
				toast.success('User details updated successfully')
			})
			.addCase(updateUserDetails.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isLoggedIn = false;
				toast.error(action.payload)
			})

			// update user photo 
			.addCase(updateUserPhoto.pending, (state) => {
				state.isLoading = true
			})
			.addCase(updateUserPhoto.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.isLoggedIn = true;
				state.user = action.payload
				toast.success('User photo updated successfully')
			})
			.addCase(updateUserPhoto.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isLoggedIn = false;
				toast.error(action.payload)
			})
	}
})

export const register = createAsyncThunk(
	"userAuth/register",
	async (userData, thunkAPI) => {
		try {
			return await authService.register(userData)
		} catch (error) {
			const message =
				(
					error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message || error.toString();
			return thunkAPI.rejectWithValue(message)
		}
	}
)

export const login = createAsyncThunk(
	"userAuth/login",
	async (userData, thunkAPI) => {
		try {
			return await authService.login(userData)
		} catch (error) {
			const message =
				(
					error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message || error.toString();
			return thunkAPI.rejectWithValue(message)
		}
	}
)

export const logout = createAsyncThunk(
	"userAuth/logout",
	async (_, thunkAPI) => {
		try {
			return await authService.logout()
		} catch (error) {
			const message =
				(
					error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message || error.toString();
			return thunkAPI.rejectWithValue(message)
		}
	}
)

export const getUserStatus = createAsyncThunk(
	"userAuth/getUserStatus",
	async (_, thunkAPI) => {
		try {
			return await authService.getUserStatus()
		} catch (error) {
			const message =
				(
					error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message || error.toString();
			return thunkAPI.rejectWithValue(message)
		}
	}
)

export const getUser = createAsyncThunk(
	"userAuth/getUser",
	async (_, thunkAPI) => {
		try {
			return await authService.getUserStatus()
		} catch (error) {
			const message =
				(
					error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message || error.toString();
			return thunkAPI.rejectWithValue(message)
		}
	}
)

export const updateUserDetails = createAsyncThunk(
	"userAuth/updateUserDetails",
	async (userData, thunkAPI) => {
		try {
			return await authService.updateUserDetails(userData)
		} catch (error) {
			const message =
				(
					error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message || error.toString();
			return thunkAPI.rejectWithValue(message)
		}
	}
)

export const updateUserPhoto = createAsyncThunk(
	"userAuth/updateUserPhoto",
	async (userData, thunkAPI) => {
		try {
			return await authService.updateUserPhoto(userData)
		} catch (error) {
			const message =
				(
					error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message || error.toString();
			return thunkAPI.rejectWithValue(message)
		}
	}
)


export const { reset_Auth } = userAuthSlice.actions;

export default userAuthSlice.reducer