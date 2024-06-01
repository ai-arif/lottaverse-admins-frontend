import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import axios from "axios";
import ReactPaginate from 'react-paginate';

function UsersList() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [userType, setUserType] = useState('user');
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);

  const getUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.API}/api/admin/users?page=${page}&limit=${limit}`
      );
      setLoading(false);
      setUsers(res.data?.data?.users);
      setTotalPages(res.data?.data?.totalPages);
    } catch (error) {
      setLoading(false);
      console.log("ERROR::", error);
    }
  }
  const getPremiumUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.API}/api/admin/premiumusers?page=${page}&limit=${limit}`
      );
      setLoading(false);
      setUsers(res.data?.data?.users);
      setTotalPages(res.data?.data?.totalPages);
    } catch (error) {
      setLoading(false);
      console.log("ERROR::", error);
    }
  }

  useEffect(() => {
    if (userType === 'user') {
      getUsers();
    }
    else {
      getPremiumUsers();
    }
  }, [userType, page]);
  const handlePageClick = (data) => {
    setPage(data.selected + 1);
    // getUsers();
  }
  const handleSearchUser = async (e) => {
    
    try {
      setLoading(true);
// router.get("/admin/searchusers", searchUsersByAddress); ?address=${searchText}
      const res = await axios.get(
        `${process.env.API}/api/admin/searchusers?address=${e.target.value}`
      );
      setLoading(false);
      setUsers(res.data?.data?.users);
      setTotalPages(res.data?.data?.totalPages);
    } catch (error) {
      setLoading(false);
      console.log("ERROR::", error);
    }
  }
      
  // /admin/makeuser/id 
  const switchRole = async (id) => {
    try {
      await axios.post(
        `${process.env.API}/api/admin/makeuser/${id}`
      );
      if(userType === 'user'){
        getUsers();
      }
      else{
        getPremiumUsers();
      }
    } catch (error) {
      console.log("ERROR::", error);
    }
  }

  return (
    <>
      <Container style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h2>User List</h2>
        <div className="form-check form-switch">
          <input onChange={() => {
            
            setUserType(userType === 'user' ? 'premium' : 'user');

            setPage(1);

          }} className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
          <label className="form-check-label" for="flexSwitchCheckDefault">Premium Users</label>
        </div>
        {/* create a search field */}
        <div className="input-group mb-3">
          <input onChange={(e)=>{
            setSearchText(e.target.value);
            handleSearchUser(e);
            setPage(1);
            setUserType('user');
          }} type="search" className="form-control" placeholder="Search" />
        </div>
        {
          loading ?
            <h1 className="text-center h-20"><div class="spinner-grow" style={{ width: "3rem", height: "3rem" }} role="status">
              <span class="visually-hidden">Loading...</span>
            </div></h1>
            : (
              <Table responsive="sm">
                <thead>
                  <tr>
                    <th>SL</th>
                    <th>Address</th>
                    <th>Tickets</th>
                    <th>Account Type</th>
                    <th>Account Status</th>
                    <th>Joined</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    users.map((user, index) => (
                      <tr key={user.id}>
                        <td>{index + 1}</td>
                        <td>{user.address}</td>
                        <td>{user.totalTickets} </td>
                        <td>{
                          user.userType == 'user' ?
                            <span className="badge bg-primary">User</span> :
                            <span className="badge bg-success">Premium</span>
                        }</td>
                        <td>
                          {
                            new Date(user.
                              expiryDate) < new Date() ?
                              <span className="badge bg-danger">Expired</span> :
                              <span className="badge bg-success">Active</span>
                          }
                        </td>
                        <td>{new Date(user.createdAt).toDateString()}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => {
                              switchRole(user?._id)
                            }}
                            >Switch Role</button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
            )
        }
        {/* show a pagination */}
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={totalPages}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageClassName="page"
          activeClassName="active"
          previousClassName="previous"
          nextClassName="next"
          breakClassName="break"
          disabledClassName="disabled"
        />
      </Container>
    </>
  );
}

export default UsersList;
