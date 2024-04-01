import React from "react";
import { Container, Table } from "react-bootstrap";

function Package() {
  return (
    <>
      <Container style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
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
            <tr>
              <td></td>
              <td>Easy</td>
              <td>00/00/0000 to 00/00/0000</td>
              <td>Active User </td>
              <td>Edit</td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default Package;
