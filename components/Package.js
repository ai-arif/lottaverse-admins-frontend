import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import axios from "axios";
import PackageEditModal from "./package_helper/PackageEditModal";
import moment from "moment";

function Package() {
  const [lotteries, setLotteries] = useState([]);
  const [lotteryID, setLotteryID] = useState(null);
  useEffect(() => {
    console.log('getLottery')
    getLottery();
  }, []);
  const getLottery = async () => {
    try {
      const res = await axios.get(
        `${process.env.API}/api/activelotteries`
      );
      setLotteries(res.data?.data);

      // await handleSubmitDraw(res.data?.data[0].lotteryID, res.data?.data);
    } catch (error) {
      console.log("ERROR::", error);
    }
  };
  return (
    <>
      <Container style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <PackageEditModal data={lotteryID} getLottery={getLottery} />
        <h2>Manage Package</h2>
        <Table responsive="sm">
          <thead>
            <tr>
              <th>SL</th>
              <th>Package Name</th>
              <th>Time Countdown</th>
              <th>Package Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              lotteries?.map((lottery, index) => (
                <tr key={lottery.id}>
                  <td>{index + 1}</td>
                  <td>{lottery.lotteryType}</td>

                  <td>{moment.unix(lottery.expiration).format('MMMM Do YYYY, h:mm:ss a')}</td>

                  <td>
                    {lottery.image ?
                      <img src={process.env.API + lottery.image} alt="package" style={{ width: "100px" }} />
                      : 'No Image'
                    }
                  </td>
                  <td>

                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => setLotteryID(lottery)}
                      data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>

                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
        
      </Container>
    </>
  );
}

export default Package;
