import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Registration() {
    const history = useNavigate()
    const [user, setuser] = useState({
        name: "",email: "",phone: "",work: "",password: "",cpassword: ""
    });
    let name,value;
    const handleInput = (e)=>{
       name = e.target.name;
       value = e.target.value;
       setuser({...user,[name]:value})
    }
    
    const postdata = async (e) =>{
        e.preventDefault();
        const {name,email,phone,work,password,cpassword} = user;
        const res = await fetch("/register",{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,email,phone,work,password,cpassword
            })
        })
        const data = await res.json();
        if(res.status === 422){
            window.alert("invalid registration");
            console.log("invalid registration");
        }
        else{
            window.alert("successfull registration");
            console.log("successfull registration");
            history('/');
        }
    }

    return (
        <form action=""  method='POST'>
        <div className='h-screen flex flex-col items-center  justify-center  bg-white'>
            <h1 className='font-extrabold  text-2xl mt-6'>Registration</h1>
            <div className='flex flex-col  h-fit bg-slate-300 items-center justify-center mt-5 w-fit  rounded drop-shadow-2xl'>
                <div className='sm:flex pl-6 pr-6 pt-6'>
                    <div className='m-4'>
                        <h1 >Name</h1>
                        <input className='w-72 h-8 border-2 p-5 rounded-md' type="text" placeholder='Enter name' name="name" value = {user.name} onChange = {handleInput}/>
                    </div>
                    <div className='m-4 '>
                        <h1>Email</h1>
                        <input className='w-72 h-8 border-2 p-5 rounded-md' type="email" placeholder='Enter Email'name="email" value = {user.email} onChange = {handleInput}/>
                    </div>
                </div>
                <div className='sm:flex '>
                <div className='m-4'>
                        <h1>Work</h1>
                        <input className='w-72 h-8 border-2 p-5 rounded-md' type="text" placeholder='Enter work' name="work" value = {user.work} onChange = {handleInput}/>
                    </div>
                    <div className='m-4'>

                        <h1>Phone</h1>
                        <input className='w-72 h-8 border-2 p-5 rounded-md' type="number" placeholder='Enter phone' name="phone" value = {user.phone} onChange = {handleInput}/>
                    </div>
                </div>
                <div className=' sm:flex pl-6 pr-6 pb-6'>
                <div className='m-4'>
                        <h1>Password</h1>
                        <input className='w-72 h-8 border-2 p-5 rounded-md' type="password" placeholder='Enter Password' name="password" value = {user.password} onChange = {handleInput}/>
                    </div>
                    <div className='m-4'>

                        <h1>Confirm Password</h1>
                        <input className='w-72 h-8 border-2 p-5 rounded-md' type="password" placeholder='Enter Confirm Password' name="cpassword" value = {user.cpassword} onChange = {handleInput} />
                    </div>
                </div>
            </div>
            
            <button className='mt-6 bg-stone-800 hover:bg-black text-white w-32 rounded p-2 ' onClick={postdata} >Register</button>
           
        </div>
        </form>
    )
}

export default Registration