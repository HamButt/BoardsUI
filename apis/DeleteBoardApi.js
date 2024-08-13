import axios from 'axios'

export const DeleteBoardApi = async (boardId) => { 
    try {
    
        const res = await axios.delete(`${process.env.basePath}/boards/${boardId}`)
        return res
        
    } catch (error) {
        return error
    }
}