
import axiosInstance from "./axiosInstance"
const uploadApi={
    add(data){
        var url='upload'
        return axiosInstance.post(url,data)
    },

}
export default uploadApi