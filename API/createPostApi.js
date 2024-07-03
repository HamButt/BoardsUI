
import axios from 'axios'
export const createPostApi = async (formData) => {
    return await axios.post(`${process.env.basePath}/posts`, formData ,{
        headers:{
            "Content-Type": "multipart/form-data"
        }
    }).then((res) => {
        return res
    }).catch((err) => {
        return err
    })

}