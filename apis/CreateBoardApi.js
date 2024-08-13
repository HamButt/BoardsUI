import axios from 'axios'
export const CreateBoardApi = async (board,setIsLoading) => {
    try {
       const res = await axios.post(`${process.env.basePath}/boards`, board)
       return res
    } catch (error) {
        setIsLoading(false)
        return error
    }
}