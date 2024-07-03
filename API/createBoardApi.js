import axios from "axios";

export const createBoardApi = async (boardValues) => {
    console.log(boardValues);
    return await axios.post(`${process.env.basePath}/boards`, boardValues)
    .then((res) => {
        return res
    }).catch((err) => {
        return err
    })
}