import api from "../lib/axios.js"


export const savedJobsList=()=>api.get(`/jobs/saved_jobs/list`);
export const bookMarkJob=(id)=>api.post(`/jobs/${id}/bookmark_job`);
export const removeBookmark=(id)=>api.delete(`/jobs/${id}/remove_from_bookmark`);
export const allJobsList=({page=1, limit=10})=>api.get(`/jobs?page=${page}&limit=${limit}`);
export const searchJobs=({title, order})=>api.get(`/jobs/search?title=${title}&sortby=${order}`);
export const FilterWithSearchJobs=({content})=>api.get(`/jobs/jobs?${content}`)
export const individualJobs=(id)=>api.get(`/jobs/${id}`);
export const postNewJobs=(content)=>api.post(`/jobs/new`, content);
export const updateExistingJobs=({id, ...content})=>api.put(`/jobs/${id}/edit`, content.value);
export const deleteExistingJobs=(id)=>api.delete(`/jobs/${id}/delete`);
