import api from "../lib/axios"

 export const isUserLoggedIn = () =>api.get('/users/login-status');
 export const loginUser = ({ email, password }) => api.post('/users/login', { email, password });
 export const signupUser=({fname, lname, education, email, password})=> api.post('/users/signup', {fname, lname, education, email, password})
 export const getAllUser=()=>api.get('/users/all')

 export const logoutUser=()=>api.get('/users/logout')
 export const getIndividualUser=(id)=>api.get(`/users/${id}`)
 export const postUserSkills=({ id, skill})=> api.post(`/users/${id}/skills`, {skills:skill})
 export const deleteIndivualUser=(id)=>api.get(`/users/${id}`)
 export const putIndivualUser=(data, id)=>api.put(`/users/${id}`, {data})
 export const patchIndivualUser=({id, ...data})=>api.put(`/users/${id}`, data)
export const listAlluserFollowingCompanies=()=>api.get(`users/following`)

 export const verifyUser = (code) =>api.post('/users/verify', { code });
 export const resendVerificationCode=()=>api.post('/users/verify/resend')
 export const forgetPassword=(email)=>api.post('/users/forget-password', {email})
 export const verifyForgetPassword=({...value})=>api.post('/users/forget-password/verify', value)
 export const uploadProfilePicture=(payload)=>api.post('/users/profile-picture', payload)
 export const uploadResume=(file)=>api.post('/users/resume', file)