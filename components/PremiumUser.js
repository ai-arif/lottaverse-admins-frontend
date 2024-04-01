import React from "react";
import { Container, Table } from "react-bootstrap";

function PremiumUser() {
  return (
    <>
      <Container style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h2>Premium User</h2>
        <Table responsive="sm">
          <thead>
            <tr>
              <th>SL</th>
              <th>UserID</th>
              <th>Balance</th>
              <th>Account Status</th>
              <th>Joined</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>cjsdfbjsdfbsdjfbsdf</td>
              <td>0000</td>
              <td>Active User, Premium User, Deactive and Admin </td>
              <td>00/00/0000</td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default PremiumUser;
