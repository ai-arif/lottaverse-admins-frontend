import React from "react";
import { Accordion, Container, Nav } from "react-bootstrap";

function Sidebar() {
  return (
    <>
      <div style={{ color: "white" }} className="py-4">
        <Nav.Link href="/">
          <h3 className="text-center">Admin Dashboard</h3>
        </Nav.Link>
        <div
          className="pt-4"
          style={{ display: "flex", gap: "1rem", flexDirection: "column" }}
        >
          <Accordion>
            <Accordion.Header className="px-1">
              <h5 style={{ color: "white" }}>Manage Users</h5>
            </Accordion.Header>
            <Accordion.Body>
              <Nav style={{ display: "flex", flexDirection: "column" }}>
                <Nav.Link href="/users-list" style={{ color: "white" }}>
                  User List
                </Nav.Link>
                <Nav.Link href="/premium-users" style={{ color: "white" }}>
                  Premium User
                </Nav.Link>
              </Nav>
            </Accordion.Body>
          </Accordion>
          <div className="px-4 py-2" style={{ backgroundColor: "#157fb9" }}>
            <Nav.Link href="/create-lottery">
              <h5>Create Lottery</h5>
            </Nav.Link>
          </div>
          <div className="px-4 py-2" style={{ backgroundColor: "#157fb9" }}>
            <Nav.Link href="/package">
              <h5>Manage Package</h5>
            </Nav.Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
