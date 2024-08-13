import axios from 'axios'

export const GetPostsApi = async (boardId) => { 
    try {
        
        const res = await axios.get(`${process.env.basePath}/posts/${boardId}`)
        return res

    } catch (error) {
        return error
    }
}