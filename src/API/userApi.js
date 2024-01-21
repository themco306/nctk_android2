import axiosInstance from "./axiosInstance"
export const userApi = {
    register(data) {
        var url = 'auth/local/register';
        return axiosInstance.post(url, data)
    },
    login(data) {
        var url = 'auth/local'
        return axiosInstance.post(url, data)
    },
    me(id,params) {
        var url = 'users/'+id;
        return axiosInstance.get(url, {params})
    },
    getInfoDelivery(params) {
        var url = 'info-deliveries';
        return axiosInstance.get(url, {params})
    },
    postInfoDelivery(data) {
        var url = 'info-deliveries';
        return axiosInstance.post(url,data)
    },
    putInfoDelivery(id,data) {
        var url = 'info-deliveries/'+id;
        return axiosInstance.put(url,data)
    },
}