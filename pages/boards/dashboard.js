import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import axios from 'axios'


function dashboard() {

    const [boards,setBoards] = useState([])
    // const [posts,setPosts] = useState([])

    useEffect(() => {
        getBoardStats()
    }, [])
    
    const getBoardStats = async () => {
        
        const response = await axios.get(`${process.env.basePath}/stats`)
        setBoards(response.data.boards)
        // setPosts(response.data.dashboardData.posts.map(post => post.totalPosts))

    }

  return (
    <div className=' mt-3' >
        <Head>
            <title>Dashboard</title>
        </Head>

        <h1 className='ms-3 text-2xl font-mono font-semibold' >Dashboard</h1>
        <div className='flex items-center justify-center mt-3' >

            <div className="border ">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Total boards</th>
                        <th>Occasions</th>
                    </tr>
                    </thead>
                    {boards.map((board,index) => {
                        return (
                            <tbody key={index} >
                                <tr>
                                    <th>{board.totalBoards}</th>
                                    <th>{board.occasion}</th>
                                
                                </tr>
                            </tbody>
                            )
                        })
                    } 
                </table>
            </div>
        </div>
    </div>
  )
}

export default dashboard