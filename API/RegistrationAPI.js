import axios from "axios";

export const RegistartionAPI = async (registartionData) => {
    return await axios.post(`${process.env.basePath}/api/register`, registartionData)
    .then((res) => {
        return res
    }).catch((err) => {
        return err
    })
}