import Layout from '@/components/Layout'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const index = () => {
    const [lotteries, setLotteries] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [fivePercent, setFivePercent] = useState({});
  const [loading, setLoading] = useState({});
  

  useEffect(() => {
    getLottery();
  }, []);
  const getLottery = async () => {
    const res = await axios.get(
      "https://lottaverse.mainulhasan05.xyz/api/activelotteries"
    );
    setLotteries(res.data?.data);
    handleSubmitDraw(res.data?.data[0].lotteryID)
  };
  const handleSubmitDraw= async(lotteryId)=>{
    // drawlottery
    const res = await axios.post("https://lottaverse.mainulhasan05.xyz/api/drawlottery", {
      lotteryId: lotteryId,
    });
    setAddresses(res.data.data.top30Users);
    setFivePercent(res.data.data.fivePercentOfTotalPerUser);
  }

  const handleSendCommission=()=>{
    console.log('send commission')
    console.log(addresses)
    console.log(fivePercent)

  }
  return (
    <Layout>
        <div className="container">
        <h1>Send Commission</h1>
        {/* create a select field */}
        <select onChange={async(e)=>{
            await handleSubmitDraw(e.target.value)
        }} className='form-select'>
            {
                lotteries.map((lottery) => (
                    <option key={lottery.ID} value={lottery.lotteryID}>{lottery.lotteryID}</option>
                ))
            }
        </select>
        <br />
        <button onClick={handleSendCommission} className='btn btn-primary'>Send Commission</button>
        <br /><br />
        
        <table className='table'>
            <thead>
                <tr>
                    <th>Address</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                {
                    addresses.map((address, index) => (
                        <tr key={index}>
                            <td>{address.address}</td>
                            <td>{fivePercent}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        </div>
      
    </Layout>
  )
}

export default index
