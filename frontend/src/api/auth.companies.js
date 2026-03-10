import api from "../lib/axios.js"


export const getSingleCompany=(id)=>api.get(`companies/${id}`)
export const postNewCompany=(formData)=>api.post(`companies/new`, formData)
export const deleteCompany=(id)=>api.delete(`companies/${id}`)
export const updateCompany=({id, ...content})=>api.put(`companies/${id}`, content.value)

export const getAllCompanies=()=>api.get(`companies/all`);
export const getCompanyDashboard=()=>api.get(`companies/dashboard`)
export const getCompanyEmployee=(id)=>api.get(`companies/${id}/employees`)
export const companyStats=(id)=>api.get(`companies/${id}/analytics`)
export const getCompanyJobs=(id)=>api.get(`companies/${id}/jobs`)
export const getCompanyApplications=(id)=>api.get(`companies/${id}/applications`)