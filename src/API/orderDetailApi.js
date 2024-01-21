import axiosInstance from "./axiosInstance"
 const orderDetailApi = {
    add(data) {
        var url = 'order-details';
        return axiosInstance.post(url, data)
    },
    getAll(params){
        var url='order-details'
        return axiosInstance.get(url,{params})
    },
}
export default orderDetailApi