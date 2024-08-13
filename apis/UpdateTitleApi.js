import axios from 'axios'

export const UpdateTitleApi = async (title,boardId) => { 
    try {
    
        const res = await axios.patch(`${process.env.basePath}/boards/${title}`, {boardId})
        return res
        
    } catch (error) {
        return error
    }
}