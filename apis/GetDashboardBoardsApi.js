import axios from 'axios'

export const GetDashboardBoardsApi = async (userId, setLoading) => { 
    try {
    
        const res = await axios.get(`${process.env.basePath}/users/${userId}`)
        return res
        
    } catch (error) {
        setLoading(false)
        return error
    }
}