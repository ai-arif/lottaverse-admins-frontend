import React from "react";
import Dashboard from "./dashboard";
import UsersList from "@/components/UsersList";
import Layout from "@/components/Layout";

export default function Home() {
  return (
    <>
    <Layout>
      <UsersList />
      </Layout>
    </>
  );
}
