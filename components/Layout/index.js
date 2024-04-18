import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Sidebar from "../Sidebar";

function Layout({ children }) {

  return (
    <Container fluid>
      <Row>
        <Col md={3} className="sidebar-column">
          <div className="sidebar-content">
            <Sidebar />
          </div>
        </Col>
        <Col md={9} className="main-column">
         
          <main>{children}</main>
        </Col>
      </Row>
    </Container>
  );
}

export default Layout;
