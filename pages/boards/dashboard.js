import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import axios from 'axios'
import Loader from '@/components/Loader'


function Dashboard() {

    const [boards,setBoards] = useState([])

    useEffect(() => {
        getBoardStats()
    }, [])
    
    const getBoardStats = async () => {
        
        const response = await axios.get(`${process.env.basePath}/stats`)
        setBoards(response.data.boards)

    }

  return (
    <div className='mt-3'>
        
        <Head>
            <title>Dashboard</title>
        </Head>

        <h1 className='ms-3 text-2xl font-mono font-semibold'>Dashboard</h1>
        
        <div className='flex items-center justify-center mt-3' >

            <div className=" w-full mx-5">
                <table className="table w-full bg-green-300">
                    <thead>
                    <tr>
                        <th>Total boards</th>
                        <th>Occasions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {boards.length > 0 ? boards.map((board,index) => {
                            return (
                                <tr key={index}>
                                    <th>{board.totalBoards}</th>
                                    <th>{board.occasion}</th> 
                                </tr>
                            )
                        })
                    : 
                    (
                    <tr>
                        <td colSpan="2">
                            <div className='flex items-center justify-center text-center ms-40 w-full'>
                                <Loader color="#FF9669" size="lg" />
                            </div>
                        </td>
                    </tr>
                )
                    } 
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default Dashboard