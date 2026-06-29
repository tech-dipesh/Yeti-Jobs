import api from "../lib/axios.js"


export const ShowAllNotifications=()=>api.get(`/notifications/all`);
export const ReadAllNotifications=()=>api.patch(`/notifications/read-all`);
export const ReadUserSingleNotifications=({id, isRead})=>api.patch(`/notifications/${id}/read?isRead=${isRead}?isRead=${isRead}?isRead=${isRead}?isRead=${isRead}?isRead=${isRead}`);
export const SendUserNotifications=(id)=>api.post(`/notifications/${id}`);

