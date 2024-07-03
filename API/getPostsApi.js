import axios from "axios";

export const getPostsApi = async (boardId) => {
    return await axios.get(`${process.env.basePath}/posts/${boardId}`)
    .then((res) => {
        return res
    }).catch((err) => {
        return err
    })
}