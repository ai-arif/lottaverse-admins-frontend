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
          <Accordion>
            <Accordion.Header className="px-1">
              <h5 style={{ color: "white" }}>Manage Users</h5>
            </Accordion.Header>
            <Accordion.Body>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Link href="/users-list">
                  {/* <a style={{ color: "white" }}> */}
                    User List
                    {/* </a> */}
                </Link>
                <Link href="/premium-users">
                  {/* <a style={{ color: "white" }}> */}
                    Premium User
                    {/* </a> */}
                </Link>
              </div>
            </Accordion.Body>
          </Accordion>
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
