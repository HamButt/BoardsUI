import axios from 'axios'

export const GetBoardApi = async (boardId) => { 
    try {
    
        const res = await axios.get(`${process.env.basePath}/boards/${boardId}`)
        return res
        
    } catch (error) {
        return error
    }
}