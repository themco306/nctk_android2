import axiosInstance from "./axiosInstance"
const categoryApi={
    getAll(params){
        var url='categories'
        return axiosInstance.get(url,{params})
    },
    get(id){
        var url='categories/'+id
        return axiosInstance.get(url)
    },
    add(data){
        var url='categories'
        return axiosInstance.post(url,data)
    },
    update(id,data){
        var url='categories/'+id
        return axiosInstance.put(url,data)
    },
    delete(id){
        var url='categories/'+id
        return axiosInstance.delete(url)
    }

}
export default categoryApi