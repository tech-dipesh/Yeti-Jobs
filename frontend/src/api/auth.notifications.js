import api from "../lib/axios.js"


export const ShowAllNotifications=()=>api.get(`/notifications/all`);
export const ReadAllNotifications=()=>api.patch(`/notifications/read-all`);
export const SendUserNotifications=(id)=>api.post(`/notifications/${id}`);

