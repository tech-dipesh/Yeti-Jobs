import api from "../lib/axios.js"

export const getAllAppliedJobs=()=>api.get(`/applications/applylist`);
export const getAllJobsApplicant=(id)=>api.get(`/applications/${id}/applist`);
export const applyToParticularJob=({id, value})=>api.post(`/applications/${id}/apply`, {...value});
export const changeApplicationStatus=({status, applicant_id, id})=>api.post(`/applications/${id}/status`, {status, user_id:applicant_id});
export const withdrawToParticularJob=(id)=>api.delete(`/applications/${id}/withdraw`);