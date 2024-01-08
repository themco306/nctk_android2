import axiosInstance from "./axiosInstance"
const productApi={
    getAll(params){
        var url='products'
        return axiosInstance.get(url,{params})
    },
    get(id,params){
        var url='products/'+id
        return axiosInstance.get(url,{params})
    },
    getByCategoryId(id,params){
        var url=`products?filters[category][id][$eq]=${id}`
        return axiosInstance.get(url,{params})
    },
    add(data){
        var url='products'
        return axiosInstance.post(url,data)
    },
    update(id,data){
        var url='products/'+id
        return axiosInstance.put(url,data)
    },
    delete(id){
        var url='products/'+id
        return axiosInstance.delete(url)
    }

}
export default productApi