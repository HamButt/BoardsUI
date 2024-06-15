import axios from "axios";

export const createBoard = async (formData) => {
    console.log(formData);
    return axios.post(`${process.env.basePath}/posts`, formData,{
        headers:{
            "Content-Type": "multipart/form-data"
        }
    })
    .then((res) => {
        return res
    }).catch((err) => {
        return err
    })
}