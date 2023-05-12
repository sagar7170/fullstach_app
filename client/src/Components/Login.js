import React, { useState } from 'react'
import {  Link, useNavigate } from 'react-router-dom'

function Login() {
    const history = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
    
    const loginUser = async (e)=>{
        e.preventDefault();
        const res = await fetch("/signIn",{
            method: "POST",
            withCredentials: true,
            credentials: 'include',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        }); 
        const data = await res.json();
        console.log(data);
        if(res.status === 400 || !data){
            window.alert('invalid credential')
        } else{
            window.alert('succesfull login ')
            history('/about');
        }
    }
    return (
        <form action="" method='POST'>
            <div className=' h-screen flex flex-col items-center  justify-center bg-gradient-to-r bg-white '>
                <h1 className='  font-extrabold  text-2xl '>Sign up</h1>
                <div className=' flex flex-col items-center justify-center mt-5 w-96 h-72 rounded-lg bg-slate-300 drop-shadow-2xl'>
                    <div >
                        <h1 className=' text-base' >Email</h1>
                        <input className='w-72 h-8 border-2 p-5 rounded-md' type="text" name="email" value={email} placeholder='Enter email' onChange={(e)=>setEmail(e.target.value)}/>
                        <h1 className='text-base mt-5 '>password</h1>
                        <input className='w-72 h-8 border-2 p-5 rounded-md' type="password" name="password" value={password} placeholder='Enter password' onChange={(e)=>setpassword(e.target.value)} />
                    </div>
                    <button className='mt-5 bg-stone-800 hover:bg-black text-white w-20 rounded p-2' onClick={loginUser}>Login</button>
                </div>
                <div className='flex mt-8'>
                    <hr className='w-20 m-3' /> <h1>OR</h1> <hr className='w-20 m-3 ' />
                </div>
               <Link to ="/register">
                    <button className='mt-5 bg-stone-800 hover:bg-black text-white w-32 rounded p-2 ' >Register</button>
              </Link>
            </div>
        </form>
    )
}

export default Login