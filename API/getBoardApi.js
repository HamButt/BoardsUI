import axios from "axios";

export const getBoardApi = async (boardId) => {
    return await axios.get(`${process.env.basePath}/boards/${boardId}`)
    .then((res) => {
        return res
    }).catch((err) => {
        return err
    })
}