import axios from 'axios'
import { Url } from '../../../server'


const Api_Url = `${Url.backend_url}/api/e-commerce/users/`

// Register users 
const register = async (userData) => {
	const response = await axios.post(Api_Url + "register-user", userData,
		{ withCredentials: true }
	);
	console.log(response.data)
	return response.data

}

const login = async (userData) => {
	const response = await axios.post(Api_Url + "login-user", userData, { withCredentials: true });
	return response.data
}

const logout = async () => {
	const response = await axios.get(Api_Url + "logout");
	return response.data.message
}

// get user login status
const getUserStatus = async () => {
	const response = await axios.get(Api_Url + "getUserStatus");
	return response.data
}

const getUser = async () => {
	const response = await axios.get(Api_Url + "getUser");
	return response.data
}
const updateUserDetails = async (userData) => {
	const response = await axios.patch(Api_Url + "updateUserDetails", userData);
	return response.data
}
const updateUserPhoto = async (userData) => {
	const response = await axios.patch(Api_Url + "updateUserPhoto", userData);
	return response.data
}

export const authService = {
	register,
	login,
	logout,
	getUserStatus,
	getUser,
	updateUserDetails,
	updateUserPhoto
}

export default authService
