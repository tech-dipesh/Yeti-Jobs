import api from "../lib/axios"


export const getSearchCompanies=(query)=>api.get(`/admin/search/company?q=${query}`)
export const getSearchUsers=(query)=>api.get(`/admin/search/users?q=${query}`)
export const assignCompaniesToUsers=(value)=>api.post("/admin/assign-user", value)
export const isUserOwnedRoute=(id)=>api.get(`/jobs/${id}/verify-owner`);
