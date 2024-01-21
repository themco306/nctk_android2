import axiosInstance from "./axiosInstance"
 const orderApi = {
    add(data) {
        var url = 'orders';
        return axiosInstance.post(url, data)
    },
    getOrderCode(code){
        let url = 'orders?filters[code]='+code;  
        return axiosInstance.get(url)
    },
    getAll(params){
        var url='orders'
        return axiosInstance.get(url,{params})
    },
    update(id,data){
        var url = 'orders/'+id;
        return axiosInstance.put(url, data)
    }
}
export default orderApi