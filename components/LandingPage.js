"use client";

import React from "react";
import { useState, useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useDisconnect, useSwitchChain } from "wagmi";
import WalletButton from "./WalletButton";

function LandingPage() {
  // const [isClient, setIsClient] = useState(false);

  // useEffect(() => {
  //   setIsClient(true);
  // }, []);
  const { open } = useWeb3Modal();
  const { isConnected, chainId, address } = useAccount();
  const { disconnect } = useDisconnect();
  const { chains, isPending, switchChain } = useSwitchChain();

  const handleDisconnect = () => {
    // console.log(address);
    disconnect();
  };
  console.log("CHAINID", isConnected, process.env.NEXT_PUBLIC_CHAINID, chainId);
  return (
    <Container
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {/* <div style={{ display: "flex", justifyContent: "end" }}>
        {isConnected ? (
          chainId === Number(process.env.NEXT_PUBLIC_CHAINID) ? (
            <button
              style={{
                backgroundColor: "skyblue",
                color: "black",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                boxShadow: "0 5px #666",
                fontWeight: "bold",
              }}
              className="connect-wallet"
              onClick={(e) => {
                e.preventDefault();
                open();
                // handleDisconnect();
              }}>
              {address
                ? `${address.substring(0, 6)}...${address.substring(
                    address.length - 4
                  )}`
                : "Loading..."}
            </button>
          ) : (
            [chains].map((x) => (
              <button
                style={{
                  backgroundColor: "skyblue",
                  color: "black",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  boxShadow: "0 5px #666",
                  fontWeight: "bold",
                }}
                disabled={!switchChain || x[0]?.id === chainId}
                key={x.id}
                className="connect-wallet"
                onClick={(e) => {
                  e.preventDefault();
                  switchChain?.(x[0]?.id);
                }}>
                {console.log("CHAIN", x, chainId)}
                {isPending === x[0]?.id
                  ? "Network (switching)"
                  : `Switch ${x[0]?.name}`}
              </button>
            ))
          )
        ) : (
          <>
            <button
              style={{
                backgroundColor: "skyblue",
                color: "black",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                boxShadow: "0 5px #666",
                fontWeight: "bold",
              }}
              className="connect-wallet"
              onClick={(e) => {
                e.preventDefault();
                open();
              }}>
              Connect Wallet
            </button>
          </>
        )}
      </div> */}
      {/* <WalletButton /> */}
      <h2>Dashboard</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <Row>
          <Col>
            <Card
              style={{
                background:
                  "linear-gradient(to right bottom, #b0fdff, #9dedff, #98daff, #a1c6fa, #b0b0ea);",
              }}>
              <Card.Body
                style={{ display: "flex", justifyContent: "space-between" }}>
                <p className="mb-0">Total User</p>
                <p className="mb-0">
                  <b>0000</b>
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card
              style={{
                background:
                  "linear-gradient(to right bottom, #b0fdff, #9dedff, #98daff, #a1c6fa, #b0b0ea);",
              }}>
              <Card.Body
                style={{ display: "flex", justifyContent: "space-between" }}>
                <p className="mb-0">Active User</p>
                <p className="mb-0">
                  <b>0000</b>
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card
              style={{
                background:
                  "linear-gradient(to right bottom, #b0fdff, #9dedff, #98daff, #a1c6fa, #b0b0ea);",
              }}>
              <Card.Body
                style={{ display: "flex", justifyContent: "space-between" }}>
                <p className="mb-0">Total Deactive User</p>
                <p className="mb-0">
                  <b>0000</b>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card
              style={{
                background:
                  "linear-gradient(to right bottom, #b0fdff, #9dedff, #98daff, #a1c6fa, #b0b0ea);",
              }}>
              <Card.Body
                style={{ display: "flex", justifyContent: "space-between" }}>
                <p className="mb-0">Total Reffer Commission</p>
                <p className="mb-0">
                  <b>0000</b>
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card
              style={{
                background:
                  "linear-gradient(to right bottom, #b0fdff, #9dedff, #98daff, #a1c6fa, #b0b0ea);",
              }}>
              <Card.Body
                style={{ display: "flex", justifyContent: "space-between" }}>
                <p className="mb-0">Total Ref. Withdraw</p>
                <p className="mb-0">
                  <b>0000</b>
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card
              style={{
                background:
                  "linear-gradient(to right bottom, #b0fdff, #9dedff, #98daff, #a1c6fa, #b0b0ea);",
              }}>
              <Card.Body
                style={{ display: "flex", justifyContent: "space-between" }}>
                <p className="mb-0">Total Available</p>
                <p className="mb-0">
                  <b>0000</b>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card
              style={{
                background:
                  "linear-gradient(to right bottom, #b0fdff, #9dedff, #98daff, #a1c6fa, #b0b0ea);",
              }}>
              <Card.Body
                style={{ display: "flex", justifyContent: "space-between" }}>
                <p className="mb-0">Total Company Fund</p>
                <p className="mb-0">
                  <b>0000</b>
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card
              style={{
                background:
                  "linear-gradient(to right bottom, #b0fdff, #9dedff, #98daff, #a1c6fa, #b0b0ea);",
              }}>
              <Card.Body
                style={{ display: "flex", justifyContent: "space-between" }}>
                <p className="mb-0">Total Company Withdraw</p>
                <p className="mb-0">
                  <b>0000</b>
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card
              style={{
                background:
                  "linear-gradient(to right bottom, #b0fdff, #9dedff, #98daff, #a1c6fa, #b0b0ea);",
              }}>
              <Card.Body
                style={{ display: "flex", justifyContent: "space-between" }}>
                <p className="mb-0">Total Available</p>
                <p className="mb-0">
                  <b>0000</b>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card
              style={{
                background:
                  "linear-gradient(to right bottom, #b0fdff, #9dedff, #98daff, #a1c6fa, #b0b0ea);",
              }}>
              <Card.Body
                style={{ display: "flex", justifyContent: "space-between" }}>
                <p className="mb-0">Total Winner</p>
                <p className="mb-0">
                  <b>0000</b>
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card
              style={{
                background:
                  "linear-gradient(to right bottom, #b0fdff, #9dedff, #98daff, #a1c6fa, #b0b0ea);",
              }}>
              <Card.Body
                style={{ display: "flex", justifyContent: "space-between" }}>
                <p className="mb-0">Total Win Amount</p>
                <p className="mb-0">
                  <b>0000</b>
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card
              style={{
                background:
                  "linear-gradient(to right bottom, #b0fdff, #9dedff, #98daff, #a1c6fa, #b0b0ea);",
              }}>
              <Card.Body
                style={{ display: "flex", justifyContent: "space-between" }}>
                <p className="mb-0">Withdraw Charge</p>
                <p className="mb-0">
                  <b>0000</b>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card
              style={{
                background:
                  "linear-gradient(to right bottom, #b0fdff, #9dedff, #98daff, #a1c6fa, #b0b0ea);",
              }}
              className="pt-3">
              <Card.Title className="text-center">Easy Package</Card.Title>
              <Card.Body>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}>
                  <p>Sold Ticket</p>
                  <p>
                    <b>0000</b>
                  </p>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}>
                  <p>Sold Amount</p>
                  <p>
                    <b>0000</b>
                  </p>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}>
                  <p>Jackpot Amount</p>
                  <p>
                    <b>0000</b>
                  </p>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}>
                  <p>Refferal Commission</p>
                  <p>
                    <b>0000</b>
                  </p>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}>
                  <p>Premium Commission</p>
                  <p>
                    <b>0000</b>
                  </p>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}>
                  <p className="mb-0">Leader Commission</p>
                  <p className="mb-0">
                    <b>0000</b>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card
              style={{
                background:
                  "linear-gradient(to right bottom, #b0fdff, #9dedff, #98daff, #a1c6fa, #b0b0ea);",
              }}
              className="pt-3">
              <Card.Title className="text-center">Super Package</Card.Title>
              <Card.Body>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}>
                  <p>Sold Ticket</p>
                  <p>
                    <b>0000</b>
                  </p>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}>
                  <p>Sold Amount</p>
                  <p>
                    <b>0000</b>
                  </p>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}>
                  <p>Jackpot Amount</p>
                  <p>
                    <b>0000</b>
                  </p>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}>
                  <p>Refferal Commission</p>
                  <p>
                    <b>0000</b>
                  </p>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}>
                  <p>Premium Commission</p>
                  <p>
                    <b>0000</b>
                  </p>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}>
                  <p className="mb-0">Leader Commission</p>
                  <p className="mb-0">
                    <b>0000</b>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card
              style={{
                background:
                  "linear-gradient(to right bottom, #b0fdff, #9dedff, #98daff, #a1c6fa, #b0b0ea);",
              }}
              className="pt-3">
              <Card.Title className="text-center">Super-X Package</Card.Title>
              <Card.Body>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}>
                  <p>Sold Ticket</p>
                  <p>
                    <b>0000</b>
                  </p>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}>
                  <p>Sold Amount</p>
                  <p>
                    <b>0000</b>
                  </p>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}>
                  <p>Jackpot Amount</p>
                  <p>
                    <b>0000</b>
                  </p>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}>
                  <p>Refferal Commission</p>
                  <p>
                    <b>0000</b>
                  </p>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}>
                  <p>Premium Commission</p>
                  <p>
                    <b>0000</b>
                  </p>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}>
                  <p className="mb-0">Leader Commission</p>
                  <p className="mb-0">
                    <b>0000</b>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default LandingPage;
