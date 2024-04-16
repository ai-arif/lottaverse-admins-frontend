import Layout from '@/components/Layout'
import React, { useState } from 'react'

const Index = () => {
  const [formData, setFormData] = useState({
    lotteryType: '',
    expiry: '',
    firstPrize: '',
    secondPrize: '',
    thirdPrize: '',
    fourthPrize: '',
    otherPrizes: '',
    maxTicketCount: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // You can do further processing with the form data here
  };

  return (
    <>
      <Layout>
        <h1>Create Lottery</h1>
        {/* create a form inside card class */}
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="lotteryType">Lottery Type</label>
                <select className="form-control" id="lotteryType" onChange={handleChange} value={formData.lotteryType}>
                  <option value="">Select</option>
                  <option value="0">Easy</option>
                  <option value="1">Super</option>
                  <option value="2">SuperX</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="expiry">Expiry</label>
                <input
                  type="date"
                  className="form-control"
                  id="expiry"
                  onChange={handleChange}
                  value={formData.expiry}
                />
              </div>
              <div className="form-group">
                <label htmlFor="firstPrize">First Prize ($)</label>
                <input
                  type="number"
                  className="form-control"
                  id="firstPrize"
                  placeholder="e.g., 3000"
                  onChange={handleChange}
                  value={formData.firstPrize}
                />
              </div>
              <div className="form-group">
                <label htmlFor="secondPrize">Second Prize ($)</label>
                <input
                  type="number"
                  className="form-control"
                  id="secondPrize"
                  placeholder="e.g., 1000"
                  onChange={handleChange}
                  value={formData.secondPrize}
                />
              </div>
              <div className="form-group">
                <label htmlFor="thirdPrize">Third Prize ($)</label>
                <input
                  type="number"
                  className="form-control"
                  id="thirdPrize"
                  placeholder="e.g., 300"
                  onChange={handleChange}
                  value={formData.thirdPrize}
                />
              </div>
              <div className="form-group">
                <label htmlFor="fourthPrize">Fourth Prize ($)</label>
                <input
                  type="number"
                  className="form-control"
                  id="fourthPrize"
                  placeholder="e.g., 100"
                  onChange={handleChange}
                  value={formData.fourthPrize}
                />
              </div>
              <div className="form-group">
                <label htmlFor="otherPrizes">Other Lucky Winners Prize ($)</label>
                <input
                  type="number"
                  className="form-control"
                  id="otherPrizes"
                  placeholder="Enter other lucky winners prize amount in dollars"
                  onChange={handleChange}
                  value={formData.otherPrizes}
                />
              </div>
              <div className="form-group">
                <label htmlFor="maxTicketCount">Max Ticket Count</label>
                <input
                  type="number"
                  className="form-control"
                  id="maxTicketCount"
                  placeholder="Enter max ticket count"
                  onChange={handleChange}
                  value={formData.maxTicketCount}
                />
              </div>
              <button type="submit" className="btn btn-primary mt-3">
                Submit
              </button>
            </form>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Index
