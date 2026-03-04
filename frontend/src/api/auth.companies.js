import api from "../lib/axios.js"

// - companies: `/, id/dashbaord, id/employees, id/jobs, id/applications, id: get company all, id: post new company, / delete company, /id put new company`


export const getSingleCompany=(id)=>api.get(`companies/${id}`)
export const postNewCompany=(content)=>api.post(`companies`, content)
export const deleteCompany=(id)=>api.delete(`companies/${id}`)
export const updateCompany=({id, ...content})=>api.put(`companies/${id}`, content.value)

export const getAllCompanies=()=>api.get(`companies/all`);
export const getCompanyDashboard=(id)=>api.get(`companies/${id}/dashboard`)
export const getCompanyEmployee=(id)=>api.get(`companies/${id}/employees`)
export const companyStats=(id)=>api.get(`companies/${id}/analytics`)
export const getCompanyJobs=(id)=>api.get(`companies/${id}/jobs`)
export const getCompanyApplications=(id)=>api.get(`companies/${id}/applications`)