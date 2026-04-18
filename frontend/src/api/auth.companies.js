import api from "../lib/axios.js"


export const getSingleCompany=(id)=>api.get(`companies/${id}`)
export const postNewCompany=(formData)=>api.post(`companies/new`, formData)
export const deleteCompany=(id)=>api.delete(`companies/${id}`)
export const updateCompany=({id, ...content})=>api.put(`companies/${id}`, content.value)
export const getAllCompanies=({page=1, limit=5})=>api.get(`companies/all?page=${page}&limit=${limit}`);
export const getCompanyDashboard=()=>api.get(`companies/dashboard`)
export const getCompanyEmployee=(id)=>api.get(`companies/${id}/employees`)
export const getCompanyJobs=(id)=>api.get(`companies/${id}/jobs`)
export const getCompanyApplications=(id)=>api.get(`companies/${id}/applications`)


export const listOfAllCompaniesFollowers=()=>api.get(`companies/followers`);
export const followCompany=(id)=>api.post(`companies/${id}/follow`)
export const unFollowCompany=(id)=>api.delete(`companies/${id}/follow`)