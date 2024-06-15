import axios from 'axios'


export const SignIn = async (signInData) => {
    return await axios.post(`${process.env.basePath}/api/signIn`, signInData)
    .then((res) => {
        return res
    }).catch((err) => {
        return err
    })
}