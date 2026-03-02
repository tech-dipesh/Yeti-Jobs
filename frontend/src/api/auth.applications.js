import api from "../lib/axios.js"

export const getAllAppliedJobs=()=>api.get(`/applications/lists`);
export const applyToParticularJob=(id)=>api.post(`/applications/${id}/apply`);
export const withdrawToParticularJob=(id)=>api.delete(`/applications/${id}/withdraw`);
