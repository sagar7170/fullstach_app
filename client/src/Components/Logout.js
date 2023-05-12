import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Logout() {
    const history  = useNavigate();
    useEffect(()=>{
        fetch('/logout',{
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then((res)=>{
          history('/');
          console.log(res);
          if(!res.status === 200){
            const error =  new Error(res.error);
            throw error;
          }
        }).catch((err)=>{
            console.log(err);
        })
    })
    
  //  const logout = async ()=>{
  //     const res =  await fetch('http://localhost:4000/logout',{
  //       method: "GET",
  //       headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json"
  //       },
  //       credentials: "include"
  //   })
  //   if(!res.status === 200){
  //       const error =  new Error(res.error);
  //       throw error;
  //     }
  //     else{
  //       history('/');
  //       console.log("data");
  //     }
  //  }
  //  useEffect(()=>{
  //   logout();
  //  },[])

  return (
    <>
        <h1>logout page</h1>
    </>
  )
}

export default Logout