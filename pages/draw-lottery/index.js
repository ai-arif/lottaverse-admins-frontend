import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getActiveLotteries } from '@/source/services/api/methods/lottery'
import Layout from '@/components/Layout'

const index = () => {
    const [lotteries,setLotteries]=useState([])
    useEffect(()=>{
        getLottery();
    },[])
    const getLottery=async()=>{
        const res=await axios.get('http://localhost:5000/api/activelotteries')
        setLotteries(res.data?.data)
    }
  return (
    <div>
        <Layout>
            <h1>Draw Lottery</h1>
            <div className="row">
                {lotteries.map(lottery=>(
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{lottery?.lotteryID}</h5>
                                <p className="card-text">LotteryId: {lottery?.lotteryID}</p>
                                <p className="card-text">Ticket Price: {lottery?.ticketPrice}</p>
                                <p className="card-text">Lottery Type: {lottery?.lotteryType}</p>
                                <p className="card-text">Max Tickets: {lottery?.maxTickets}</p>
                                <p className="card-text">Operator Commission Percentage: {lottery?.operatorCommissionPercentage}</p>
                                <p className="card-text">Expiration: {lottery?.expiration}</p>
                                
                                <button className="btn btn-primary">Draw</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
        </Layout>
      
    </div>
  )
}

export default index
