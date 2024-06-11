import React from "react";
import { Accordion, Container } from "react-bootstrap";
import Link from "next/link";

function Sidebar() {
  return (
    <>
      <div style={{ color: "white" }} className="py-4">
        <Link href="/">
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
        </div>
      </div>
    </>
  );
}

export default Sidebar;
