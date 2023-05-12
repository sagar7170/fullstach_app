import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Contect() {
    const history = useNavigate();
    const [userdata, setUserdata] = useState({ name: "", email: "", phone: "", message: "" });

    const SendMessage = async (e) => {
        e.preventDefault()
        const { name, email, phone, message } = userdata;
        const res = await fetch("/Contect", {
            method: 'POST',
            credentials: 'include',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, message
            }),
        })
        const data = await res.json();
        console.log(data);
        if (res.status === 400 || !data) {
            console.log("message not send ")
        } else {
            alert("message send seccessfully")
            // setUserdata({ ...userdata, message: "" })
        }
    }

    const contectpage = async () => {
        try {
            const res = await fetch("/getdata", {
                method: 'GET',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
            const data = await res.json()
            // console.log(data);
            setUserdata(data);
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        } catch (err) {
            console.log("err")
            history('/');
        }
    }
    useEffect(() => {
        contectpage()
    }, [])

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        // const phone = e.target.value; 
        const message = e.target.value;
        setUserdata({ ...userdata, [name]: value })
    }

    return (
        <div>
            <div className='flex justify-end '>
            <Link to="/logout">
                <button className='mt-10 mr-10 bg-stone-800 hover:bg-black text-white w-32 rounded p-2 ' >Logout</button>
            </Link>
            </div>
            <div className='grid sm:grid-cols-3 sm:gap-10 gap-5 lg:gap-10 m-16 drop-shadow-2xl'>
                <div className='flex space-x-5 bg-slate-300  p-5 rounded-lg '>
                    <h1 className='text-blue-700'>Email</h1>
                    <h1>{userdata.email}</h1>
                </div>
                <div className='flex space-x-5 bg-slate-300 rounded-lg  p-5'>
                    <h1 className='text-blue-700'>Phone</h1>
                    <h1>{userdata.phone}</h1>
                </div>
                <div className='flex space-x-5 bg-slate-300 rounded-lg  p-5'>
                    <h1 className='text-blue-700'>Address</h1>
                    <h1>faridabad,Haryana </h1>
                </div>
            </div>
            <form method='POST' className='flex justify-center items-center'>
                <div className=' grid  bg-slate-300 w-fit p-10 drop-shadow-2xl rounded-lg' >
                    <h1 className='font-extrabold  text-2xl '>Get in touch</h1>
                    <div className='grid sm:grid-cols-3 sm:gap-10 gap-3 mt-5'>
                        <input className='w-72 h-8 border-2 p-5 rounded-md' type="text" name="name" value={userdata.name} onChange={handleInput} placeholder=' Name' />
                        <input className='w-72 h-8 border-2 p-5 rounded-md' type="text" name="email" value={userdata.email} onChange={handleInput} placeholder='Email' />
                        <input className='w-72 h-8 border-2 p-5 rounded-md' type="number" name="phone" value={userdata.phone} onChange={handleInput} placeholder='Phone' />
                    </div>
                    <textarea className=' h-40 border-2  rounded-md mt-10 ' type="text" name="message" onChange={handleInput} placeholder='Message' />
                    <button className='mt-5 bg-stone-800 hover:bg-black text-white w-32 rounded p-2 ' onClick={SendMessage}>Send Message</button>
                </div>
            </form>
            
        </div>
    )
}

export default Contect


