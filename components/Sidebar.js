import React from "react";
import { Accordion, Container } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

function Sidebar() {
  const router=useRouter()
  const handleSignOut=()=>{
    Cookies.remove('token')
    router.push('/')
  }
  return (
    <>
      <div style={{ color: "white" }} className="py-4">
        <Link href="/dashboard">
          <h3 className="text-center">Admin Dashboard</h3>
        </Link>
        <div
          className="pt-4"
          style={{ display: "flex", gap: "1rem", flexDirection: "column" }}
        >
          
          <div className="px-4 py-2" style={{ backgroundColor: "#157fb9" }}>
            <Link href="/users-list">
              <h5>Manage Users</h5>
            </Link>
          </div>
          <div className="px-4 py-2" style={{ backgroundColor: "#157fb9" }}>
            <Link href="/create-lottery">
              <h5>Create Lottery</h5>
            </Link>
          </div>
          <div className="px-4 py-2" style={{ backgroundColor: "#157fb9" }}>
            <Link href="/draw-lottery">
              <h5>Draw Lottery</h5>
            </Link>
          </div>
          <div className="px-4 py-2" style={{ backgroundColor: "#157fb9" }}>
            <Link href="/send-commission">
              <h5>Send Commission</h5>
            </Link>
          </div>
          <div className="px-4 py-2" style={{ backgroundColor: "#157fb9" }}>
            <Link href="/package">
              <h5>Manage Package</h5>
            </Link>
          </div>
          <div onClick={handleSignOut} className="px-4 py-2" style={{ backgroundColor: "#157fb9", cursor:"pointer" }}>
            
              <h5>Signout</h5>
            
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
