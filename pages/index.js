import React from "react";
import Dashboard from "./dashboard";
import UsersList from "@/components/UsersList";
import Layout from "@/components/Layout";
import axios from "axios";
import LoginPage from "@/components/LoginPage";

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
        redirect: {
          destination: '/dashboard',
          permanent: false,
        },
      }
    }
    else{
      context.res.setHeader('Set-Cookie', `token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`);
      return {
        props: {},
      };
    }
  } catch (error) {
    console.log(error);
    return {
      props: {},
    };
  }
}
export default function Home() {
  return (
    <>
    
      <LoginPage/>
    
    </>
  );
}
