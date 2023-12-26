import axiosInstance from "./axiosInstance"
 const orderDetailApi = {
    add(data) {
        var url = 'order-details';
        return axiosInstance.post(url, data)
    },
}
export default orderDetailApi