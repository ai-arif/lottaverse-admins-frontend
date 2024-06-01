import React, { useRef, useState } from 'react'
import axios from 'axios'

const PackageEditModal = ({data,getLottery}) => {
    const [loading, setLoading] = useState(false);
    const [lotteryObj, setLotteryObj] = useState({
        image: null,
        expiry: null
    })
    const closeModalRef = useRef(null);
    const handleSubmit = async () => {
        try {
            setLoading(true);
            const formData= new FormData();
            formData.append('image', lotteryObj.image);
            formData.append('expiry', lotteryObj.expiry);
            console.log("formData::", formData);
            const res = await axios.post(
                `http://localhost:5000/api/admin/lottery-update/${data.lotteryID}`,
                formData

            );
            getLottery();
            setLotteryObj({
                image: null,
                expiry: null
            })
        }
        catch (error) {
            console.log("ERROR::", error);
        }
        finally {
            setLoading(false);
            
            if (closeModalRef.current) {
                closeModalRef.current.click();
              }
        }
    }
    
    const handleChange = (e) => {
        setLotteryObj({
            ...lotteryObj,
            [e.target.id]: e.target.value
        })
    }

    const handleFileChange = (e) => {
        setLotteryObj({
            ...lotteryObj,
            image: e.target.files[0]
        })
    }

    return (
        <div>

            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">{data?.lotteryType} {data?.lotteryID}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="expiry">Expiry</label>
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    id="expiry"
                                    onChange={handleChange}
                                />
                            </div>
                            {/* upload image */}
                            <div className="form-group">
                                <label htmlFor="image">Image</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="image"
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button ref={closeModalRef} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            {
                                loading ? <button type="button" className="btn btn-primary" disabled>Updating...</button> :
                                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save changes</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PackageEditModal
