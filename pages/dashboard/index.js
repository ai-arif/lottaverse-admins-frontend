
import Layout from "@/components/Layout";
import UsersList from "@/components/UsersList";
import React from "react";
import axios from "axios";

export const getServerSideProps = async (context) => {
  try {
    const token = context.req.cookies.token;
    const res=await axios.get(`${process.env.API}/api/admin/verify`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    if(res.data.success){
      return {
        props: {},
      };
      
    }
    else{
      context.res.setHeader('Set-Cookie', `token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`);
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }
  } catch (error) {
    context.res.setHeader('Set-Cookie', `token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`);
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
}

function Dashboard() {
  return (
    <>
      <Layout>
        <UsersList/>
      </Layout>
    </>
  );
}

export default Dashboard;
